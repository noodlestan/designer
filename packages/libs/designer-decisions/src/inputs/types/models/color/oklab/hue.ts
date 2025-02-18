import type { AnchoredNumberSeriesParams, ColorOklabHueInput } from '../../../primitives';
import type { InputRecord } from '../../../primitives/record';

export type ColorOklabHueValueExplicitInput = InputRecord & {
    model: 'color-oklab-hue-value/explicit';
    params: {
        value: ColorOklabHueInput;
        quantize?: number;
    };
};

export type ColorOklabHueSetExplicitInput = InputRecord & {
    model: 'color-oklab-hue-set/explicit';
    params: {
        values: ColorOklabHueInput[];
        quantize?: number;
    };
};

export type ColorOklabHueSetBoundedInput = InputRecord & {
    model: 'color-oklab-hue-set/bounded';
    params: {
        from: ColorOklabHueInput;
        to: ColorOklabHueInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabHueSetAnchoredInput = InputRecord & {
    model: 'color-oklab-hue-set/anchored';
    params: {
        anchor: ColorOklabHueInput;
    } & AnchoredNumberSeriesParams;
};
