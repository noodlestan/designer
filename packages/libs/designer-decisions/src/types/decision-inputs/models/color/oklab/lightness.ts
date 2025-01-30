import type { AnchoredNumberSeriesParams, ColorOklabLightness } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabLightnessValueExplicitInput = InputRecord & {
    model: 'color-oklab-lightness-value/explicit';
    params: {
        value: ColorOklabLightness;
    };
};

export type ColorOklabLightnessScaleExplicitInput = InputRecord & {
    model: 'color-oklab-lightness-scale/explicit';
    params: {
        values: ColorOklabLightness[];
    };
};

export type ColorOklabLightnessScaleBoundedInput = InputRecord & {
    model: 'color-oklab-lightness-scale/bounded';
    params: {
        from: ColorOklabLightness;
        to: ColorOklabLightness;
        steps: number;
    };
};

export type ColorOklabLightnessScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-lightness-scale/anchored';
    params: {
        anchor: ColorOklabLightness;
    } & AnchoredNumberSeriesParams;
};
