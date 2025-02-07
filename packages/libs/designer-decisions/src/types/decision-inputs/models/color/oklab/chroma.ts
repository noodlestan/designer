import type { AnchoredNumberSeriesParams, ColorOklabChromaInput } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabChromaValueExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-value/explicit';
    params: {
        value: ColorOklabChromaInput;
        precision?: number;
    };
};

export type ColorOklabChromaScaleExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabChromaInput[];
        precision?: number;
    };
};

export type ColorOklabChromaScaleBoundedInput = InputRecord & {
    model: 'color-oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabChromaInput;
        to: ColorOklabChromaInput;
        steps: number;
        precision?: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabChromaInput;
    } & AnchoredNumberSeriesParams;
};
