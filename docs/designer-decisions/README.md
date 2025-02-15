# Designer Decisions - Docs

> The [Designer Decisions](https://designer-decisions.noodlestan.org/) website.

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-docs.png)

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/)

If you're looking into how to setup a Design System Docs website based on Designer Decisions models and tokens, refer to our [Integrations / Astro](https://designer-decisions.noodlestan.org/integrations/Astro/) docs.

You can also start from a fully working setup by using one of the [boilerplates](https://designer-decisions.noodlestan.org/examples/boilerplates/).

## Development

### Getting started

Make sure you [README](https://github.com/noodlestan/designer/blob/main/README.md) first.

```
nvm use
npm install
npm run dev
```

Launches a web server, typically at [http://localhost:4321/](http://localhost:4321/).

### Stack

These docs are built with [Starlight](https://starlight.astro.build/) / [Astro](https://docs.astro.build).

### Scripts

- **$** `npm run dev` - uses `astro/startlight` to launch dev server.
- **$** `npm run build` - uses `astro/startlight` to generate a static site in `dist/`.
- **$** `npm run start` - full build, served locally.
- **$** `npm run sync` - updates type definitions from Astro automagical zods.

### Troubleshooting

#### `<item> is of type any`

Seeing warnings around `getCollection()` invocations?

Run `npm run sync` to force Astro to update collection typings.

#### `<unknown>` or `N/A` decisions in docs pages

Decisions not showing in the documentation pages?

Run `npm run build:decisions` to validate the sample design decisions and inspect validation errors.

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
