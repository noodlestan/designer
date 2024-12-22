import type { ColorInput, ColorSet, ValueContext } from '../../../types';
import { createColorValue } from '../value';

export const createColorSet = (context: ValueContext, input: ColorInput[]): ColorSet => {
    return {
        get: () => input.map(item => createColorValue(context, item)),
    };
};
