import type {
    AnchoredNumberSeriesParams,
    ColorSRGBLightnessInput,
    DecisionInput,
} from '../../../primitives';

export type ColorSRGBLightnessValueExplicitInput = DecisionInput & {
    model: 'color-srgb-lightness-value/explicit';
    params: {
        value: ColorSRGBLightnessInput;
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleExplicitInput = DecisionInput & {
    model: 'color-srgb-lightness-scale/explicit';
    params: {
        values: ColorSRGBLightnessInput[];
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleBoundedInput = DecisionInput & {
    model: 'color-srgb-lightness-scale/bounded';
    params: {
        from: ColorSRGBLightnessInput;
        to: ColorSRGBLightnessInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleAnchoredInput = DecisionInput & {
    model: 'color-srgb-lightness-scale/anchored';
    params: {
        anchor: ColorSRGBLightnessInput;
    } & AnchoredNumberSeriesParams;
};
