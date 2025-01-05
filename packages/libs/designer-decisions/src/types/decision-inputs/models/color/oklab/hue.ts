import type { AnchoredNumberSeriesParams, Degrees } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorOklabHueValueExplicitInput = DecisionInputBase & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: Degrees;
    };
};

export type ColorOklabHueSetExplicitInput = DecisionInputBase & {
    model: 'color-oklab-hue-set/explicit';
    params: {
        values: Degrees[];
    };
};

export type ColorOklabHueSetBoundedInput = DecisionInputBase & {
    model: 'color-oklab-hue-set/bounded';
    params: {
        from: Degrees;
        to: Degrees;
        steps: number;
    };
};

export type ColorOklabHueSetAnchoredInput = DecisionInputBase & {
    model: 'color-oklab-hue-set/anchored';
    params: {
        anchor: Degrees;
    } & AnchoredNumberSeriesParams;
};
