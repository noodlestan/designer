import type { DecisionInput, FontWeightInput } from '../../primitives';

export type FontWeightValueExplicitInput = DecisionInput & {
    model: 'font-weight-value/explicit';
    params: {
        value: FontWeightInput;
        quantize?: number;
    };
};
