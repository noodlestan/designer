import type {
    AnchoredNumberSeriesParams,
    ColorOklabHueInput,
    DecisionInput,
} from '../../../primitives';

export type ColorOklabHueSetExplicitInput = DecisionInput & {
    model: 'oklab-hue-set/explicit';
    params: {
        values: ColorOklabHueInput[];
        quantize?: number;
    };
};

export type ColorOklabHueSetBoundedInput = DecisionInput & {
    model: 'oklab-hue-set/bounded';
    params: {
        from: ColorOklabHueInput;
        to: ColorOklabHueInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabHueSetAnchoredInput = DecisionInput & {
    model: 'oklab-hue-set/anchored';
    params: {
        anchor: ColorOklabHueInput;
    } & AnchoredNumberSeriesParams;
};
