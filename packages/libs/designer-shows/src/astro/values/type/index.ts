// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowTypefaceValue } from './ShowTypefaceValue.astro';
export { default as ShowTypefaceViz } from './ShowTypefaceViz.astro';
