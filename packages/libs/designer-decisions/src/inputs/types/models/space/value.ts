import type { SpaceValueInput } from '../../primitives';
import type { InputRecord } from '../../primitives/record';

export type SpaceValueExplicitInput = InputRecord & {
    model: 'space-value/explicit';
    params: {
        value: SpaceValueInput;
        quantize?: number;
    };
};
