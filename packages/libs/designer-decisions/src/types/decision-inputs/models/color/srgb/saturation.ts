import type { AnchoredNumberSeriesParams, ColorSRGBSaturationInput } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBSaturationValueExplicitInput = InputRecord & {
    model: 'color-srgb-saturation-value/explicit';
    params: {
        value: ColorSRGBSaturationInput;
        quantize?: number;
    };
};

export type ColorSRGBSaturationScaleExplicitInput = InputRecord & {
    model: 'color-srgb-saturation-scale/explicit';
    params: {
        values: ColorSRGBSaturationInput[];
        quantize?: number;
    };
};

export type ColorSRGBSaturationScaleBoundedInput = InputRecord & {
    model: 'color-srgb-saturation-scale/bounded';
    params: {
        from: ColorSRGBSaturationInput;
        to: ColorSRGBSaturationInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSRGBSaturationScaleAnchoredInput = InputRecord & {
    model: 'color-srgb-saturation-scale/anchored';
    params: {
        anchor: ColorSRGBSaturationInput;
    } & AnchoredNumberSeriesParams;
};
