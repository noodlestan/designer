import type { ColorHueInput, HueValue, ValueContext } from '../../../types';

export const createHueValue = (context: ValueContext, input: ColorHueInput): HueValue => {
    return {
        get: () => Number(input),
    };
};
