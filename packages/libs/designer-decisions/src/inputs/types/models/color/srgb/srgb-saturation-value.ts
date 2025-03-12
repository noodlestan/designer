import type { ColorSRGBSaturationInput, DecisionInput } from '../../../primitives';

export type ColorSRGBSaturationValueExplicitInput = DecisionInput & {
    model: 'srgb-saturation-value/explicit';
    params: {
        value: ColorSRGBSaturationInput;
        quantize?: number;
    };
};
