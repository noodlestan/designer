import type {
    AnchoredNumberSeriesParams,
    ColorOklabLightnessInput,
    DecisionInput,
} from '../../../primitives';

export type ColorOklabLightnessScaleExplicitInput = DecisionInput & {
    model: 'oklab-lightness-scale/explicit';
    params: {
        values: ColorOklabLightnessInput[];
        quantize?: number;
    };
};

export type ColorOklabLightnessScaleBoundedInput = DecisionInput & {
    model: 'oklab-lightness-scale/bounded';
    params: {
        from: ColorOklabLightnessInput;
        to: ColorOklabLightnessInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabLightnessScaleAnchoredInput = DecisionInput & {
    model: 'oklab-lightness-scale/anchored';
    params: {
        anchor: ColorOklabLightnessInput;
    } & AnchoredNumberSeriesParams;
};
