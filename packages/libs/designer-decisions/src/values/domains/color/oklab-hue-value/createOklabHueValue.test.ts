import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabLightnessInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import {
    ColorChannelBaseValue,
    ColorChannelValueOptions,
    ColorComplementaryChannels,
} from '../../../primitives';
import { createColorChannelValue } from '../_private';

import { createOklabHueValue } from './createOklabHueValue';
import { CHANNEL_ATTRIBUTES } from './private';

vi.mock('../_private', () => ({
    createColorChannelValue: vi.fn(),
}));

const createColorChannelValueMocked = vi.mocked(createColorChannelValue);

describe('createOklabHueValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorOklabLightnessInput = 277.3;
    const mockValue = {} as ColorChannelBaseValue<ColorComplementaryChannels>;
    const mockOptions: ColorChannelValueOptions = {};

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        createColorChannelValueMocked.mockReturnValue(mockValue);
    });

    describe('Given a value', () => {
        it('should call createColorChannelValue()', () => {
            createOklabHueValue(mockContext, mockInput);

            expect(createColorChannelValueMocked).toHaveBeenCalledWith(
                CHANNEL_ATTRIBUTES,
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
