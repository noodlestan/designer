import type { SpaceValueInput } from '../../primitives';
import type { DecisionInput } from '../../primitives/record';

export type SpaceValueExplicitInput = DecisionInput & {
    model: 'space-value/explicit';
    params: {
        value: SpaceValueInput;
        quantize?: number;
    };
};
