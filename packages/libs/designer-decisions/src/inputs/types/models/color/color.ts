import type { ColorValueInput } from '../../primitives';
import type { InputRecord } from '../../primitives/record';

export type ColorValueExplicitInput = InputRecord & {
    model: 'color-value/explicit';
    params: {
        value: ColorValueInput;
    };
};
