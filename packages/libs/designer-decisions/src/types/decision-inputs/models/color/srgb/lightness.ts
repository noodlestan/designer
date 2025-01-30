import type { AnchoredNumberSeriesParams, ColorSRGBLightness } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBLightnessValueExplicitInput = InputRecord & {
    model: 'color-srgb-lightness-value/explicit';
    params: {
        value: ColorSRGBLightness;
    };
};

export type ColorSRGBLightnessScaleExplicitInput = InputRecord & {
    model: 'color-srgb-lightness-scale/explicit';
    params: {
        values: ColorSRGBLightness[];
    };
};

export type ColorSRGBLightnessScaleBoundedInput = InputRecord & {
    model: 'color-srgb-lightness-scale/bounded';
    params: {
        from: ColorSRGBLightness;
        to: ColorSRGBLightness;
        steps: number;
    };
};

export type ColorSRGBLightnessScaleAnchoredInput = InputRecord & {
    model: 'color-srgb-lightness-scale/anchored';
    params: {
        anchor: ColorSRGBLightness;
    } & AnchoredNumberSeriesParams;
};
