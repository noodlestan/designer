import type { AnchoredNumberSeriesParams, DecisionInput, SpaceValueInput } from '../../primitives';

export type SpaceScaleExplicitInput = DecisionInput & {
    model: 'space-scale/explicit';
    params: {
        values: SpaceValueInput[];
        quantize?: number;
    };
};

export type SpaceScaleBoundedInput = DecisionInput & {
    model: 'space-scale/bounded';
    params: {
        from: SpaceValueInput;
        to: SpaceValueInput;
        steps: number;
        quantize?: number;
    };
};

export type SpaceScaleAnchoredInput = DecisionInput & {
    model: 'space-scale/anchored';
    params: {
        anchor: SpaceValueInput;
    } & AnchoredNumberSeriesParams;
};
