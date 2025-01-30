import type { AnchoredNumberSeriesParams, ColorSRGBHueInput } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBHueValueExplicitInput = InputRecord & {
    model: 'color-srgb-hue-value/explicit';
    params: {
        value: ColorSRGBHueInput;
    };
};

export type ColorSRGBHueSetExplicitInput = InputRecord & {
    model: 'color-srgb-hue-set/explicit';
    params: {
        values: ColorSRGBHueInput[];
    };
};

export type ColorSRGBHueSetBoundedInput = InputRecord & {
    model: 'color-srgb-hue-set/bounded';
    params: {
        from: ColorSRGBHueInput;
        to: ColorSRGBHueInput;
        steps: number;
    };
};

export type ColorSRGBHueSetAnchoredInput = InputRecord & {
    model: 'color-srgb-hue-set/anchored';
    params: {
        anchor: ColorSRGBHueInput;
    } & AnchoredNumberSeriesParams;
};
