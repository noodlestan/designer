// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as SizeCircleViz } from './SizeCircleViz.astro';
export { default as SizeHorizontalBarViz } from './SizeHorizontalBarViz.astro';
export { default as SizeSquareViz } from './SizeSquareViz.astro';
export { default as SizeVerticalBarViz } from './SizeVerticalBarViz.astro';
