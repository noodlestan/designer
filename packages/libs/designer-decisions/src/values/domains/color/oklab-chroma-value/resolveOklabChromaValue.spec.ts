import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabChromaInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ColorChannelLiteral } from '../../../../primitives';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';
import { resolveOklabChromaValue } from './resolveOklabChromaValue';

vi.mock('../../../base', () => ({
    resolveColorChannelBaseValue: vi.fn(),
}));

const resolveColorChannelBaseValueMocked = vi.mocked(resolveColorChannelBaseValue);

describe('resolveOklabChromaValue()', () => {
    const mockInput: ColorOklabChromaInput = 0.2773;
    const [mockValueContext] = createValueContextMock(mockInput);

    const resolvedValue = { value: 0.112 } as ColorChannelLiteral;

    beforeEach(() => {
        vi.clearAllMocks();
        resolveColorChannelBaseValueMocked.mockReturnValue(resolvedValue);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelBaseValue()', () => {
            resolveOklabChromaValue(mockValueContext);

            expect(resolveColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveOklabChromaValue(mockValueContext);
            expect(result).toBe(resolvedValue);
        });
    });
});
