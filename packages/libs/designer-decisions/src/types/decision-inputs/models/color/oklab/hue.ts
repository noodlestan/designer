import type { AnchoredNumberSeriesParams, ColorOklabHue } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabHueValueExplicitInput = InputRecord & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: ColorOklabHue;
    };
};

export type ColorOklabHueSetExplicitInput = InputRecord & {
    model: 'color-oklab-hue-set/explicit';
    params: {
        values: ColorOklabHue[];
    };
};

export type ColorOklabHueSetBoundedInput = InputRecord & {
    model: 'color-oklab-hue-set/bounded';
    params: {
        from: ColorOklabHue;
        to: ColorOklabHue;
        steps: number;
    };
};

export type ColorOklabHueSetAnchoredInput = InputRecord & {
    model: 'color-oklab-hue-set/anchored';
    params: {
        anchor: ColorOklabHue;
    } & AnchoredNumberSeriesParams;
};
