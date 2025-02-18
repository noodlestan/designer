import type { AnchoredNumberSeriesParams, SpaceValueInput } from '../../primitives';
import type { InputRecord } from '../../primitives/record';

export type SpaceScaleExplicitInput = InputRecord & {
    model: 'space-scale/explicit';
    params: {
        values: SpaceValueInput[];
        quantize?: number;
    };
};

export type SpaceScaleBoundedInput = InputRecord & {
    model: 'space-scale/bounded';
    params: {
        from: SpaceValueInput;
        to: SpaceValueInput;
        steps: number;
        quantize?: number;
    };
};

export type SpaceScaleAnchoredInput = InputRecord & {
    model: 'space-scale/anchored';
    params: {
        anchor: SpaceValueInput;
    } & AnchoredNumberSeriesParams;
};
