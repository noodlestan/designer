// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ColorBgViz } from './ColorBgViz.astro';
export { default as ColorFgViz } from './ColorFgViz.astro';
export { default as ColorSwatchViz } from './ColorSwatchViz.astro';
