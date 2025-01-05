import {
    createOklabChromaScale,
    createOklabChromaValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type {
    ColorOklabChromaScaleAnchoredInput,
    DecisionModelFactory,
    OklabChromaScale,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabChromaScaleAnchoredModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createOklabChromaValue(valueContext, params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 0.4]);
            const values = series.map(item => createOklabChromaValue(valueContext, item));
            const value = createOklabChromaScale(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
