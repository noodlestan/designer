import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBSaturationInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';
import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

vi.mock('../../../base', () => ({
    resolveColorChannelBaseValue: vi.fn(),
}));

const resolveColorChannelBaseValueMocked = vi.mocked(resolveColorChannelBaseValue);

describe('resolveSRGBSaturationValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorSRGBSaturationInput = 0.2773;

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        resolveColorChannelBaseValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelBaseValue()', () => {
            resolveSRGBSaturationValue(mockContext, mockInput);

            expect(resolveColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveSRGBSaturationValue(mockContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
