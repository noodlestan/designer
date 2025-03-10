import type { DecisionInput, FontFamilyValueInput } from '../../primitives';

export type FontFamilyValueExplicitInput = DecisionInput & {
    model: 'font-family-value/explicit';
    params: {
        value: FontFamilyValueInput;
    };
};
