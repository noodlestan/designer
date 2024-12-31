import type { ColorSet, ColorValue, DecisionValueContext } from '../../../types';

export const createColorSet = (context: DecisionValueContext, colors: ColorValue[]): ColorSet => {
    return {
        get: () => colors,
    };
};
