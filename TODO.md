# TODO

## Docs

- fix headings not working!

```
const frontmatter = {
    ...decisionType.data,
    title: decisionType.data.name,
    headings
};
```

- docs components
  - Banner
  - LinkCard (for example gallery and component reference)

## Decisions

- consider renaming all decision model factories to a common suffix, e.g.:
  - createSpaceScaleLinearRangeModel (favorite)
  - createSpaceScaleLinearRangeDecision

## Visualizations

- rename: atoms/DecisionValue => atoms/ValueLayout

- implement `graphic` and `slot` content in `<Color*Viz/>`

  - document, add to examples
  - search: `return content || '*';`

- make it possible to pass values or decisions in ColorVizProps `contrast`

  - make it a ColorInput, use resolveColorValue?

- Add icons to ShowDecisionUnavailable, ShowDecisionTypeUnavailable

## Model

- TypefaceDecision
- TypeVariantDecision
- TypePattern

- BorderRadius
- BorderStyle
- BackgroundStyle
- DropShadowStyle

## Docs

- add reference data page
  - showcase the data included in the repository
  - easy snippets to copy?
- render schema page(s)
  - link to reference data
- get rid of decision models page
  - render models inline in the decision type page
  - link to model schema
  - render one sample per model
  - link to data reference (link to components as well?)

## Layouts

- refine `<ShowDecisionCard />` layout
- add `<ShowDecisionPill/>` (name viz, value)

## Config

- document
  - store: StaticDecisionStore; // WIP replace with ShowDecisionStore
- pass config to store so that it is available in every component
  - use cases:
    - default flags for cards/pills (update docs)
    - default viz per decision type
    - default props for viz components
    - register new viz components
    - generate links for decisions
    - generate links for usage entries
    - resolveVizContent graphic

## Usage

- visualize usage with `<ShowUsage />` and `<ShowUsageList />`
- generate links for usage entries

## Contexts

- load context decisions, create groups, sort priorities
- visualize contexts with `<ShowContext>` and `<ShowContextList/>`
- load decisions vs context

  - if decision exists, validate that it is of the same type

- pass context to store and decision components

  - match context
  - display active context with `<ShowDecisionContexts/>` (badge)
  - display same decision for other contexts (another flag?)

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

- DevX: wrap DecisionLoader in a file watcher so that promise cache is invalidated when source files change
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
