import type { DecisionInput, SizeValueInput } from '../../primitives';

export type SizeValueExplicitInput = DecisionInput & {
    model: 'size-value/explicit';
    params: {
        value: SizeValueInput;
        quantize?: number;
    };
};
