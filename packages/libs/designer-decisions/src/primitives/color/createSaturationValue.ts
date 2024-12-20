import type { ColorSaturationInput, SaturationValue, ValueContext } from '../../types';

export const createSaturationValue = (
    context: ValueContext,
    input: ColorSaturationInput,
): SaturationValue => {
    // if (typeof input === 'object') {
    //     const
    // }

    return {
        get: () => Number(input),
    };
};
