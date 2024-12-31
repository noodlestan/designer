import { createAnchoredColorList, createColorSet, createColorValue } from '../../../../primitives';
import type {
    ColorOkLCHLiteral,
    ColorSet,
    ColorSetAnchoredInput,
    DecisionModelFactory,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetAnchoredModel: DecisionModelFactory<
    ColorSet,
    ColorSetAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const anchor = createColorValue(valueContext, params.anchor);

                const { before, after } = params;
                const beforeValues = before
                    ? createAnchoredColorList(anchor, before.steps, before.modifier)
                    : [];
                const afterValues = after
                    ? createAnchoredColorList(anchor, after.steps, after.modifier)
                    : [];

                return createColorSet(valueContext, [
                    ...beforeValues,
                    anchor.toObject('oklch') as ColorOkLCHLiteral,
                    ...afterValues,
                ]);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
