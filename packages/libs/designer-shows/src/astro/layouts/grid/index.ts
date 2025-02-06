// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as LayoutGrid } from './LayoutGrid.astro';
// @endindex

export { type LayoutGridProps } from './LayoutGrid.astro';
