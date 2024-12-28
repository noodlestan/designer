# TODO

## Banner

## Viz

- fix: ShowColorLightnessScaleDecision `[object Object]`

- SpaceScale
- SpaceValue

- ColorValue `viz = ColorSwatch | ColorSwatchFg | ColorSwatchBg ...`
- ColorSwatchFg `show={symbol: 'graphic' | 'type', opposite: ColorInput }`
- ColorSwatchBg `show={symbol: 'graphic' | 'type', opposite: ColorInput }`

- Add icons to ShowDecisionUnavailable, ShowDecisionTypeUnavailable

## Model

- TypefaceDecision
- TypeVariantDecision
- TypePattern

- BorderRadius
- BorderStyle
- BackgroundStyle
- DropShadowStyle

## Layouts

- refine `<ShowDecisionCard />` layout
- add `<ShowDecisionPill/>` (name viz, value)

## Config

- pass config to store so that it is available in every component
  - default viz

## Contexts

- load context decisions, create groups
- visualize contexts (new components)
- load decisions vs context

  - if decision exists, validate that it is of the same type

- pass context to store and decision components
  - match context
  - display active context
  - display decisions with other contexts (another flag?)
- document

## Tokenize

- add tokens and token patterns inline with decisions
- document

## Generators

- generate CSS vars
  - query contexts
  - resolve to tokens instead of values

## Resolution and Error handling

- Expose icon warning in ..? where? DecisionValue?
- Expose validation errors in card (new section "errors")
- WIP resolving values throws, should collect errors
- Expose resolution details
  - display in card (new section "linked decisions")

# Backlog

- DecisionList component
- Load decisions from YAML, TypeScript
- Import from Figma, Specify, TokenStudio, ...

# 💡 Dream List

- Generate snapshots, and track version history.
- Studio App: web-based tool for interactive navigation, collaboration,
  and navigation of design decisions.
- API-Driven: Interact with decisions programmatically for integration and automation.
- Version Control & Review: Built-in workflows for tracking changes,
  reviewing, and reverting decisions.
