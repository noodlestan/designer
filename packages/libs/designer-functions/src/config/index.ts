// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './defineConfig';
export * from './loadConfig';
export * from './types';
// @endindex

export * from './private/exitOnConfigError';
