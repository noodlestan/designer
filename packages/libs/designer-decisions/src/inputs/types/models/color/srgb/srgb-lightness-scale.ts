import type {
    AnchoredNumberSeriesParams,
    ColorSRGBLightnessInput,
    DecisionInput,
} from '../../../primitives';

export type ColorSRGBLightnessScaleExplicitInput = DecisionInput & {
    model: 'srgb-lightness-scale/explicit';
    params: {
        values: ColorSRGBLightnessInput[];
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleBoundedInput = DecisionInput & {
    model: 'srgb-lightness-scale/bounded';
    params: {
        from: ColorSRGBLightnessInput;
        to: ColorSRGBLightnessInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleAnchoredInput = DecisionInput & {
    model: 'srgb-lightness-scale/anchored';
    params: {
        anchor: ColorSRGBLightnessInput;
    } & AnchoredNumberSeriesParams;
};
