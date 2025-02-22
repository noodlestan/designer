import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabChromaInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';
import { resolveOklabChromaValue } from './resolveOklabChromaValue';

vi.mock('../_private', () => ({
    resolveColorChannelValue: vi.fn(),
}));

const resolveColorChannelValueMocked = vi.mocked(resolveColorChannelValue);

describe('resolveOklabChromaValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorOklabChromaInput = 0.2773;

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        resolveColorChannelValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelValue()', () => {
            resolveOklabChromaValue(mockContext, mockInput);

            expect(resolveColorChannelValueMocked).toHaveBeenCalledWith(
                CHANNEL_ATTRIBUTES,
                mockContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveOklabChromaValue(mockContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
