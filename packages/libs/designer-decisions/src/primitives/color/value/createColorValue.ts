import type {
    ColorInput,
    ColorSpaceInput,
    ColorSpaceName,
    ColorValue,
    ValueContext,
} from '../../../types';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (context: ValueContext, input: ColorInput): ColorValue => {
    const value = resolveColorValue(context, input);

    const getSpace = (space: ColorSpaceName): ColorSpaceInput => {
        if (space === 'hsl') {
            const [h, s, l] = value.hsl();
            return { h, s, l };
        } else if (space === 'hsv') {
            const [h, s, v] = value.hsv();
            return { h, s, v };
        }
        const [r, g, b] = value.rgb(true);
        return { r, g, b };
    };

    const getString = (space: ColorSpaceName) => {
        if (space === 'hsl') {
            return value.css('hsl');
        }
        return value.hex('rgb');
    };

    return {
        get: () => value,
        getSpace,
        getString,
    };
};
