import { describe, expect, it } from 'vitest';

import type { DecisionUnknown } from '../../types';

import { getDecisionType } from './getDecisionType';

const mockDecision = (model: string) =>
    ({
        input: () => ({ model }),
    }) as DecisionUnknown;

describe('getDecisionType', () => {
    it('extracts the type from a valid model path', () => {
        const decision = mockDecision('color-lightness-decision/static-value');
        expect(getDecisionType(decision)).toEqual('color-lightness-decision');
    });

    it('returns the entire model if there are no slashes', () => {
        const decision = mockDecision('simple-decision');
        expect(getDecisionType(decision)).toEqual('simple-decision');
    });

    it('returns an empty string if the model is empty', () => {
        const decision = mockDecision('');
        expect(getDecisionType(decision)).toEqual('');
    });
});
