import type { AnchoredNumberSeriesParams, Degrees } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabHueValueExplicitInput = InputRecord & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: Degrees;
    };
};

export type ColorOklabHueSetExplicitInput = InputRecord & {
    model: 'color-oklab-hue-set/explicit';
    params: {
        values: Degrees[];
    };
};

export type ColorOklabHueSetBoundedInput = InputRecord & {
    model: 'color-oklab-hue-set/bounded';
    params: {
        from: Degrees;
        to: Degrees;
        steps: number;
    };
};

export type ColorOklabHueSetAnchoredInput = InputRecord & {
    model: 'color-oklab-hue-set/anchored';
    params: {
        anchor: Degrees;
    } & AnchoredNumberSeriesParams;
};
