import type { ColorSet, ColorValue, DecisionValueContext } from '../../../types';

export const createColorSet = (context: DecisionValueContext, input: ColorValue[]): ColorSet => {
    context.consume(input);

    return {
        get: () => input,
    };
};
