// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowDecision } from './ShowDecision.astro';
export { default as ShowDecisionUnavailable } from './ShowDecisionUnavailable.astro';
