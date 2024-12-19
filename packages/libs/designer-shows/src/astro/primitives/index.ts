// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)

// @endindex

// @index(['./!(private|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './colors';
