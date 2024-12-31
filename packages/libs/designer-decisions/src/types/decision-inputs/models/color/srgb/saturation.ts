import type { AnchoredNumberSeriesParams, NormalNumber } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorSRGBSaturationValueExplicitInput = DecisionInputBase & {
    model: 'color-srgb-saturation-value/explicit';
    params: {
        value: NormalNumber;
    };
};

export type ColorSRGBSaturationScaleExplicitInput = DecisionInputBase & {
    model: 'color-srgb-saturation-scale/explicit';
    params: {
        values: NormalNumber[];
    };
};

export type ColorSRGBSaturationScaleBoundedInput = DecisionInputBase & {
    model: 'color-srgb-saturation-scale/bounded';
    params: {
        from: NormalNumber;
        to: NormalNumber;
        steps: number;
    };
};

export type ColorSRGBSaturationScaleAnchoredInput = DecisionInputBase & {
    model: 'color-srgb-saturation-scale/anchored';
    params: {
        anchor: NormalNumber;
    } & AnchoredNumberSeriesParams;
};
