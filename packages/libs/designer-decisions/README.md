# Designer Decisions - Models

> A library for modeling contextual design decisions and tokens.

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-og-1280x640.png)

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/guides/capturing-design-decisions-in-data/)

This core library models contextual design decisions of different types (colors, spaces, typography, ...), providing an API to produce values (or tokens) based on parametric inputs.

### Sample and Demo Data

These exported constants defines where to locate the sample and demo data collections.

[DecisionSource(s)](https://designer-decisions.noodlestan.org/api/designer-decisions/Types/Meta/DecisionSource/) are a way to pass decision inputs _by reference_ to decision validators and loaders such as [createDecisionLoader()](https://designer-decisions.noodlestan.org/api/designer-functions/Loader/createDecisionLoader/).

```ts
import { createDecisionLoader } from '@noodlestsn/designer-functions';
import { DECISION_SCHEMAS } from '@noodlestsn/designer-schemas';
import { DEMO_DATA } from '@noodlestsn/designer-decisions';

const LOCAL_DATA = './data';
const loader = createDecisionLoader([DECISION_SCHEMAS], [DEMO_DATA, LOCAL_DATA]);
```

### See Also

- 📖 [Guides / Loading and Validating Decisions](https://designer-decisions.noodlestan.org/guides/loading-and-validating-design-decisions/)
- 📖 [Models / Decision Types](https://designer-decisions.noodlestan.org/models/decision-types)
- 📖 [API / @noodlestan/designer-decisions](https://designer-decisions.noodlestan.org/api/designer-decisions)

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

### Dependencies

This library depends only on `chroma-js`.

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

- **$** `npm run build` - uses `tsc` to build `dist/cjs`.
- **$** `npm run test` / `npm run test:watch` - uses `vitest`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).
- **$** `npm run dev` - uses `tsc --watch`.

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
