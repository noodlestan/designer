import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabLightnessInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ColorComplementaryChannels } from '../../../../primitives';
import {
    type ColorChannelBaseOptions,
    type ColorChannelBaseValue,
    createColorChannelBaseValue,
} from '../../../base';

import { createOklabHueValue } from './createOklabHueValue';
import { CHANNEL_DEFINITION } from './private';

vi.mock('../../../base');

const createColorChannelBaseValueMocked = vi.mocked(createColorChannelBaseValue);

describe('createOklabHueValue()', () => {
    const mockInput: ColorOklabLightnessInput = 277.3;
    const [mockValueContext] = createValueContextMock(mockInput);
    const mockOptions: ColorChannelBaseOptions = {};

    const mockChannelBaseValue = {} as ColorChannelBaseValue<ColorComplementaryChannels>;

    beforeEach(() => {
        vi.clearAllMocks();
        createColorChannelBaseValueMocked.mockReturnValue(mockChannelBaseValue);
    });

    describe('Given a value', () => {
        it('should call createColorChannelBaseValue()', () => {
            createOklabHueValue(mockValueContext);

            expect(createColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
                mockOptions,
            );
        });

        it('should return the resolved value', () => {
            const result = createOklabHueValue(mockValueContext);
            expect(result).toBe(mockChannelBaseValue);
        });
    });
});
