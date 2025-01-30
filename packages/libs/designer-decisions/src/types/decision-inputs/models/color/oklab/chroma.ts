import type { AnchoredNumberSeriesParams, ColorOklabChroma } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabChromaValueExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-value/explicit';
    params: {
        value: ColorOklabChroma;
    };
};

export type ColorOklabChromaScaleExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabChroma[];
    };
};

export type ColorOklabChromaScaleBoundedInput = InputRecord & {
    model: 'color-oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabChroma;
        to: ColorOklabChroma;
        steps: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabChroma;
    } & AnchoredNumberSeriesParams;
};
