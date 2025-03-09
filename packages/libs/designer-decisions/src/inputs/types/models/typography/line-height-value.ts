import type { DecisionInput, LineHeightInput } from '../../primitives';

export type LineHeightValueExplicitInput = DecisionInput & {
    model: 'line-height-value/explicit';
    params: {
        value: LineHeightInput;
        quantize?: number;
    };
};
