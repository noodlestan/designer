import type {
    ColorChannelValue,
    ColorFormat,
    ColorValue,
    FontSizeValue,
    FontWeightValue,
    SizeValue,
    Store,
    TypefaceValue,
} from '@noodlestan/designer-decisions';

import type { LayoutDynamicProps } from '../layouts';

export type ShowDecisionLayoutName = LayoutDynamicProps['layout'];

export type ShowDecisionLayout =
    | ShowDecisionLayoutName
    | [ShowDecisionLayoutName, ShowDecisionLayoutName?];

export type ShowDecisionProps = {
    d: string;
    store: Store;
    layout?: ShowDecisionLayout;
};

export type ShowVizSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'auto';

export type ShowVizProps = {
    viz?: boolean | string;
    size?: ShowVizSize;
    options?: object;
    v?: unknown;
    muteErrors?: boolean;
};

export type ShowValueProps = {
    value?: boolean | string | string[];
    v?: unknown;
    muteErrors?: boolean;
};

export type DecisionTypeComponentProps = ShowDecisionProps &
    Omit<ShowValueProps, 'v'> &
    Omit<ShowVizProps, 'v'>;

export type DecisionTypeComponent = (props: DecisionTypeComponentProps) => unknown;
export type DecisionValueComponent<T extends object = object> = (
    props: ShowValueProps & T,
) => unknown;
export type DecisionVizComponent<T extends object = object> = (props: ShowVizProps & T) => unknown;

/* space */

export type SizeValueProps = ShowValueProps & {
    v?: SizeValue;
};

export type SizeVizName = 'square' | 'circle' | 'bar-h' | 'bar-v';

export type SizeVizProps = ShowVizProps & {
    viz?: boolean | SizeVizName;
    v?: SizeValue;
};
export type SizeVizComponent = (props: SizeVizProps) => unknown;

/* color */

export type ColorValueProps = ShowValueProps & {
    value: boolean | ColorFormat | ColorFormat[];
    v?: ColorValue;
};

export type ColorChannelValueProps = ShowValueProps & {
    v?: ColorChannelValue;
};

export type ColorVizName = 'swatch' | 'fg' | 'bg';

export type ShowContentMode = 'typeface' | 'text' | 'graphic' | 'slot';

export type ShowContent = {
    mode?: ShowContentMode;
    content?: string;
};

export type ColorVizOptions = ShowContent & { contrast?: string };

export type ColorVizProps = ShowVizProps & {
    v?: ColorValue;
    options?: ColorVizOptions;
};
export type ColoChannelVizProps = ShowVizProps & {
    v?: ColorChannelValue;
    options?: ColorVizOptions;
};
export type ColorVizComponent = (props: ColorVizProps) => unknown;

/* typography */

export type TypefaceValueProps = ShowValueProps & {
    v?: TypefaceValue;
};

export type FontWeightValueProps = ShowValueProps & {
    v?: FontWeightValue;
};

export type TextStyleVizName = 'short-text';

export type TextStyleVizProps = ShowVizProps & {
    viz?: boolean | TextStyleVizName;
    v?: TypefaceValue | FontSizeValue | FontWeightValue;
};
export type TextStyleVizComponent = (props: TextStyleVizProps) => unknown;
