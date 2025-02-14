# Designer Decisions - Shows

> Visualizing design decisions and tokens: Astro components.

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-og-1280x640.png)

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/)

This library provides Astro components for building design system documentation websites.

```mdx
import { ShowDecision } from '@noodlestan/designer-shows/astro';

<ShowDecision store={store} d="Brand Color Set" layout="column" size="s" />
```

### See also

- 📖 [Examples](https://designer-decisions.noodlestan.org/examples/)
- 📖 [Integrations / Astro](https://designer-decisions.noodlestan.org/integrations/Astro) for more info on features and options.
- 📖 [API / @noodlestan/designer-shows](https://designer-decisions.noodlestan.org/api/designer-shows)

## Development

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

This library is packaged for use in Astro.

| Entry Point                                                 | Description      |
| ----------------------------------------------------------- | ---------------- |
| `import { <...> } from '@noodlestan/designer-shows/astro';` | Astro components |
| `import '@noodlestan/designer-shows/astro/styles/<...>';`   | CSS              |

### Scripts

- **$** `npm run build` - uses `astro check` and `tsc --noEmit` to type check Astro and SolidJS.sources (does not produce any `dist/`).
- **$** `npm run test` / `npm run test:watch` - 🚧 no tests.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
