import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBLightnessInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';
import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

vi.mock('../_private', () => ({
    resolveColorChannelValue: vi.fn(),
}));

const resolveColorChannelValueMocked = vi.mocked(resolveColorChannelValue);

describe('resolveSRGBLightnessValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorSRGBLightnessInput = 0.2773;

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        resolveColorChannelValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelValue()', () => {
            resolveSRGBLightnessValue(mockContext, mockInput);

            expect(resolveColorChannelValueMocked).toHaveBeenCalledWith(
                CHANNEL_ATTRIBUTES,
                mockContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveSRGBLightnessValue(mockContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
