import type { DecisionInput, LetterSpacingInput } from '../../primitives';

export type LetterSpacingValueExplicitInput = DecisionInput & {
    model: 'letter-spacing-value/explicit';
    params: {
        value: LetterSpacingInput;
        quantize?: number;
    };
};
