# Designer Decisions - Signals

> A library of functions to reactively load, validate, and manipulate design decisions and tokens.

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-og-1280x640.png)

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/api/designer-signals)

This library provides APIs for loading and validating schemas and decisions inputs.

### See also

- 📖 [Guides / Loading and Validating Decisions](https://designer-decisions.noodlestan.org/guides/loading-and-validating-design-decisions/)
- 📖 [Models / Decision Types](https://designer-decisions.noodlestan.org/models/decision-types)
- 📖 [Boilerplates](https://designer-decisions.noodlestan.org/examples/boilerplates/)
- 📖 [API / @noodlestan/designer-functions](https://designer-decisions.noodlestan.org/api/designer-functions)

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

### Build Targets

This library is packaged for use in bundlers such as Vite with the .

### Scripts

- **$** `npm run dev` - uses `esbuild` to watch and `tsc` to emit declarations on rebuild.
- **$** `npm run build` - uses `esbuild` to build `dist/cjs` and `tsc` to emit declarations.
- **$** `npm run test` / `npm run test:watch` - uses `vitest`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
