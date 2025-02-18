// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './maybeErrorMessage';
export * from './serializeErrorData';
export * from './serializeMaybeError';
export * from './types';
// @endindex

export const NEW_LINE = ' {}\n';
