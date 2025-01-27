import type { AnchoredNumberSeriesParams, NormalNumber } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabLightnessValueExplicitInput = InputRecord & {
    model: 'color-oklab-lightness-value/explicit';
    params: {
        value: NormalNumber;
    };
};

export type ColorOklabLightnessScaleExplicitInput = InputRecord & {
    model: 'color-oklab-lightness-scale/explicit';
    params: {
        values: NormalNumber[];
    };
};

export type ColorOklabLightnessScaleBoundedInput = InputRecord & {
    model: 'color-oklab-lightness-scale/bounded';
    params: {
        from: NormalNumber;
        to: NormalNumber;
        steps: number;
    };
};

export type ColorOklabLightnessScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-lightness-scale/anchored';
    params: {
        anchor: NormalNumber;
    } & AnchoredNumberSeriesParams;
};
