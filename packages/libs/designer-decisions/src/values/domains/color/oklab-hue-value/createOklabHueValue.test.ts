import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabLightnessInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import {
    type ColorChannelBaseOptions,
    type ColorChannelBaseValue,
    createColorChannelBaseValue,
} from '../../../base';
import { ColorComplementaryChannels } from '../../../primitives';

import { createOklabHueValue } from './createOklabHueValue';
import { CHANNEL_DEFINITION } from './private';

vi.mock('../../../base', () => ({
    createColorChannelBaseValue: vi.fn(),
}));

const createColorChannelBaseValueMocked = vi.mocked(createColorChannelBaseValue);

describe('createOklabHueValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorOklabLightnessInput = 277.3;
    const mockValue = {} as ColorChannelBaseValue<ColorComplementaryChannels>;
    const mockOptions: ColorChannelBaseOptions = {};

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        createColorChannelBaseValueMocked.mockReturnValue(mockValue);
    });

    describe('Given a value', () => {
        it('should call createColorChannelBaseValue()', () => {
            createOklabHueValue(mockContext, mockInput);

            expect(createColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockContext,
                mockInput,
                mockOptions,
            );
        });

        it('should return the resolved value', () => {
            const result = createOklabHueValue(mockContext, mockInput);

            expect(result).toBe(mockValue);
        });
    });
});
