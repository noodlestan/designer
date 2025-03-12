import type { DecisionInput, SizeInput } from '../../primitives';

export type SizeValueExplicitInput = DecisionInput & {
    model: 'size-value/explicit';
    params: {
        value: SizeInput;
        quantize?: number;
    };
};
