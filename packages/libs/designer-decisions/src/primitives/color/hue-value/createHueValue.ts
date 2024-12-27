import type { ColorHueInput, HueValue, ValueContext } from '../../../types';
import { createColorValue } from '../value';

import { resolveHueValue } from './resolveHueValue';

export const createHueValue = (context: ValueContext, input: ColorHueInput): HueValue => {
    const value = resolveHueValue(context, input);

    return {
        get: () => value,
        getColor: components => {
            const { s, l } = components;
            return createColorValue(context, { h: value, s, l });
        },
    };
};
