import type { AnchoredNumberSeriesParams, SpaceInputValue } from '../../primitives';
import type { DecisionInputBase } from '../base';

export type SpaceValueExplicitInput = DecisionInputBase & {
    model: 'space-value/explicit';
    params: {
        value: SpaceInputValue;
    };
};

export type SpaceScaleExplicitInput = DecisionInputBase & {
    model: 'space-scale/explicit';
    params: {
        values: SpaceInputValue[];
    };
};

export type SpaceScaleLinearBounded = DecisionInputBase & {
    model: 'space-scale/bounded';
    params: {
        from: SpaceInputValue;
        to: SpaceInputValue;
        steps: number;
    };
};

export type SpaceScaleAnchoredInput = DecisionInputBase & {
    model: 'space-scale/anchored';
    params: {
        anchor: SpaceInputValue;
    } & AnchoredNumberSeriesParams;
};
