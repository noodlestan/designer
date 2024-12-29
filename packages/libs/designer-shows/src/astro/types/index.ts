import type { ColorValue, Decision, SpaceValue } from '@noodlestan/designer-decisions';
import type { StaticDecisionStore } from '@noodlestan/designer-functions';

export type ShowDataProps = {
    d: string | Decision<unknown>;
    store: StaticDecisionStore; // WIP replace with ShowDecisionStore
};

export type ShowValueSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'auto';

export type VizProps = {
    store: StaticDecisionStore; // WIP replace with ShowDecisionStore
    size?: ShowValueSize;
    options?: object;
};

export type ShowValueProps = VizProps & {
    value?: boolean | string | string[];
    viz?: boolean | string;
};

export type ShowDecisionProps = ShowDataProps & ShowValueProps;

export type DecisionTypeComponent = (props: ShowDecisionProps) => unknown;

export type SpaceVizName = 'square' | 'circle' | 'bar-h' | 'bar-v';

export type SpaceVizProps = VizProps & {
    viz?: boolean | SpaceVizName;
    value?: SpaceValue;
};
export type SpaceVizComponent = (props: SpaceVizProps) => unknown;

export type ColorVizName = 'swatch' | 'fg' | 'bg';

export type ShowContentMode = 'typeface' | 'text' | 'graphic' | 'slot';

export type ShowContent = {
    mode?: ShowContentMode;
    content?: string;
};

export type ColorVizOptions = ShowContent & { contrast: string };

export type ColorVizProps = VizProps & {
    value?: ColorValue;
    options?: ColorVizOptions;
};
export type ColorVizComponent = (props: ColorVizProps) => unknown;
