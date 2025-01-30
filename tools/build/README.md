# Designer Decisions - Build Tools

> Internal tools used to build [Designer Decisions](https://designer-decisions.noodlestan.org/).

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

These tools are responsible for generating some of the code in this repository, including code in other packages.

We keep this separate entry point (as opposed from running these build steps from within the packages) so that:

- We can use `ts-node` without messing up env (this packages is NOT `type: module`).
- We don't pollute the target packages with unnecessary dependencies.
- We keep a clear separation between `designer-decisions` consumer code and internal tools.

### Scripts

- **$** `npm run build:schemas` - uses `ts` to find types in [packages/libs/designer-decisions](/packages/libs/designer-decisions) and generates the JSON schemas in [packages/libs/designer-schemas](/packages/libs/designer-schemas)

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
