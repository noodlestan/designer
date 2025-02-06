import type { AnchoredNumberSeriesParams, SpaceValueInput } from '../../primitives';
import type { InputRecord } from '../base';

export type SpaceValueExplicitInput = InputRecord & {
    model: 'space-value/explicit';
    params: {
        value: SpaceValueInput;
    };
};

export type SpaceScaleExplicitInput = InputRecord & {
    model: 'space-scale/explicit';
    params: {
        values: SpaceValueInput[];
    };
};

export type SpaceScaleBoundedInput = InputRecord & {
    model: 'space-scale/bounded';
    params: {
        from: SpaceValueInput;
        to: SpaceValueInput;
        steps: number;
        precision?: number;
    };
};

export type SpaceScaleAnchoredInput = InputRecord & {
    model: 'space-scale/anchored';
    params: {
        anchor: SpaceValueInput;
    } & AnchoredNumberSeriesParams;
};
