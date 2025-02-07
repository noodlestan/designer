import type { AnchoredNumberSeriesParams, ColorOklabLightnessInput } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabLightnessValueExplicitInput = InputRecord & {
    model: 'color-oklab-lightness-value/explicit';
    params: {
        value: ColorOklabLightnessInput;
        precision?: number;
    };
};

export type ColorOklabLightnessScaleExplicitInput = InputRecord & {
    model: 'color-oklab-lightness-scale/explicit';
    params: {
        values: ColorOklabLightnessInput[];
        precision?: number;
    };
};

export type ColorOklabLightnessScaleBoundedInput = InputRecord & {
    model: 'color-oklab-lightness-scale/bounded';
    params: {
        from: ColorOklabLightnessInput;
        to: ColorOklabLightnessInput;
        steps: number;
        precision?: number;
    };
};

export type ColorOklabLightnessScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-lightness-scale/anchored';
    params: {
        anchor: ColorOklabLightnessInput;
    } & AnchoredNumberSeriesParams;
};
