# Designer Decisions - Schemas

> A collection of JSON schemas to validate design decision inputs.

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-og-1280x640.png)

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/models/schemas)

This collection of schemas validates inputs for all [built-in decision types and models](https://designer-decisions.noodlestan.org/models/decision-types).

### Schema Source

This exported constant defines where to locate the schema collection.

[SchemaSource(s)](https://designer-decisions.noodlestan.org/api/designer-decisions/Meta/Types/SchemaSource/) are a way to pass schema collections _by reference_ to decision validators and loaders such as [createDecisionLoader()](https://designer-decisions.noodlestan.org/api/designer-functions/Loader/createDecisionLoader/).

```ts
import { DECISION_SCHEMAS } from '@noodlestsn/designer-schemas';

const loader = createDecisionLoader([DECISION_SCHEMAS], [DEMO_DATA, LOCAL_DATA]);
```

### See Also

- 📖 [Models / Schemas](https://designer-decisions.noodlestan.org/models/schemas)
- 📖 [API / @noodlestan/designer-schemas](https://designer-decisions.noodlestan.org/api/designer-schemas)

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

> [!IMPORTANT]
> This package publishes auto-generated JSON Schemas.

This package publishes a collection of JSON Schemas but these files are not checked-in anywhere.

The tool that generates the JSON files resides (and is executed from) [the build tools in this repository](https://github.com/noodlestan/designer/blob/main/tools/build/README.md).

This package exists solely to publish the [schemas](https://www.npmjs.com/package/@noodlestan/designer-schemas?activeTab=code) to NPM.

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
- **$** `npm run test` / `npm run test:watch` - 🚧 no tests.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
