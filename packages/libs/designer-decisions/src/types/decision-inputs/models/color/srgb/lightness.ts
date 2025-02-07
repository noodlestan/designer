import type { AnchoredNumberSeriesParams, ColorSRGBLightnessInput } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBLightnessValueExplicitInput = InputRecord & {
    model: 'color-srgb-lightness-value/explicit';
    params: {
        value: ColorSRGBLightnessInput;
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleExplicitInput = InputRecord & {
    model: 'color-srgb-lightness-scale/explicit';
    params: {
        values: ColorSRGBLightnessInput[];
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleBoundedInput = InputRecord & {
    model: 'color-srgb-lightness-scale/bounded';
    params: {
        from: ColorSRGBLightnessInput;
        to: ColorSRGBLightnessInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSRGBLightnessScaleAnchoredInput = InputRecord & {
    model: 'color-srgb-lightness-scale/anchored';
    params: {
        anchor: ColorSRGBLightnessInput;
    } & AnchoredNumberSeriesParams;
};
