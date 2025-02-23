import type { ColorOklabChromaInput, DecisionInput } from '../../../primitives';

export type ColorOklabChromaValueExplicitInput = DecisionInput & {
    model: 'color-oklab-chroma-value/explicit';
    params: {
        value: ColorOklabChromaInput;
        quantize?: number;
    };
};
