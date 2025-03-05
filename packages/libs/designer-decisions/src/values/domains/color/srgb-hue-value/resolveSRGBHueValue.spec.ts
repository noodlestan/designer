import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBHueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';

vi.mock('../../../base', () => ({
    resolveColorChannelBaseValue: vi.fn(),
}));

const resolveColorChannelBaseValueMocked = vi.mocked(resolveColorChannelBaseValue);

describe('resolveSRGBHueValue()', () => {
    const mockInput: ColorSRGBHueInput = 0.2773;

    let mockValueContext: ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
        [mockValueContext] = createValueContextMock();
        resolveColorChannelBaseValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveColorChannelBaseValue()', () => {
            resolveSRGBHueValue(mockValueContext, mockInput);

            expect(resolveColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveSRGBHueValue(mockValueContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
