import type { ColorInput, ColorValue, ValueContext } from '../../types';

export const createColorValue = (context: ValueContext, input: ColorInput): ColorValue => {
    return {
        get: () => String(input),
        getSpace: () => String(input),
        getString: () => String(input),
    };
};
