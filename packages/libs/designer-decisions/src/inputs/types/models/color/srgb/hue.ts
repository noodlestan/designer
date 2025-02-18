import type { AnchoredNumberSeriesParams, ColorSRGBHueInput } from '../../../primitives';
import type { DecisionInput } from '../../../primitives/record';

export type ColorSRGBHueValueExplicitInput = DecisionInput & {
    model: 'color-srgb-hue-value/explicit';
    params: {
        value: ColorSRGBHueInput;
        quantize?: number;
    };
};

export type ColorSRGBHueSetExplicitInput = DecisionInput & {
    model: 'color-srgb-hue-set/explicit';
    params: {
        values: ColorSRGBHueInput[];
        quantize?: number;
    };
};

export type ColorSRGBHueSetBoundedInput = DecisionInput & {
    model: 'color-srgb-hue-set/bounded';
    params: {
        from: ColorSRGBHueInput;
        to: ColorSRGBHueInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSRGBHueSetAnchoredInput = DecisionInput & {
    model: 'color-srgb-hue-set/anchored';
    params: {
        anchor: ColorSRGBHueInput;
    } & AnchoredNumberSeriesParams;
};
