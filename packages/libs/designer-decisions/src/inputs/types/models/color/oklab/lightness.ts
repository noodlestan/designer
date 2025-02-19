import type { AnchoredNumberSeriesParams, ColorOklabLightnessInput } from '../../../primitives';
import type { DecisionInput } from '../../../primitives/record';

export type ColorOklabLightnessValueExplicitInput = DecisionInput & {
    model: 'color-oklab-lightness-value/explicit';
    params: {
        value: ColorOklabLightnessInput;
        quantize?: number;
    };
};

export type ColorOklabLightnessScaleExplicitInput = DecisionInput & {
    model: 'color-oklab-lightness-scale/explicit';
    params: {
        values: ColorOklabLightnessInput[];
        quantize?: number;
    };
};

export type ColorOklabLightnessScaleBoundedInput = DecisionInput & {
    model: 'color-oklab-lightness-scale/bounded';
    params: {
        from: ColorOklabLightnessInput;
        to: ColorOklabLightnessInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabLightnessScaleAnchoredInput = DecisionInput & {
    model: 'color-oklab-lightness-scale/anchored';
    params: {
        anchor: ColorOklabLightnessInput;
    } & AnchoredNumberSeriesParams;
};
