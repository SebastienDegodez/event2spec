/**
 * Clean architecture boundaries for React projects.
 *
 * Copy this file into your project (e.g. `eslint/clean-architecture.js`) and SPREAD it
 * into your existing flat config. It never replaces your setup: it only adds the layer
 * rules, and touches no parser option, no `ignores`, no style rule.
 *
 *   // eslint.config.js
 *   import cleanArchitecture from './eslint/clean-architecture.js'
 *
 *   export default [
 *     ...yourExistingConfig,
 *     ...cleanArchitecture({ root: 'src' }),
 *   ]
 *
 * Requires: npm i -D eslint-plugin-boundaries eslint-import-resolver-typescript
 *
 * `resolver` is the import resolver used to tell which layer an import belongs to.
 * It defaults to the TypeScript one (which also resolves `@/*` tsconfig aliases).
 * Pass `resolver: null` if your config already sets `settings['import/resolver']`.
 */
import boundaries from 'eslint-plugin-boundaries'

const DEFAULT_RESOLVER = {
  typescript: { alwaysTryTypes: true },
}

/** Who may import whom. Dependencies point inward; nothing may point at `ui`. */
const ALLOWED = {
  domain: ['domain'],
  application: ['application', 'domain'],
  infrastructure: ['infrastructure', 'application', 'domain'],
  ui: ['ui', 'application', 'domain'],
  composition: ['composition', 'ui', 'infrastructure', 'application', 'domain'],
}

const LAYERS = Object.keys(ALLOWED)

/** Framework entry points legitimately sit at the root of `src` and belong to no layer. */
const DEFAULT_ENTRYPOINTS = [
  'main.tsx',
  'main.ts',
  'index.tsx',
  'index.ts',
  'App.tsx',
  'vite-env.d.ts',
]

export default function cleanArchitecture({
  root = 'src',
  resolver = DEFAULT_RESOLVER,
  entrypoints = DEFAULT_ENTRYPOINTS,
} = {}) {
  const sources = `${root}/**/*.{ts,tsx,js,jsx}`

  return [
    {
      name: 'clean-architecture/layers',
      files: [sources],
      plugins: { boundaries },
      settings: {
        ...(resolver ? { 'import/resolver': resolver } : {}),
        'boundaries/include': [`${root}/**/*`],
        'boundaries/ignore': entrypoints.map((file) => `${root}/${file}`),
        'boundaries/elements': LAYERS.map((type) => ({
          type,
          pattern: `${root}/${type}/**/*`,
          mode: 'full',
        })),
      },
      rules: {
        'boundaries/element-types': [
          'error',
          {
            default: 'disallow',
            message:
              '${file.type} must not import ${dependency.type}. Dependencies point inward — ui → application → domain, infrastructure → application → domain — and only composition/ may see every layer. Depend on a port declared in application/, and wire the implementation in composition/.',
            rules: LAYERS.map((from) => ({ from: [from], allow: ALLOWED[from] })),
          },
        ],
        // Without this, code that ignores the layers entirely (everything flat in src/)
        // silently passes every boundary rule.
        'boundaries/no-unknown-files': 'error',
      },
    },
    {
      name: 'clean-architecture/inner-layers-know-no-framework',
      files: [`${root}/domain/**/*.{ts,tsx}`, `${root}/application/**/*.{ts,tsx}`],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['react', 'react-dom', 'react/*', 'react-dom/*'],
                message:
                  'domain/ and application/ must run without React. If you need state here, the state belongs to the caller — return it from the use case instead.',
              },
              {
                group: ['axios', 'ky', 'superagent', 'swr', '@tanstack/*'],
                message:
                  'HTTP and server-cache libraries are infrastructure. Define a port in application/ports and implement it in infrastructure/.',
              },
            ],
          },
        ],
        'no-restricted-globals': [
          'error',
          {
            name: 'fetch',
            message:
              'A use case must not talk to the network. Call a port defined in application/ports; the fetch belongs in an adapter under infrastructure/.',
          },
        ],
      },
    },
  ]
}
