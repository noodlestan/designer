# Designer Decisions - Functions

> A library of functions to load, validate, and manipulate design decisions.

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/api/designer-functions)

## Exposes

This library exposes a collection of functions for use in Node environments.

## Development

> [!IMPORTANT]
> This library exports both `dist/cjs` and `dist/esm`. Do not remove `type: module` as this (still) breaks `ts-node` consumers.

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

### Scripts

- **$** `npm run build` - uses `esbuild` to build `dist/cjs` + `dist/esm` targets and `tsc` to emit declarations for both
- **$** `npm run test` / `npm run test:watch` - uses `vitest`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config)
- **$** `npm run dev` - uses `esbuild` to watch both targets and `tsc` to emit declarations on rebuild

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
