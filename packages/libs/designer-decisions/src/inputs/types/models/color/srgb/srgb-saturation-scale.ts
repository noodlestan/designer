import type {
    AnchoredNumberSeriesParams,
    ColorSRGBSaturationInput,
    DecisionInput,
} from '../../../primitives';

export type ColorSRGBSaturationScaleExplicitInput = DecisionInput & {
    model: 'srgb-saturation-scale/explicit';
    params: {
        values: ColorSRGBSaturationInput[];
        quantize?: number;
    };
};

export type ColorSRGBSaturationScaleBoundedInput = DecisionInput & {
    model: 'srgb-saturation-scale/bounded';
    params: {
        from: ColorSRGBSaturationInput;
        to: ColorSRGBSaturationInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSRGBSaturationScaleAnchoredInput = DecisionInput & {
    model: 'srgb-saturation-scale/anchored';
    params: {
        anchor: ColorSRGBSaturationInput;
    } & AnchoredNumberSeriesParams;
};
