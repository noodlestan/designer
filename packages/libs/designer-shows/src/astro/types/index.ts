import type { ColorValue, SpaceValue } from '@noodlestan/designer-decisions';
import type { StaticDecisionStore } from '@noodlestan/designer-functions';

export type ShowDecisionProps = {
    d: string;
    store: StaticDecisionStore; // WIP replace with ShowDecisionStore
};

export type ShowVizSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'auto';

export type ShowVizProps = {
    viz?: boolean | string;
    size?: ShowVizSize;
    options?: object;
    v?: unknown;
};

export type ShowValueProps = {
    value?: boolean | string | string[];
    v?: unknown;
};

export type DecisionTypeComponent = (
    props: ShowDecisionProps & Omit<ShowValueProps, 'v'> & Omit<ShowVizProps, 'v'>,
) => unknown;
export type DecisionValueComponent<T extends object = object> = (
    props: ShowValueProps & T,
) => unknown;
export type DecisionVizComponent<T extends object = object> = (props: ShowVizProps & T) => unknown;

/* space */

export type SpaceVizName = 'square' | 'circle' | 'bar-h' | 'bar-v';

export type SpaceVizProps = ShowVizProps & {
    viz?: boolean | SpaceVizName;
    value?: SpaceValue;
};
export type SpaceVizComponent = (props: SpaceVizProps) => unknown;

/* color */

export type ColorVizName = 'swatch' | 'fg' | 'bg';

export type ShowContentMode = 'typeface' | 'text' | 'graphic' | 'slot';

export type ShowContent = {
    mode?: ShowContentMode;
    content?: string;
};

export type ColorVizOptions = ShowContent & { contrast?: string };

export type ColorVizProps = ShowVizProps & {
    value?: ColorValue;
    options?: ColorVizOptions;
};
export type ColorVizComponent = (props: ColorVizProps) => unknown;
