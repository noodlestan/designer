import type {
    AnchoredNumberSeriesParams,
    ColorSRGBHueInput,
    DecisionInput,
} from '../../../primitives';

export type ColorSRGBHueSetExplicitInput = DecisionInput & {
    model: 'color-srgb-hue-set/explicit';
    params: {
        values: ColorSRGBHueInput[];
        quantize?: number;
    };
};

export type ColorSRGBHueSetBoundedInput = DecisionInput & {
    model: 'color-srgb-hue-set/bounded';
    params: {
        from: ColorSRGBHueInput;
        to: ColorSRGBHueInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSRGBHueSetAnchoredInput = DecisionInput & {
    model: 'color-srgb-hue-set/anchored';
    params: {
        anchor: ColorSRGBHueInput;
    } & AnchoredNumberSeriesParams;
};
