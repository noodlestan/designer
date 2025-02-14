# Designer Decisions - Generators

> Generate design tokens, TS and CSS code, and schemas for input validation.

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/)

> [!WARNING]
> Early days. Follow our progress on the [Github project](https://github.com/orgs/noodlestan/projects/3)

### Generating schemas

The `createSchemaGenerator()` function generates JSON schemas for TS types.

In this repository's build tools you can find a complete working example.

The [generate.ts script](https://github.com/noodlestan/designer/blob/main/tools/build/scripts/generate.ts) generates the JSON schemas for the built-in decision models and primitives. It is provided with a `SchemaGeneratorConfig` object that describes where to locate the TS types for models and primitives (in the [@noodlestan/designer-decisions](https://github.com/noodlestan/designer/blob/main/packages/libs/designer-decisions/src/constants/schemas.ts) package) and a target directory inside the [@noodlestan/designer-schemas](https://github.com/noodlestan/designer/tree/main/packages/libs/designer-schemas) package, from where the schemas are then published to NPM.

**Usage (abbreviated):**

```ts
import { createSchemaGenerator } from '@noodlestan/designer-generators';

const generator = createSchemaGenerator(TARGET_DIR, SCHEMA_CONFIGS);
await generator.discover();
const files = await generator.generate();
console.info(`🐘 Generated ${files.length} schemas`);
```

### See Also

- 📖 [Guides / Loading and Validating Decisions](https://designer-decisions.noodlestan.org/guides/loading-and-validating-design-decisions/)
- 📖 [Models / Schemas](https://designer-decisions.noodlestan.org/models/schemas)
- 📖 [API / @noodlestan/designer-generators](https://designer-decisions.noodlestan.org/api/designer-generators)

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

> [!IMPORTANT]
> This library contains code that is used to generate artifacts (JSON schemas) in other packages of this repository.

The entry point is `"build:schemas": "ts-node scripts/generate.ts"` in the [tools/build](https://github.com/noodlestan/designer/tree/main/tools/build) support package.

### Build Targets

> [!IMPORTANT]
> Do not add `type: module` or `exports` fields to `package.json` as this will break Node.js ESM consumers.

This library is packaged for use both in bundlers such as Vite and Astro, as well as Node.js environments (CJS/ESM), and `ts-node`. For Node.js consumers, even those using `import` or `await import()` syntaxes, all imports resolve to the CJS build. This is only possible when the `"type": "module"` and `"exports"` fields are both omitted from the library's `package.json`.

### Scripts

- **$** `npm run dev` - uses `tsc --watch`.
- **$** `npm run build` - uses `tsc` to build `dist/cjs`.
- **$** `npm run test` / `npm run test:watch` - uses `mocha` + `ts-node/register`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
