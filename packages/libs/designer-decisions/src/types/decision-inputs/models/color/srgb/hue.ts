import type { AnchoredNumberSeriesParams, Degrees } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorSRGBHueValueExplicitInput = DecisionInputBase & {
    model: 'color-srgb-hue-value/explicit';
    params: {
        value: Degrees;
    };
};

export type ColorSRGBHueSetExplicitInput = DecisionInputBase & {
    model: 'color-srgb-hue-set/explicit';
    params: {
        values: Degrees[];
    };
};

export type ColorSRGBHueSetBoundedInput = DecisionInputBase & {
    model: 'color-srgb-hue-set/bounded';
    params: {
        from: Degrees;
        to: Degrees;
        steps: number;
    };
};

export type ColorSRGBHueSetAnchoredInput = DecisionInputBase & {
    model: 'color-srgb-hue-set/anchored';
    params: {
        anchor: Degrees;
    } & AnchoredNumberSeriesParams;
};
