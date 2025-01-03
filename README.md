# Designer Decisions

> Modeling design decisions. Schemas, transformations, visualizations, the works.

## 📖 [Documentation](https://designer-docs.noodlestan.org/)

## Noodlestan 🐘 Collective

We are an open collective of people dedicated to the design and software crafts: UX, design, code, web, 3d, audio, the works. Learn more about us and our projects at [Noodlestan.org](https://noodlestan.org).

**👐 Your contribution is welcome! 👐**

If would like to share your ideas, report a bug, ask for improvements - or simply say hi! 👋 - don't hesitate to join us on [Noodlestan's Discord](https://discord.gg/b8DkbJSF9z) or to drop us a line at `hello@noodlestan.org`.

## Development

System requirements:

- [Node.js](https://nodejs.org/)
- [NVM](https://github.com/nvm-sh/nvm)

We recommended using [VS Code](https://code.visualstudio.com/) with the following extensions: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx), [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode), [SpellRight](https://marketplace.visualstudio.com/items?itemName=ban.spellright)

### Getting started

First make sure you are using the correct node version by running `nvm use`.

Install dependencies with `npm install`.

Run `npm run dev` in the docs directory: `packages/docs/designer-docs/`.

### In this repository

Libraries:

- [Designer Decisions](./packages/libs/designer-decisions/README.md)
- [Designer Functions](./packages/libs/designer-functions/README.md)
- [Designer Schemas](./packages/libs/designer-schemas/README.md)
- [Designer Shows](./packages/libs/designer-shows/README.md)

Cli tools:

- [Designer Generators](./packages/clis/designer-generators/README.md)

Docs:

- [Designer Docs](./packages/docs/designer-docs/README.md)

### Stack

This component library targets any JS/TS stack. Packages are distributed both as TS modules and as CJS.

Documentation components and widgets are (for now) only available as [Astro](https://docs.astro.build) components, [Starlight](https://starlight.astro.build/) and distributed in source code only.

It uses:

- [AJV]()
- [typescript-json-schema]()
- [json-schema-to-zod]()

Documentation is built on top of [Astro](https://docs.astro.build) / [Starlight](https://starlight.astro.build/).

### Tools

- [Vite](https://vitejs.dev/) and [Vitest](https://vitest.dev/guide/)
- [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config) - our style guide (ESLint + Prettier)
- [Lefthook](https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape) - manages the git hooks

### Committing

Make sure the `pre-commit` hook was executed. It runs automatically before every commit and lints all code. Under the hood it runs `npm run lint` and `npm run ci`. Run these to inspect error details.

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
