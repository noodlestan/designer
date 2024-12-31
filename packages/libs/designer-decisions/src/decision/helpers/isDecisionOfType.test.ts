import { describe, expect, it } from 'vitest';

import type { DecisionUnknown } from '../../types';

import { isDecisionOfType } from './isDecisionOfType';

const mockDecision = (model: string) =>
    ({
        input: () => ({ model }),
    }) as DecisionUnknown;

describe('isDecisionOfType', () => {
    it('returns true for matching type', () => {
        const decision = mockDecision('color-srgb-lightness-decision/static-value');
        expect(isDecisionOfType(decision, 'color-srgb-lightness-decision')).toBe(true);
    });

    it('returns false for non-matching type', () => {
        const decision = mockDecision('space-padding-decision/static-value');
        expect(isDecisionOfType(decision, 'color-srgb-lightness-decision')).toBe(false);
    });
});
