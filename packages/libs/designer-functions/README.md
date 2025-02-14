# Designer Decisions - Functions

> A library of functions to load, validate, and manipulate design decisions and tokens.

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-og-1280x640.png)

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/api/designer-functions)

This library provides APIs for loading and validating schemas and decisions inputs.,

### See Also

- 📖 [Guides / Loading and Validating Decisions](https://designer-decisions.noodlestan.org/guides/loading-and-validating-design-decisions/)
- 📖 [Models / Decision Types](https://designer-decisions.noodlestan.org/models/decision-types)
- 📖 [Boilerplates](https://designer-decisions.noodlestan.org/examples/boilerplates/)
- 📖 [API / @noodlestan/designer-functions](https://designer-decisions.noodlestan.org/api/designer-functions)

## Development

> [!IMPORTANT]
> This library exports both `dist/cjs` and `dist/esm`. Do not remove `type: module` as this (still) breaks `ts-node` consumers.

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

### Build Targets

> [!IMPORTANT]
> Do not add `type: module` or `exports` fields to `package.json` as this will break Node.js ESM consumers.

This library is packaged for use both in bundlers such as Vite and Astro, as well as Node.js environments (CJS/ESM), and `ts-node`. For Node.js consumers, even those using `import` or `await import()` syntaxes, all imports resolve to the CJS build. This is only possible when the `"type": "module"` and `"exports"` fields are both omitted from the library's `package.json`.

| Consumer            | Syntax        | Resolves to                              |
| ------------------- | ------------- | ---------------------------------------- |
| **Bundlers**        | ESM `import`  | `module` → TS entry point `src/index.ts` |
| `node script.js`    | CJS `require` | `main` → CJS build `dist/cjs/index.js`   |
| `node script.mjs`   | ESM `import`  | `main` (ignores `module`)                |
| `ts-node script.ts` | ESM `import`  | `main` (ignores `module`)                |

### Scripts

- **$** `npm run dev` - uses `esbuild` to watch and `tsc` to emit declarations on rebuild.
- **$** `npm run build` - uses `esbuild` to build `dist/cjs` and `tsc` to emit declarations.
- **$** `npm run test` / `npm run test:watch` - uses `vitest`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
