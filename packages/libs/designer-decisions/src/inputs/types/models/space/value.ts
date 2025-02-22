import type { DecisionInput, SpaceValueInput } from '../../primitives';

export type SpaceValueExplicitInput = DecisionInput & {
    model: 'space-value/explicit';
    params: {
        value: SpaceValueInput;
        quantize?: number;
    };
};
