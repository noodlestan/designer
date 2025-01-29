import type { AnchoredNumberSeriesParams, SpaceInputValue } from '../../primitives';
import type { InputRecord } from '../base';

export type SpaceValueExplicitInput = InputRecord & {
    model: 'space-value/explicit';
    params: {
        value: SpaceInputValue;
    };
};

export type SpaceScaleExplicitInput = InputRecord & {
    model: 'space-scale/explicit';
    params: {
        values: SpaceInputValue[];
    };
};

export type SpaceScaleBoundedInput = InputRecord & {
    model: 'space-scale/bounded';
    params: {
        from: SpaceInputValue;
        to: SpaceInputValue;
        steps: number;
    };
};

export type SpaceScaleAnchoredInput = InputRecord & {
    model: 'space-scale/anchored';
    params: {
        anchor: SpaceInputValue;
    } & AnchoredNumberSeriesParams;
};
