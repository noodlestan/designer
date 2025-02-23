import type { DecisionInput, FontSizeInput } from '../../primitives';

export type FontSizeValueExplicitInput = DecisionInput & {
    model: 'font-size-value/explicit';
    params: {
        value: FontSizeInput;
        quantize?: number;
    };
};
