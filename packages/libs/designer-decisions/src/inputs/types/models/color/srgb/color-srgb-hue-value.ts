import type { ColorSRGBHueInput, DecisionInput } from '../../../primitives';

export type ColorSRGBHueValueExplicitInput = DecisionInput & {
    model: 'color-srgb-hue-value/explicit';
    params: {
        value: ColorSRGBHueInput;
        quantize?: number;
    };
};
