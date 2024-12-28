// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowSpaceScaleDecision } from './ShowSpaceScaleDecision.astro';
export { default as ShowSpaceValueDecision } from './ShowSpaceValueDecision.astro';
