// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ColorViz } from './ColorViz.astro';
export { default as SpaceViz } from './SpaceViz.astro';
