import type { DecisionTypeComponent, DecisionValueComponent, DecisionVizComponent } from '../types';

export type DecisionTypeComponents<
    ValueProps extends object = object,
    VizProps extends object = ValueProps,
> = {
    decision: {
        component: DecisionTypeComponent;
        props?: object;
    };
    value: {
        component: DecisionValueComponent<ValueProps>;
        props?: ValueProps;
    };
    viz: {
        component: DecisionVizComponent<VizProps>;
        props?: VizProps;
    };
};
