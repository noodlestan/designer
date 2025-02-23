import type {
    AnchoredNumberSeriesParams,
    ColorOklabChromaInput,
    DecisionInput,
} from '../../../primitives';

export type ColorOklabChromaScaleExplicitInput = DecisionInput & {
    model: 'color-oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabChromaInput[];
        quantize?: number;
    };
};

export type ColorOklabChromaScaleBoundedInput = DecisionInput & {
    model: 'color-oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabChromaInput;
        to: ColorOklabChromaInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = DecisionInput & {
    model: 'color-oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabChromaInput;
    } & AnchoredNumberSeriesParams;
};
