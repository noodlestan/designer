import type { AnchoredNumberSeriesParams, Degrees } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorOklabHueValueExplicitInput = DecisionInputBase & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: Degrees;
    };
};

export type ColorOklabHueScaleExplicitInput = DecisionInputBase & {
    model: 'color-oklab-hue-scale/explicit';
    params: {
        values: Degrees[];
    };
};

export type ColorOklabHueScaleBoundedInput = DecisionInputBase & {
    model: 'color-oklab-hue-scale/bounded';
    params: {
        from: Degrees;
        to: Degrees;
        steps: number;
    };
};

export type ColorOklabHueScaleAnchoredInput = DecisionInputBase & {
    model: 'color-oklab-hue-scale/anchored';
    params: {
        anchor: Degrees;
    } & AnchoredNumberSeriesParams;
};
