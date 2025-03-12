import type {
    AnchoredNumberSeriesParams,
    ColorOklabChromaInput,
    DecisionInput,
} from '../../../primitives';

export type ColorOklabChromaScaleExplicitInput = DecisionInput & {
    model: 'oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabChromaInput[];
        quantize?: number;
    };
};

export type ColorOklabChromaScaleBoundedInput = DecisionInput & {
    model: 'oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabChromaInput;
        to: ColorOklabChromaInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = DecisionInput & {
    model: 'oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabChromaInput;
    } & AnchoredNumberSeriesParams;
};
