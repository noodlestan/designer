import type { AnchoredNumberSeriesParams, NormalNumber } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBSaturationValueExplicitInput = InputRecord & {
    model: 'color-srgb-saturation-value/explicit';
    params: {
        value: NormalNumber;
    };
};

export type ColorSRGBSaturationScaleExplicitInput = InputRecord & {
    model: 'color-srgb-saturation-scale/explicit';
    params: {
        values: NormalNumber[];
    };
};

export type ColorSRGBSaturationScaleBoundedInput = InputRecord & {
    model: 'color-srgb-saturation-scale/bounded';
    params: {
        from: NormalNumber;
        to: NormalNumber;
        steps: number;
    };
};

export type ColorSRGBSaturationScaleAnchoredInput = InputRecord & {
    model: 'color-srgb-saturation-scale/anchored';
    params: {
        anchor: NormalNumber;
    } & AnchoredNumberSeriesParams;
};
