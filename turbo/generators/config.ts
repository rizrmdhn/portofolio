import type { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('init', {
    description: 'Generate a new package for the portofolio monorepo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the package? (e.g. shared-utils)',
      },
      {
        type: 'input',
        name: 'deps',
        message:
          'Enter a space separated list of dependencies you would like to install (optional)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/package.json',
        templateFile: 'templates/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/tsconfig.json',
        templateFile: 'templates/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/src/index.ts',
        templateFile: 'templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/eslint.config.js',
        templateFile: 'templates/eslint.config.js.hbs',
      },
      {
        type: 'modify',
        path: 'packages/{{ dashCase name }}/package.json',
        async transform(content, answers) {
          if ('deps' in answers && typeof answers.deps === 'string') {
            const pkg = JSON.parse(content)
            for (const dep of answers.deps.split(' ').filter(Boolean)) {
              const version = await fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`)
                .then((res) => res.json() as Promise<{ latest: string }>)
                .then((json) => json.latest)
              if (!pkg.dependencies) pkg.dependencies = {}
              pkg.dependencies[dep] = `^${version}`
            }
            return JSON.stringify(pkg, null, 2)
          }
          return content
        },
      },
      async (answers) => {
        if ('name' in answers && typeof answers.name === 'string') {
          const { execSync } = await import('node:child_process')
          execSync('pnpm install', { stdio: 'inherit' })
          return 'Package scaffolded successfully'
        }
        return 'Package not scaffolded'
      },
    ],
  })
}
