import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBLightnessInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';
import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

vi.mock('../../../base', () => ({
    resolveColorChannelBaseValue: vi.fn(),
}));

const resolveColorChannelBaseValueMocked = vi.mocked(resolveColorChannelBaseValue);

describe('resolveSRGBLightnessValue()', () => {
    const mockInput: ColorSRGBLightnessInput = 0.2773;

    let mockValueContext: ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
        [mockValueContext] = createValueContextMock();
        resolveColorChannelBaseValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelBaseValue()', () => {
            resolveSRGBLightnessValue(mockValueContext, mockInput);

            expect(resolveColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveSRGBLightnessValue(mockValueContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
