import type { AnchoredNumberSeriesParams, ColorSRGBSaturation } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBSaturationValueExplicitInput = InputRecord & {
    model: 'color-srgb-saturation-value/explicit';
    params: {
        value: ColorSRGBSaturation;
    };
};

export type ColorSRGBSaturationScaleExplicitInput = InputRecord & {
    model: 'color-srgb-saturation-scale/explicit';
    params: {
        values: ColorSRGBSaturation[];
    };
};

export type ColorSRGBSaturationScaleBoundedInput = InputRecord & {
    model: 'color-srgb-saturation-scale/bounded';
    params: {
        from: ColorSRGBSaturation;
        to: ColorSRGBSaturation;
        steps: number;
    };
};

export type ColorSRGBSaturationScaleAnchoredInput = InputRecord & {
    model: 'color-srgb-saturation-scale/anchored';
    params: {
        anchor: ColorSRGBSaturation;
    } & AnchoredNumberSeriesParams;
};
