import type { AnchoredNumberSeriesParams, ColorSRGBHue } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBHueValueExplicitInput = InputRecord & {
    model: 'color-srgb-hue-value/explicit';
    params: {
        value: ColorSRGBHue;
    };
};

export type ColorSRGBHueSetExplicitInput = InputRecord & {
    model: 'color-srgb-hue-set/explicit';
    params: {
        values: ColorSRGBHue[];
    };
};

export type ColorSRGBHueSetBoundedInput = InputRecord & {
    model: 'color-srgb-hue-set/bounded';
    params: {
        from: ColorSRGBHue;
        to: ColorSRGBHue;
        steps: number;
    };
};

export type ColorSRGBHueSetAnchoredInput = InputRecord & {
    model: 'color-srgb-hue-set/anchored';
    params: {
        anchor: ColorSRGBHue;
    } & AnchoredNumberSeriesParams;
};
