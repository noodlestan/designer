import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBHueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ColorChannelLiteral } from '../../../../primitives';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';

vi.mock('../../../base', () => ({
    resolveColorChannelBaseValue: vi.fn(),
}));

const resolveColorChannelBaseValueMocked = vi.mocked(resolveColorChannelBaseValue);

describe('resolveSRGBHueValue()', () => {
    const mockInput: ColorSRGBHueInput = 0.2773;
    const [mockValueContext] = createValueContextMock(mockInput);

    const resolvedValue = { value: 0.112 } as ColorChannelLiteral;

    beforeEach(() => {
        vi.clearAllMocks();
        resolveColorChannelBaseValueMocked.mockReturnValue(resolvedValue);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelBaseValue()', () => {
            resolveSRGBHueValue(mockValueContext);

            expect(resolveColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveSRGBHueValue(mockValueContext);
            expect(result).toBe(resolvedValue);
        });
    });
});
