import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBHueInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';

vi.mock('../_private', () => ({
    resolveColorChannelValue: vi.fn(),
}));

const resolveColorChannelValueMocked = vi.mocked(resolveColorChannelValue);

describe('resolveSRGBHueValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorSRGBHueInput = 0.2773;

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        resolveColorChannelValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelValue()', () => {
            resolveSRGBHueValue(mockContext, mockInput);

            expect(resolveColorChannelValueMocked).toHaveBeenCalledWith(
                CHANNEL_ATTRIBUTES,
                mockContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveSRGBHueValue(mockContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
