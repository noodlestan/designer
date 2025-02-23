import type { ColorOklabHueInput, DecisionInput } from '../../../primitives';

export type ColorOklabHueValueExplicitInput = DecisionInput & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: ColorOklabHueInput;
        quantize?: number;
    };
};
