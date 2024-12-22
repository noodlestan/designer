import type { Decision } from '@noodlestan/designer-decisions';
import type { StaticDecisionStore } from '@noodlestan/designer-functions';

export type ShowDataProps = {
    d: string | Decision<unknown>;
    store: StaticDecisionStore;
};

export type ShowValueSize = 's' | 'm' | 'l' | 'auto';

export type ShowValueProps = {
    value?: boolean | string | string[];
    viz?: boolean;
    size?: ShowValueSize;
};

export type ShowDecisionProps = ShowDataProps & ShowValueProps;

export type DecisionTypeComponent = (props: ShowDecisionProps) => unknown;
