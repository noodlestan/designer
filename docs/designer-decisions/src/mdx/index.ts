// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './rewriteHref';
export * from './types';
// @endindex

export { rewriteHref as href } from './rewriteHref';
