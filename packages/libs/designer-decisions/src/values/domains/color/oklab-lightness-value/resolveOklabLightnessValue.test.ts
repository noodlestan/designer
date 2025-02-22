import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabLightnessInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';
import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

vi.mock('../_private', () => ({
    resolveColorChannelValue: vi.fn(),
}));

const resolveColorChannelValueMocked = vi.mocked(resolveColorChannelValue);

describe('resolveOklabLightnessValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorOklabLightnessInput = 0.2773;

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        resolveColorChannelValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelValue()', () => {
            resolveOklabLightnessValue(mockContext, mockInput);

            expect(resolveColorChannelValueMocked).toHaveBeenCalledWith(
                CHANNEL_ATTRIBUTES,
                mockContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveOklabLightnessValue(mockContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
