import type { DecisionInput, SizeInputTypefaceInput } from '../../primitives';

export type TypefaceValueExplicitInput = DecisionInput & {
    model: 'typeface-value/explicit';
    params: {
        value: SizeInputTypefaceInput;
    };
};
