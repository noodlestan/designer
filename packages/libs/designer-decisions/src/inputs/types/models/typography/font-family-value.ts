import type { DecisionInput, FontFamilyInput } from '../../primitives';

export type FontFamilyValueExplicitInput = DecisionInput & {
    model: 'font-family-value/explicit';
    params: {
        value: FontFamilyInput;
    };
};
