// @index(['./!(private|parts|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './astro';
export * from './solidjs';
