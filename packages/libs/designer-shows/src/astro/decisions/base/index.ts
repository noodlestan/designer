// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowSetDecision } from './ShowSetDecision.astro';
export { default as ShowValueDecision } from './ShowValueDecision.astro';
