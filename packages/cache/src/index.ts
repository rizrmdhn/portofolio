import { env } from '@portofolio/env/server'
import Redis from 'ioredis'

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

const MEMORY_CLEANUP_INTERVAL_MS = 60_000

export class CacheService {
  private redis: Redis | null = null
  private memoryStore: Map<string, CacheEntry<unknown>> = new Map()
  private cleanupTimer: ReturnType<typeof setInterval>

  constructor() {
    this.cleanupTimer = setInterval(() => this.evictExpired(), MEMORY_CLEANUP_INTERVAL_MS)
    if (typeof this.cleanupTimer.unref === 'function') {
      this.cleanupTimer.unref()
    }

    try {
      this.redis = new Redis({
        host: env.MEMURAI_HOST,
        port: Number(env.MEMURAI_PORT) || 6379,
        password: env.MEMURAI_PASSWORD,
        db: 1, // Use separate DB from rate limiter (db 0)
        retryStrategy: (times: number) => {
          if (times > 3) {
            console.warn(
              'CacheService.retryStrategy',
              'Exceeded maximum Redis reconnection attempts — falling back to memory store',
            )
            this.redis = null
            return null
          }
          return Math.min(times * 50, 2000)
        },
        lazyConnect: true,
      })

      this.redis.on('error', (err) => {
        console.warn('CacheService.Redis', `Redis error: ${err.message}`)
      })

      this.redis.on('connect', () => {
        console.info('CacheService.Redis', 'Connected to Redis server')
      })

      this.redis.connect().catch((err) => {
        console.warn('CacheService.Redis', `Failed to connect to Redis: ${err.message}`)
      })
    } catch (error) {
      console.warn('CacheService', `Failed to initialize Redis: ${(error as Error).message}`)
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.redis) {
      try {
        const data = await this.redis.get(key)
        if (data) {
          return JSON.parse(data) as T
        }
        return null
      } catch {
        // Fallback to memory
      }
    }

    const entry = this.memoryStore.get(key) as CacheEntry<T> | undefined
    if (entry && entry.expiresAt > Date.now()) {
      return entry.value
    }
    if (entry) {
      this.memoryStore.delete(key)
    }
    return null
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    if (this.redis) {
      try {
        await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds)
        return
      } catch {
        // Fallback to memory
      }
    }

    this.memoryStore.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })
  }

  async delete(key: string): Promise<void> {
    if (this.redis) {
      try {
        await this.redis.del(key)
        return
      } catch {
        // Fallback to memory
      }
    }

    this.memoryStore.delete(key)
  }

  async deleteByPrefix(prefix: string): Promise<void> {
    if (this.redis) {
      try {
        const keys = await this.redis.keys(`${prefix}*`)
        if (keys.length > 0) {
          await this.redis.del(...keys)
        }
        return
      } catch {
        // Fallback to memory
      }
    }

    for (const key of this.memoryStore.keys()) {
      if (key.startsWith(prefix)) {
        this.memoryStore.delete(key)
      }
    }
  }

  private evictExpired(): void {
    const now = Date.now()
    for (const [key, entry] of this.memoryStore.entries()) {
      if (entry.expiresAt <= now) {
        this.memoryStore.delete(key)
      }
    }
  }

  async withCache<T>(
    cacheKey: string,
    ttl: number,
    fetcher: () => Promise<T>,
    onCacheHit?: () => void,
  ): Promise<T> {
    const cached = await this.get<T>(cacheKey)
    if (cached) {
      onCacheHit?.()
      return cached
    }

    const result = await fetcher()
    await this.set(cacheKey, result, ttl)
    return result
  }

  async withCacheInvalidation<T>(
    cachePrefix: string | Array<string>,
    mutation: () => Promise<T>,
  ): Promise<T> {
    const result = await mutation()

    const prefixes = Array.isArray(cachePrefix) ? cachePrefix : [cachePrefix]
    await Promise.all(prefixes.map((prefix) => this.deleteByPrefix(prefix)))

    return result
  }

  async disconnect(): Promise<void> {
    clearInterval(this.cleanupTimer)
    if (this.redis) {
      await this.redis.quit()
      this.redis = null
    }
  }
}

export const cacheService = new CacheService()
