import type { ColorInputValue } from '../../primitives';
import type { DecisionInputBase } from '../base';

export type ColorValueExplicitInput = DecisionInputBase & {
    model: 'color-value/explicit';
    params: {
        value: ColorInputValue;
    };
};
