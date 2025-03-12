import type { AnchoredNumberSeriesParams, DecisionInput, SizeInput } from '../../primitives';

export type SizeScaleExplicitInput = DecisionInput & {
    model: 'size-scale/explicit';
    params: {
        values: SizeInput[];
        quantize?: number;
    };
};

export type SizeScaleBoundedInput = DecisionInput & {
    model: 'size-scale/bounded';
    params: {
        from: SizeInput;
        to: SizeInput;
        steps: number;
        quantize?: number;
    };
};

export type SizeScaleAnchoredInput = DecisionInput & {
    model: 'size-scale/anchored';
    params: {
        anchor: SizeInput;
    } & AnchoredNumberSeriesParams;
};
