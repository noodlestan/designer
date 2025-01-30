import type { AnchoredNumberSeriesParams, ColorOklabChromaInput } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabChromaValueExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-value/explicit';
    params: {
        value: ColorOklabChromaInput;
    };
};

export type ColorOklabChromaScaleExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabChromaInput[];
    };
};

export type ColorOklabChromaScaleBoundedInput = InputRecord & {
    model: 'color-oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabChromaInput;
        to: ColorOklabChromaInput;
        steps: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabChromaInput;
    } & AnchoredNumberSeriesParams;
};
