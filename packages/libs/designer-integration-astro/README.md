# Designer Decisions - Astro Integration

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-og-1280x640.png)

This Astro integration allows you to use [Designer Decisions Astro components](https://designer-decisions.noodlestan.org/integrations/Astro/) in your MDX pages.

📖 [Documentation](https://designer-decisions.noodlestan.org/)

> 🚧 Currently this integration loads only the base styles (from `@noodlestan/designer-shows/astro`). Upcoming features include loading decisions and settings as well.
>
> **Get Involved:** [#92 Astro Integration](https://github.com/noodlestan/designer/issues/92)

## How to use

## Installation

```shell
npm install @noodlestan/designer-integration-astro
```

## Usage

Import the integration and add it to your `astro.config.*` file:

```js
import { defineConfig } from 'astro/config';
import designerDecisions from '@noodlestan/designer-integration-astro';

export default defineConfig({
  integrations: [
    designerDecisions({});
  ]
})
```

### See Also

- 📖 [Integrations / Astro](https://designer-decisions.noodlestan.org/integrations/Astro) for more info on features and options.
- 📖 [Examples](https://designer-decisions.noodlestan.org/examples/)
- 📖 [Boilerplates](https://designer-decisions.noodlestan.org/examples/boilerplates/)

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

### Build Targets

This library is packaged for use in Astro, both during config time (e.g., in `astro.config.mjs`) and at build time.

| Entry Point                                                          | Description       |
| -------------------------------------------------------------------- | ----------------- |
| `import integration from '@noodlestan/designer-integrations-astro';` | Astro integration |
| `import '@noodlestan/designer-integrations-astro/styles/...';`       | CSS               |

### Scripts

- **$** `npm run build` - uses `astro check` and `tsc --noEmit` to type check Astro and SolidJS sources (does not produce any `dist/`).
- **$** `npm run test` / `npm run test:watch` - 🚧 no tests.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2025 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
