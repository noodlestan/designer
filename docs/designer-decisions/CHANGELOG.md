# [Designer Decisions](https://github.com/noodlestan/designer/releases)

## [0.0.14] - 2025-03-12

### Added

- Typography primitives and basic decision types and models:
  - Create `TextStyleValue` + model `font-style-value/explicit` ([#211](https://github.com/noodlestan/designer/issues/211))
  - Create `FontFamilyValue` + model `font-family-value/explicit` ([#212](https://github.com/noodlestan/designer/issues/212))
  - Create `LetterSpacingValue` + model `letter-spacing-value/explicit` ([#213](https://github.com/noodlestan/designer/issues/213))
  - Create `LineHeightValue` + model `line-height-value/explicit` ([#207](https://github.com/noodlestan/designer/issues/207))
  - Create `FontWeightValue` + model `font-weight-value/explicit` ([#205](https://github.com/noodlestan/designer/issues/205))
  - Create `FontSizeValue` + model `font-size-value/explicit` ([#200](https://github.com/noodlestan/designer/issues/200))
  - Create `TypefaceValue` + model `typeface-value/explicit` ([#189](https://github.com/noodlestan/designer/issues/189))
- Allow referencing schema sources in decision sources and make schemas optional in StoreOptions ([#186](https://github.com/noodlestan/designer/issues/186))
- Improve `ShowUsage` layout and layout component options ([#188](https://github.com/noodlestan/designer/pull/188))
- Handle store errors ([#165](https://github.com/noodlestan/designer/issues/165))
- Fallback to defaullts in case of input (generic) validation errors ([#169](https://github.com/noodlestan/designer/issues/169))

### Changed

- Formalize`Model/Value/Primitive` and respective contexts:

  - Add `ModelContext`, created in `Decision` via `createModelContext()` before invoking model.
  - Instances of `ValueContext` are now created in the model via `context.forValue()`.
  - Add `PrimitiveContext`, created by values via `context.forPrimitive()`.
  - Link contexts between them: errors can be inspected equally from the model or a primitive.
  - Wxtend all errors from `DesignerError` - has name, `message()` and `docs()`.
  - Expose primitive attributes and methods in decision values.
  - Get rid of `get()` everywhere.
  - Simplify `formatError()` functions down to a single one.

- Expose a `type()` getter in `BaseValue` ([#199](https://github.com/noodlestan/designer/pull/199))
- DRY decision values with `createBaseSet()` and `createColorChannelValue()` ([#193](https://github.com/noodlestan/designer/issues/193))
- Rename space models values and primitives to "size" ([#201](https://github.com/noodlestan/designer/issues/201))
- Rename `name` to `channelName` in `ColorChannelBaseValue` ([#197](https://github.com/noodlestan/designer/issues/197))

## [0.0.13] - 2025-02-16

### Added

- Add watcher feature to Astro integration ([#25](https://github.com/noodlestan/designer/issues/25))
- Display decision value warnings in components ([#21](https://github.com/noodlestan/designer/issues/21))
- Create `dd.config` entry point and helpers ([#161](https://github.com/noodlestan/designer/issues/161))
- Switch from Vite to esbuild where possible ([#163](https://github.com/noodlestan/designer/issues/163))
- Make package resolution param optional in staticStoreBuilder() ([#80](https://github.com/noodlestan/designer/issues/80))

### Upgrade dependencies

- Update Sharp - `0.32.5` to `0.33.3` ([#168](https://github.com/noodlestan/designer/pull/168))

### Docs

- Add "Boilerplates" page ([#27](https://github.com/noodlestan/designer/issues/27))
- Add "API / Configuration" page ([#161](https://github.com/noodlestan/designer/issues/161))
- Group "Decision Models" and "Schemas" under "Models" ([#156](https://github.com/noodlestan/designer/issues/156))

## [0.0.12] - 2025-02-10

### Added

- Expose channel `name()` in color channel Values ([#131](https://github.com/noodlestan/designer/issues/131))
- Create separate components for value and viz ([#132](https://github.com/noodlestan/designer/issues/132))
- Add `layout` prop to decision components ([#134](https://github.com/noodlestan/designer/issues/134))
- Add `layout` prop to decision card ([#136](https://github.com/noodlestan/designer/issues/136))
- Add `quantize`feature to Values and Models ([#140](https://github.com/noodlestan/designer/issues/140))
- Add default quantize to all Values ([#142](https://github.com/noodlestan/designer/issues/142))
- Handle errors when loading and validating decisions ([#148](https://github.com/noodlestan/designer/issues/148))

### Changed

- Prefix local CSS vars with `__` in Astro components ([#137](https://github.com/noodlestan/designer/issues/137))

### Upgrade dependencies

- Update Vite - `4.5` to `6.1.0` ([#145](https://github.com/noodlestan/designer/issues/145))
- Upgrade Vitest - `1.6` to `3.0.5` ([#145](https://github.com/noodlestan/designer/issues/145))
- Upgrade Astro - `4/5` to `5.2.5` ([#145](https://github.com/noodlestan/designer/issues/145))

### Docs

- Move Astro component reference to "Integrations" ([#144](https://github.com/noodlestan/designer/issues/144))
- Create and use WIP component ([#146](https://github.com/noodlestan/designer/issues/146))
- Streamline guide names ([#150](https://github.com/noodlestan/designer/issues/150))
- Update logos, type styles, and homepage copy ([#152](https://github.com/noodlestan/designer/issues/152))

## [0.0.10] - 2025-02-01

### Added

- Create Oklch components [#7](https://github.com/noodlestan/designer/issues/7)
- Add Layout components [105](https://github.com/noodlestan/designer/issues/105)
- Add starlight styles to astro integration [#107](https://github.com/noodlestan/designer/issues/107)

### Docs

- Improve code blocks in docs with expressive code collapse plugin [#117](https://github.com/noodlestan/designer/issues/117) [#115](https://github.com/noodlestan/designer/issues/115)
- Add "warning: experimental" banners to homepage and API index [#124](https://github.com/noodlestan/designer/issues/124)

## [0.0.9] - 2025-01-30

### Changed

- Rename `designer-integrations-astro` to `designer-integration-atro` ([#110](https://github.com/noodlestan/designer/issues/110))

### Fixes

- Fix: demo data not published to npm (#[108](https://github.com/noodlestan/designer/issues/108))

## [0.0.8] - 2025-01-30

### Added

- Basic Astro integration `@noodlestan/designer-astro-integration` loads CSS for `Show` components [#91](https://github.com/noodlestan/designer/issues/91)
- Docs sample data is now available as `DEMO_DATA` in `@noodlestan/designer-decisions` [#94](https://github.com/noodlestan/designer/issues/94)

### Changed

- Renamed input types that compose `DecisionRef` to end with `Input` suffix [#95](https://github.com/noodlestan/designer/issues/95)

### Fixed

- Fix: color channel input types don't allow using reference [#93](https://github.com/noodlestan/designer/issues/93)

## [0.0.7] - 2025-01-29

### Highlights

- Implements Ref resolution across values. E.g.:
  - referencing a `ColorValue` in a `*HueValue` extracts color channel from color
  - referencing a `SpaceScale` in a `SpaceValue` extracts value at `index`
- No more WIP left over in existing `Color` and `Space` models and primitives
- Improves error handling
  - more specific error types that capture attributes of the error
  - `ValueContext` tracks and exposes nested errors
  - new `produceDecisions()` helper validates all values at once
- 100% test coverage for `@noodlestan/designer-decisions` (all primitives! and models!)

### Added

- New component `ShowColorChannelValue` replaces all other channel components
- All values now extend `BaseVale` and expose `context()`
- New `ValueContext` methods
  - `nestedContext()` - to resolve model values
  - `childContext()` - to resolve refs
  - `children()`
  - `nested()`
  - `ownErrors()`
  - `allErrors()`
- New primitives and helpers:
  - `ItemSet` encapsulates lists as a value for use in scales/sets
  - `Color` wraps `chroma` and is merged into `ColorValue`
  - `resolveSetRefDecision()` resolves to item within a set
  - `chromaColorFromLiteral()`
  - `chromaColorToLiteral()`
  - `chromaColorToString()`
  - `generateColorList()`
- Specific types for each error that extends `DecisionError` and `ValueError`
- New errors `ValueRefIndexError`
- helpers for `cli` code
  - `produceDecisions()`
  - `produceDecisionStatus()`
  - `formatDecisionStatus()`

### Changed

- Renamed `DecisionValueContext` to `ValueContext`
- Separated public and private constructors for `ValueContext`
- Renamed `StaticStoreDecision` to `StaticDecision`
- Renamed `ValueError` to `ValueError`
- Renamed `DecisionInputBase` to `DecisionInput`
- Renamed `DecisionInputError` to `ValidationError`
- Renamed `createRefMatchError`() `to createRefMismatchError()`
- Decisions `StaticStoreDecision` now created with `input[]` (all matching inputs, across all contexts)
- All `create.*Error()` functions now accept a single object param
- All subclasses of `DecisionError` and `ValueError` now expose `message(): string` (and context attributes) instead of just `msg: string`
- `create*Error()` functions accept a single object instead of many params

### Removed

- Eliminate `DecisionValue<V>` indirection
- Removed everything resolution related (e.g.: lookupContext) from `DecisionContext`
- `StaticDecisionMap:createDecision()` making `resolve()` the single entry point

### Docs

- Added "How to use references" to "Capturing decisions in data" guide
- Added references to sample data
- new `<GetInvolved />` component to link to github issues

## Tests

- Add mocks for commonly used params
- 100% test coverage

### Fixes

- Bounded scale/sets were repeating first and last element
- Example data contained sets with clamped values

## [0.0.6] - 2025-01-08

### Added

- New `viz` options for color decisions, including mode, contrast, and content.
- Support for missing sRGB and oklab decision models, primitives, and sample data.
- Some error handling for contexts and factories.
- Color and space visualization components, including `Space*Viz` and `color viz options`.
- Components for N/A states: `ShowDecisionUnavailable`, `ShowDecisionTypeUnavailable`.
- `staticStoreBuilder()` now supports specifying "package" data sources.

### Changed

- Moved sample data to `designer-decisions` package and cleaned up meta data.
- Consolidated set/scale models: "bounded" and "anchored" models available in all set/scale decision types.
- Use `BaseSet` instead of `BaseValue` where applicable.
- Renamed color meta names: removed `Color` prefix from sRGB and oklab decision types.

### Removed

- No longer producing schemas for union types (no use case so far).

### Docs

- Streamlined component references and documentation.
- Add sample data for all decision types and models. including Oklab and sRGB.
- Render sample data next to sample card in Decision reference.
- Refined decision model metas.

### Fixes

- Fixed typos in decision models.
- Resolved AJV strict mode warnings.
- Corrected union types handling for decision models and value resolution.
- Fixed schema issues in `designer-schemas`; explicit `$ref` usage.
- Fixed schemas not being published to npm due to `schema/` dir not being included in files.

## [0.0.5] - 2024-12-30

### Added

- Basic documentation at https://designer-decisions.noodlestan.org
- Published schemas under `@noodlestan/designer-schemas`.
- Astro components for visualizing decisions in MDX.
- Astro/Starlight documentation website.

## [0.0.4] - 2024-12-27

### Added

- Initial implementation of color decision visualization options.
- Version update for `designer-decisions` and fixes to component handling.

### Fixed

- Fixed issue with schemas not being published due to incorrect file setup.

## [0.0.3] - 2024-12-27

### Added

- Astro/Starlight documentation website.
- SolidJS placeholder component for design decisions.
- Updated documentation for decision components and API.

## [0.0.2] - 2024-12-26

### Added

- Schema generator.
- Schema loaders and decision validators in `@noodlestan/designer-functions`.

## [0.0.1] - 2024-12-19

### Initial Release

- Basic color and space decision models.
- Initial implementation of decision models in `@noodlestan/designer-functions`
