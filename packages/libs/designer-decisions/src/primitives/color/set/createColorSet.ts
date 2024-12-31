import type { ColorInputValue, ColorSet, ValueContext } from '../../../types';
import { createColorValue } from '../value';

export const createColorSet = (context: ValueContext, input: ColorInputValue[]): ColorSet => {
    return {
        get: () => input.map(item => createColorValue(context, item)),
    };
};
