import crypto from "crypto";
import fs from "fs";
import path from "path";

const ROOT_DIR = process.argv[2] || process.cwd();
const SERVER_DIR = path.join(ROOT_DIR, "apps/web");

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  ".turbo",
  "dist",
  "build",
  ".next",
  ".nuxt",
  ".output",
  "coverage",
]);

const KEYS = ["BETTER_AUTH_SECRET"];

// 48 bytes → 64 char base64 string, well above better-auth's 32-char minimum
function generateSecret() {
  return crypto.randomBytes(48).toString("base64");
}

function findEnvFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        results.push(...findEnvFiles(fullPath));
      }
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.startsWith(".env") &&
      !entry.name.endsWith(".example")
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

if (!fs.existsSync(SERVER_DIR) || !fs.statSync(SERVER_DIR).isDirectory()) {
  console.error(`Error: server directory not found: ${SERVER_DIR}`);
  process.exit(1);
}

const envFiles = findEnvFiles(SERVER_DIR).sort();
if (envFiles.length === 0) {
  console.log(`No .env* files found under: ${SERVER_DIR}`);
  process.exit(0);
}

console.log(
  `Found ${envFiles.length} .env* file(s). Regenerating Better Auth secret...`,
);

envFiles.forEach((envFile) => {
  let envContent = fs.readFileSync(envFile, "utf8");
  let updatedCount = 0;

  KEYS.forEach((key) => {
    const regex = new RegExp(`^${key}=.*$`, "m");

    if (regex.test(envContent)) {
      const newSecret = generateSecret();
      envContent = envContent.replace(regex, `${key}=${newSecret}`);
      updatedCount += 1;
    }
  });

  fs.writeFileSync(envFile, envContent, "utf8");
  const relativeFile = path.relative(SERVER_DIR, envFile) || envFile;
  console.log(`  ${relativeFile}: updated ${updatedCount} key(s)`);
});

console.log("Done. Better Auth secret regenerated across all .env* files.");
