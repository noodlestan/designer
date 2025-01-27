import type { ColorInputValue } from '../../primitives';
import type { InputRecord } from '../base';

export type ColorValueExplicitInput = InputRecord & {
    model: 'color-value/explicit';
    params: {
        value: ColorInputValue;
    };
};
