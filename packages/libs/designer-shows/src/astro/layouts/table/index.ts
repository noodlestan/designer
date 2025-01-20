// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as Table } from './Table.astro';
export { default as TableHead } from './TableHead.astro';
export { default as TableRow } from './TableRow.astro';
