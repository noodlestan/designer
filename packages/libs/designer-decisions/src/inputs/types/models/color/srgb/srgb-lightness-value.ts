import type { ColorSRGBLightnessInput, DecisionInput } from '../../../primitives';

export type ColorSRGBLightnessValueExplicitInput = DecisionInput & {
    model: 'srgb-lightness-value/explicit';
    params: {
        value: ColorSRGBLightnessInput;
        quantize?: number;
    };
};
