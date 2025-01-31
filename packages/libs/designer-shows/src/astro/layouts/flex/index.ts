// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as LayoutCentered } from './LayoutCentered.astro';
export { default as LayoutFlex } from './LayoutFlex.astro';
export { default as LayoutStack } from './LayoutStack.astro';
