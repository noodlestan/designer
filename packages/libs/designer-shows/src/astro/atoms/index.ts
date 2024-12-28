// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ColorSwatch } from './ColorSwatch.astro';
export { default as DecisionValue } from './DecisionValue.astro';
export { default as SpaceBlock } from './SpaceBlock.astro';
