import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBLightnessInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ColorComplementaryChannels } from '../../../../primitives';
import {
    type ColorChannelBaseOptions,
    type ColorChannelBaseValue,
    createColorChannelBaseValue,
} from '../../../base';

import { createSRGBLightnessValue } from './createSRGBLightnessValue';
import { CHANNEL_DEFINITION } from './private';

vi.mock('../../../base');

const createColorChannelBaseValueMocked = vi.mocked(createColorChannelBaseValue);

describe('createSRGBLightnessValue()', () => {
    const mockInput: ColorSRGBLightnessInput = 0.2773;
    const [mockValueContext] = createValueContextMock(mockInput);
    const mockOptions: ColorChannelBaseOptions = {};

    const mockChannelBaseValue = {} as ColorChannelBaseValue<ColorComplementaryChannels>;

    beforeEach(() => {
        vi.clearAllMocks();
        createColorChannelBaseValueMocked.mockReturnValue(mockChannelBaseValue);
    });

    describe('Given a value', () => {
        it('should call createColorChannelBaseValue()', () => {
            createSRGBLightnessValue(mockValueContext);

            expect(createColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
                mockOptions,
            );
        });

        it('should return the resolved value', () => {
            const result = createSRGBLightnessValue(mockValueContext);
            expect(result).toBe(mockChannelBaseValue);
        });
    });
});
