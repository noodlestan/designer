import type { ColorOklabChromaScaleBoundedInput } from '../../../inputs';
import {
    type OklabChromaScale,
    createOklabChromaScale,
    createOklabChromaValue,
    generateBoundedSeries,
} from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabChromaScaleBoundedModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const fromValue = createOklabChromaValue(context.nestedContext(), params.from, {
                quantize,
            });
            const toValue = createOklabChromaValue(context.nestedContext(), params.to, {
                quantize,
            });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.slice(1, series.length - 1).map(item =>
                createOklabChromaValue(context.nestedContext(), item, {
                    quantize,
                }),
            );
            return createOklabChromaScale(context, [fromValue, ...values, toValue]);
        },
    };
};
