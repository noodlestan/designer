import type { TypefaceValueExplicitInput } from '../../../inputs';
import { type TypefaceValue, createTypefaceValue } from '../../../primitives';
import type { DeepPartial } from '../../../private';
import type { DecisionModelFactory } from '../../types';

export const createTypefaceValueExplicitModel: DecisionModelFactory<
    TypefaceValue,
    TypefaceValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const p = params as DeepPartial<TypefaceValueExplicitInput['params']>;
            return createTypefaceValue(context, p);
        },
    };
};
