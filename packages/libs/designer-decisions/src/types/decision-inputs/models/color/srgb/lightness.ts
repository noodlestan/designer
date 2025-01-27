import type { AnchoredNumberSeriesParams, NormalNumber } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBLightnessValueExplicitInput = InputRecord & {
    model: 'color-srgb-lightness-value/explicit';
    params: {
        value: NormalNumber;
    };
};

export type ColorSRGBLightnessScaleExplicitInput = InputRecord & {
    model: 'color-srgb-lightness-scale/explicit';
    params: {
        values: NormalNumber[];
    };
};

export type ColorSRGBLightnessScaleBoundedInput = InputRecord & {
    model: 'color-srgb-lightness-scale/bounded';
    params: {
        from: NormalNumber;
        to: NormalNumber;
        steps: number;
    };
};

export type ColorSRGBLightnessScaleAnchoredInput = InputRecord & {
    model: 'color-srgb-lightness-scale/anchored';
    params: {
        anchor: NormalNumber;
    } & AnchoredNumberSeriesParams;
};
