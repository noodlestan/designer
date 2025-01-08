# [Designer Decisions](https://github.com/noodlestan/designer/releases)

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

### Document

- Streamlined component references and documentation.
- Add sample data for all decision types and models. including Oklab and sRGB.
- Render sample data next to sample card in Decision reference.
- Refined decision model metas.

### Fixed

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
