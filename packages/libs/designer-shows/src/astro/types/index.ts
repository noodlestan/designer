import type { ColorValue, Decision, SpaceValue } from '@noodlestan/designer-decisions';
import type { StaticDecisionStore } from '@noodlestan/designer-functions';

export type ShowDataProps = {
    d: string | Decision<unknown>;
    store: StaticDecisionStore;
};

export type ShowValueSize = 's' | 'm' | 'l' | 'auto';

export type VizProps = {
    size?: ShowValueSize;
    show?: object;
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

export type ColorVizProps = VizProps & {
    value?: ColorValue;
};
export type ColorVizComponent = (props: ColorVizProps) => unknown;
