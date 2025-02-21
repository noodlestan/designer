import type { DecisionInput, TypefaceValueAttributesInput } from '../../primitives';

export type TypefaceValueExplicitInput = DecisionInput & {
    model: 'typeface-value/explicit';
    params: {
        fontName: string;
        capabilities?: string[];
        source?: TypefaceValueAttributesInput['source'];
        styles?: TypefaceValueAttributesInput['styles'];
        ranges?: TypefaceValueAttributesInput['ranges'];
    };
};
