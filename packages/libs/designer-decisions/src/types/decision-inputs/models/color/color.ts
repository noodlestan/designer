import type { ColorValueInput } from '../../primitives';
import type { InputRecord } from '../base';

export type ColorValueExplicitInput = InputRecord & {
    model: 'color-value/explicit';
    params: {
        value: ColorValueInput;
    };
};
