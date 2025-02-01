// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowColorOklabChromaScaleDecision } from './ShowColorOklabChromaScaleDecision.astro';
export { default as ShowColorOklabChromaValueDecision } from './ShowColorOklabChromaValueDecision .astro';
export { default as ShowColorOklabHueSetDecision } from './ShowColorOklabHueSetDecision.astro';
export { default as ShowColorOklabHueValueDecision } from './ShowColorOklabHueValueDecision .astro';
export { default as ShowColorOklabLightnessScaleDecision } from './ShowColorOklabLightnessScaleDecision.astro';
export { default as ShowColorOklabLightnessValueDecision } from './ShowColorOklabLightnessValueDecision.astro';
