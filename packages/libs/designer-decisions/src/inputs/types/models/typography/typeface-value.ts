import type { DecisionInput, TypefaceValueInput } from '../../primitives';

export type TypefaceValueExplicitInput = DecisionInput & {
    model: 'typeface-value/explicit';
    params: {
        value: TypefaceValueInput;
    };
};
