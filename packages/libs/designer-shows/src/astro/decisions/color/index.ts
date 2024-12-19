// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowColorScaleDecision } from './ShowColorScaleDecision.astro';
export { default as ShowColorValueDecision } from './ShowColorValueDecision.astro';
// @endindex

// @index(['./!(private|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
