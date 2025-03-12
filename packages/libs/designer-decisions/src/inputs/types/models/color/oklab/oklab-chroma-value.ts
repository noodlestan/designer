import type { ColorOklabChromaInput, DecisionInput } from '../../../primitives';

export type ColorOklabChromaValueExplicitInput = DecisionInput & {
    model: 'oklab-chroma-value/explicit';
    params: {
        value: ColorOklabChromaInput;
        quantize?: number;
    };
};
