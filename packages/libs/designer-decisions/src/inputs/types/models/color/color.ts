import type { ColorValueInput } from '../../primitives';
import type { InputRecord } from '../../record';

export type ColorValueExplicitInput = InputRecord & {
    model: 'color-value/explicit';
    params: {
        value: ColorValueInput;
    };
};
