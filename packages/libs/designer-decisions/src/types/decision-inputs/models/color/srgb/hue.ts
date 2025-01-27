import type { AnchoredNumberSeriesParams, Degrees } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorSRGBHueValueExplicitInput = InputRecord & {
    model: 'color-srgb-hue-value/explicit';
    params: {
        value: Degrees;
    };
};

export type ColorSRGBHueSetExplicitInput = InputRecord & {
    model: 'color-srgb-hue-set/explicit';
    params: {
        values: Degrees[];
    };
};

export type ColorSRGBHueSetBoundedInput = InputRecord & {
    model: 'color-srgb-hue-set/bounded';
    params: {
        from: Degrees;
        to: Degrees;
        steps: number;
    };
};

export type ColorSRGBHueSetAnchoredInput = InputRecord & {
    model: 'color-srgb-hue-set/anchored';
    params: {
        anchor: Degrees;
    } & AnchoredNumberSeriesParams;
};
