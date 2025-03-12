import type { ColorInput, DecisionInput } from '../../primitives';

export type ColorValueExplicitInput = DecisionInput & {
    model: 'color-value/explicit';
    params: {
        value: ColorInput;
    };
};
