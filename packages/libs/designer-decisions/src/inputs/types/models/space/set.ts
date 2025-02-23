import type { AnchoredNumberSeriesParams, DecisionInput, SizeValueInput } from '../../primitives';

export type SizeScaleExplicitInput = DecisionInput & {
    model: 'size-scale/explicit';
    params: {
        values: SizeValueInput[];
        quantize?: number;
    };
};

export type SizeScaleBoundedInput = DecisionInput & {
    model: 'size-scale/bounded';
    params: {
        from: SizeValueInput;
        to: SizeValueInput;
        steps: number;
        quantize?: number;
    };
};

export type SizeScaleAnchoredInput = DecisionInput & {
    model: 'size-scale/anchored';
    params: {
        anchor: SizeValueInput;
    } & AnchoredNumberSeriesParams;
};
