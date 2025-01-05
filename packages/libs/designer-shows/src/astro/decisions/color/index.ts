// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowColorSetDecision } from './ShowColorSetDecision.astro';
export { default as ShowColorSRGBHueSetDecision } from './ShowColorSRGBHueSetDecision.astro';
export { default as ShowColorSRGBHueValueDecision } from './ShowColorSRGBHueValueDecision.astro';
export { default as ShowColorSRGBLightnessScaleDecision } from './ShowColorSRGBLightnessScaleDecision.astro';
export { default as ShowColorSRGBLightnessValueDecision } from './ShowColorSRGBLightnessValueDecision.astro';
export { default as ShowColorSRGBSaturationScaleDecision } from './ShowColorSRGBSaturationScaleDecision.astro';
export { default as ShowColorSRGBSaturationValueDecision } from './ShowColorSRGBSaturationValueDecision.astro';
export { default as ShowColorValueDecision } from './ShowColorValueDecision.astro';
