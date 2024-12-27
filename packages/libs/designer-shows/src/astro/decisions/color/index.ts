// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowColorHueValueDecision } from './ShowColorHueValueDecision.astro';
export { default as ShowColorLightnessScaleDecision } from './ShowColorLightnessScaleDecision.astro';
export { default as ShowColorLightnessValueDecision } from './ShowColorLightnessValueDecision.astro';
export { default as ShowColorSaturationValueDecision } from './ShowColorSaturationValueDecision.astro';
export { default as ShowColorSetDecision } from './ShowColorSetDecision.astro';
export { default as ShowColorValueDecision } from './ShowColorValueDecision.astro';
