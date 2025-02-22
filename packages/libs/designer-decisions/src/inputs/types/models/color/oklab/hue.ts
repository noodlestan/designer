import type {
    AnchoredNumberSeriesParams,
    ColorOklabHueInput,
    DecisionInput,
} from '../../../primitives';

export type ColorOklabHueValueExplicitInput = DecisionInput & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: ColorOklabHueInput;
        quantize?: number;
    };
};

export type ColorOklabHueSetExplicitInput = DecisionInput & {
    model: 'color-oklab-hue-set/explicit';
    params: {
        values: ColorOklabHueInput[];
        quantize?: number;
    };
};

export type ColorOklabHueSetBoundedInput = DecisionInput & {
    model: 'color-oklab-hue-set/bounded';
    params: {
        from: ColorOklabHueInput;
        to: ColorOklabHueInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabHueSetAnchoredInput = DecisionInput & {
    model: 'color-oklab-hue-set/anchored';
    params: {
        anchor: ColorOklabHueInput;
    } & AnchoredNumberSeriesParams;
};
