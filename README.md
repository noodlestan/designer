# Designer Decisions

> Modeling design decisions. Schemas, transformations, visualizations, the works.

![](https://raw.githubusercontent.com/noodlestan/designer/refs/heads/main/docs/designer-decisions/public/designer-decisions-og-1280x640.png)

## Noodlestan 🐘 Collective

We are an open collective of people dedicated to the design and software crafts: UX, design, code, web, 3d, audio, the works. Learn more about us and our projects at [Noodlestan.org](https://noodlestan.org).

**👐 Your contribution is welcome! 👐**

If would like to share your ideas, report a bug, ask for improvements - or simply say hi! 👋 - don't hesitate to join us on [Noodlestan's Discord](https://discord.gg/b8DkbJSF9z) or to drop us a line at `hello@noodlestan.org`.

## How to use

📖 [Documentation](https://designer-decisions.noodlestan.org/)

- [Guides](https://designer-decisions.noodlestan.org/guides/welcome)
- [Examples](https://designer-decisions.noodlestan.org/examples)
- [Integrations](https://designer-decisions.noodlestan.org/integrations)
- [Decision Models](https://designer-decisions.noodlestan.org/models)
- [API](https://designer-decisions.noodlestan.org/api)

If you're looking into how to setup a Design System Docs website based on Designer Decisions models and tokens, refer to our [Integrations / Astro](https://designer-decisions.noodlestan.org/integrations/Astro/) docs.

You can also start from a fully working setup by using one of the [boilerplates](https://designer-decisions.noodlestan.org/examples/boilerplates/).

## Development

System requirements:

- [Node.js](https://nodejs.org/)
- [NVM](https://github.com/nvm-sh/nvm)

We recommended using [VS Code](https://code.visualstudio.com/) with the following extensions: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx), [Github Actions](https://marketplace.visualstudio.com/items?itemName=github.vscode-github-actions), [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode), [SpellRight](https://marketplace.visualstudio.com/items?itemName=ban.spellright), [Generate Index](https://marketplace.visualstudio.com/items?itemName=JayFong.generate-index)

### Getting started

First make sure you are using the correct node version by running `nvm use`.

Install dependencies with `npm install`.

Run a full build with `npm run build:deps`.

Run `npm run dev` in the docs directory: `docs/designer-decisions/`.

### In this repository

Libraries:

- [Designer Decisions](https://github.com/noodlestan/designer/blob/main/packages/libs/designer-decisions/README.md)
- [Designer Functions](https://github.com/noodlestan/designer/blob/main/packages/libs/designer-functions/README.md)
- [Designer Schemas](https://github.com/noodlestan/designer/blob/main/packages/libs/designer-schemas/README.md)
- [Designer Shows](https://github.com/noodlestan/designer/blob/main/packages/libs/designer-shows/README.md)
- [Astro Integration](https://github.com/noodlestan/designer/blob/main/packages/libs/designer-integration-astro/README.md)

Cli tools:

- [Designer Generators](https://github.com/noodlestan/designer/blob/main/packages/clis/designer-generators/README.md)

Docs:

- [Designer Decisions](https://github.com/noodlestan/designer/blob/main/docs/designer-decisions/README.md) - live at https://designer-decisions.noodlestan.org/

Support tools:

- [Designer Build](https://github.com/noodlestan/designer/blob/main/tools/build/README.md)
- [Packages](https://github.com/noodlestan/designer/blob/main/tools/packages/README.md)

### Stack

This library suite targets any JS/TS stack.

Most packages are distributed both as TS modules that modern bundlers can process as well as CJS builds that Node.js and `ts-node` consumers can both `require` or `import`. See each package README for more details.

Documentation components and widgets are (for now) only available as [Astro](https://docs.astro.build) components and distributed in source code only.

It uses:

- [AJV](https://ajv.js.org/) to validate data against JSON schemas.
- [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) to generate JSON schemas from TS types.
- [chroma-js](https://gka.github.io/chroma.js/) for color manipulation.

Documentation is built on top of [Astro](https://docs.astro.build) / [Starlight](https://starlight.astro.build/).

### Tools

- [esbuild](https://esbuild.github.io/)
- [Vitest](https://vitest.dev/guide/)
- [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config) - our style guide (ESLint + Prettier)
- [Lefthook](https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape) - manages the git hooks

### Committing

Make sure the `pre-commit` hook was executed. It runs automatically before every commit and lints all code. Under the hood it runs `npm run lint` and `npm run ci`. Run these to inspect error details.

### Publishing a new release

Update [CHANGELOG](./docs/designer-decisions/CHANGELOG.md).

Bump version and publish to npm

```
npm login
npm run release:prepare 0.0.8
npm run release:publish
```

Commit changes. Make sure `package-lock.json` is updated and included.

```
git checkout -b v0.0.8
npm install
git commit -am 'Publish version v0.0.8'
git push origin v0.0.8
```

Merge the release PR ([example](https://github.com/noodlestan/designer/pull/88)).

Tag the (merged) release commit.

```
git checkout main
git pull
git tag v0.0.8
git push --tags
```

Create the [release on Github](https://github.com/noodlestan/designer/releases).

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
