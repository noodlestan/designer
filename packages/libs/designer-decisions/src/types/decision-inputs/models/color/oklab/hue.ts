import type { AnchoredNumberSeriesParams, ColorOklabHueInput } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabHueValueExplicitInput = InputRecord & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: ColorOklabHueInput;
    };
};

export type ColorOklabHueSetExplicitInput = InputRecord & {
    model: 'color-oklab-hue-set/explicit';
    params: {
        values: ColorOklabHueInput[];
    };
};

export type ColorOklabHueSetBoundedInput = InputRecord & {
    model: 'color-oklab-hue-set/bounded';
    params: {
        from: ColorOklabHueInput;
        to: ColorOklabHueInput;
        steps: number;
    };
};

export type ColorOklabHueSetAnchoredInput = InputRecord & {
    model: 'color-oklab-hue-set/anchored';
    params: {
        anchor: ColorOklabHueInput;
    } & AnchoredNumberSeriesParams;
};
