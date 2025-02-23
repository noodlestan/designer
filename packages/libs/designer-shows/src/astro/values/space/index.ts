// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowSizeValue } from './ShowSizeValue.astro';
export { default as ShowSizeViz } from './ShowSizeViz.astro';
