import type { ColorValueInput } from '../../primitives';
import type { DecisionInput } from '../../primitives/record';

export type ColorValueExplicitInput = DecisionInput & {
    model: 'color-value/explicit';
    params: {
        value: ColorValueInput;
    };
};
