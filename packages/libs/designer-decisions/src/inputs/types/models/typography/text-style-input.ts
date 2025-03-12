import type { DecisionInput, TextStyleInput } from '../../primitives';

export type TextStyleValueExplicitInput = DecisionInput & {
    model: 'text-style-value/explicit';
    params: {
        value: TextStyleInput;
    };
};
