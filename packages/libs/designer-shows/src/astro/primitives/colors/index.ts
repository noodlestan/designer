// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowColorValue } from './ShowColorValue.astro';
export { default as ShowColorValueList } from './ShowColorValueList.astro';
export { default as ShowHueValue } from './ShowHueValue.astro';
