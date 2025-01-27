import type { AnchoredNumberSeriesParams, ColorOklabAxisLiteral } from '../../../primitives';
import type { InputRecord } from '../../base';

export type ColorOklabChromaValueExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-value/explicit';
    params: {
        value: ColorOklabAxisLiteral;
    };
};

export type ColorOklabChromaScaleExplicitInput = InputRecord & {
    model: 'color-oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabAxisLiteral[];
    };
};

export type ColorOklabChromaScaleBoundedInput = InputRecord & {
    model: 'color-oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabAxisLiteral;
        to: ColorOklabAxisLiteral;
        steps: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = InputRecord & {
    model: 'color-oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabAxisLiteral;
    } & AnchoredNumberSeriesParams;
};
