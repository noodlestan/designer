// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as GetInvolved } from './GetInvolved.astro';
export { default as LibraryStatus } from './LibraryStatus.astro';
