import type { ColorValueInput, DecisionInput } from '../../primitives';

export type ColorValueExplicitInput = DecisionInput & {
    model: 'color-value/explicit';
    params: {
        value: ColorValueInput;
    };
};
