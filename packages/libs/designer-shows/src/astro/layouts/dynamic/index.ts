// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as LayoutDynamic } from './LayoutDynamic.astro';
// @endindex

export { type LayoutDynamicProps } from './LayoutDynamic.astro';
