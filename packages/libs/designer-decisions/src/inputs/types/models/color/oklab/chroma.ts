import type { AnchoredNumberSeriesParams, ColorOklabChromaInput } from '../../../primitives';
import type { InputRecord } from '../../../primitives/record';

export type ColorOklabChromaValueExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-value/explicit';
    params: {
        value: ColorOklabChromaInput;
        quantize?: number;
    };
};

export type ColorOklabChromaScaleExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabChromaInput[];
        quantize?: number;
    };
};

export type ColorOklabChromaScaleBoundedInput = InputRecord & {
    model: 'color-oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabChromaInput;
        to: ColorOklabChromaInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabChromaInput;
    } & AnchoredNumberSeriesParams;
};
