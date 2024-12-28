// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as SpaceCircleViz } from './SpaceCircleViz.astro';
export { default as SpaceHorizontalBarViz } from './SpaceHorizontalBarViz.astro';
export { default as SpaceSquareViz } from './SpaceSquareViz.astro';
export { default as SpaceVerticalBarViz } from './SpaceVerticalBarViz.astro';
