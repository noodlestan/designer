import type { AnchoredNumberSeriesParams, Degrees } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorSRGBHueValueExplicitInput = DecisionInputBase & {
    model: 'color-srgb-hue-value/explicit';
    params: {
        value: Degrees;
    };
};

export type ColorSRGBHueScaleExplicitInput = DecisionInputBase & {
    model: 'color-srgb-hue-scale/explicit';
    params: {
        values: Degrees[];
    };
};

export type ColorSRGBHueScaleBoundedInput = DecisionInputBase & {
    model: 'color-srgb-hue-scale/bounded';
    params: {
        from: Degrees;
        to: Degrees;
        steps: number;
    };
};

export type ColorSRGBHueScaleAnchoredInput = DecisionInputBase & {
    model: 'color-srgb-hue-scale/anchored';
    params: {
        anchor: Degrees;
    } & AnchoredNumberSeriesParams;
};
