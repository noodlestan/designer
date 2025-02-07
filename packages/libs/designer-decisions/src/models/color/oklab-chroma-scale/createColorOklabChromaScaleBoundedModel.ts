import {
    createOklabChromaScale,
    createOklabChromaValue,
    generateBoundedSeries,
} from '../../../primitives';
import {
    type ColorOklabChromaScaleBoundedInput,
    type DecisionModelFactory,
    type OklabChromaScale,
} from '../../../types';

export const createColorOklabChromaScaleBoundedModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { precision } = params;

            const fromValue = createOklabChromaValue(context.nestedContext(), params.from, {
                precision,
            });
            const toValue = createOklabChromaValue(context.nestedContext(), params.to, {
                precision,
            });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.slice(1, series.length - 1).map(item =>
                createOklabChromaValue(context.nestedContext(), item, {
                    precision,
                }),
            );
            return createOklabChromaScale(context, [fromValue, ...values, toValue]);
        },
    };
};
