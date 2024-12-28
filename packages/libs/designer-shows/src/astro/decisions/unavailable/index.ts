// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowDecisionTypeUnavailable } from './ShowDecisionTypeUnavailable.astro';
export { default as ShowDecisionUnavailable } from './ShowDecisionUnavailable.astro';
