# Designer Decisions - Build Tools

> Internal tools used to build [Designer Decisions](https://designer-decisions.noodlestan.org/) packages and generate code.

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

> [!IMPORTANT]
> These tools are responsible for generating some of the code in this repository, including code in other packages.

For now, we keep this separate entry point (as opposed from running these build steps from within the packages) so that:

- We can use `ts-node` without messing up env (this packages is NOT `type: module`).
- We don't pollute the target packages with unnecessary dependencies.
- We keep a clear separation between `designer-decisions` consumer code and internal tools.

💡 All generators are candidates to be exposed from a `bin` entry point, so that packages can run `dd-gen schemas` locally.

### Generator scripts

These scripts generate code in other packages.

- **$** `npm run build:schemas` - uses `ts` to find types in [packages/libs/designer-decisions](https://github.com/noodlestan/designer/tree/main/packages/libs/designer-decisions) and generates the JSON schemas in [packages/libs/designer-schemas](https://github.com/noodlestan/designer/tree/main/packages/libs/designer-schemas).

### Build targets

This library is NOT built.

It exposes only a `mjs` entry point that can be consumed directly in a node script using ESM `import` syntax.

### Internal Scripts

The main entry point of this package exports a small wrapper around `esbuild` so that build configuration across libraries is consistent and DRY.

```mjs
export const cjs = options => createBuild(options, cjsConfig);
```

**Usage** ([example](https://github.com/noodlestan/designer/tree/main/packages/libs/designer-functions/scripts))

```mjs
import { cjs } from '@noodlestan/designer-build-tools';

await cjs().build(); // OR await cjs().watch();
```

💡 Good candidate to be extracted to its own package.

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
