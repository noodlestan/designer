// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './channel';
export * from './color';
export * from './modifier';
export * from './oklab';
export * from './srgb';
