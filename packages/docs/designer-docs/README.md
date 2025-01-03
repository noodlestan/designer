# Designer Decisions - Docs

> The [Designer Docs](https://designer-docs.noodlestan.org/) website.

## How to use

📖 [Documentation](https://designer-docs.noodlestan.org/)

## Development

### Getting started

Make sure you [README](../../../README.md) first.

```
nvm use
npm install
npm run dev
```

Launches a web server, typically at [http://localhost:4321/](http://localhost:4321/).

### Stack

These docs are built with [Starlight](https://starlight.astro.build/) / [Astro](https://docs.astro.build).

### Scripts

- **$** `npm run build` - uses `astro/startlight` to generate a static site in `dist/`.
- **$** `npm run start` - full build, served locally.
- **$** `npm run dev` - uses `astro/startlight` to launch dev server.

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
