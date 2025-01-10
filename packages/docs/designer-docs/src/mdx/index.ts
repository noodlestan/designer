// @index(['./*.{ts,tsx}', '!./*.test.ts', '!./*.test.tsx', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './rewriteHref';
export * from './types';

// @endindex

export { rewriteHref as href } from './rewriteHref';
