# [Designer Decisions](https://github.com/noodlestan/designer/releases)

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
- New errors `DecisionValueRefIndexError`
- helpers for `cli` code
  - `produceDecisions()`
  - `produceDecisionStatus()`
  - `formatDecisionStatus()`

### Changed

- Renamed `DecisionValueContext` to `ValueContext`
- Separated public and private constructors for `ValueContext`
- Renamed `StaticStoreDecision` to `StaticDecision`
- Renamed `DecisionValueError` to `ValueError`
- Renamed `DecisionInputBase` to `InputRecord`
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
- `createDecisionLoader()` now supports specifying "package" data sources.

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
