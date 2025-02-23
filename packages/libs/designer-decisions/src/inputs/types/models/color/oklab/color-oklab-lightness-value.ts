import type { ColorOklabLightnessInput, DecisionInput } from '../../../primitives';

export type ColorOklabLightnessValueExplicitInput = DecisionInput & {
    model: 'color-oklab-lightness-value/explicit';
    params: {
        value: ColorOklabLightnessInput;
        quantize?: number;
    };
};
