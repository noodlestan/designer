import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBHueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ColorComplementaryChannels } from '../../../../primitives';
import {
    type ColorChannelBaseOptions,
    type ColorChannelBaseValue,
    createColorChannelBaseValue,
} from '../../../base';

import { createSRGBHueValue } from './createSRGBHueValue';
import { CHANNEL_DEFINITION } from './private';

vi.mock('../../../base');

const createColorChannelBaseValueMocked = vi.mocked(createColorChannelBaseValue);

describe('createSRGBHueValue()', () => {
    const mockInput: ColorSRGBHueInput = 0.2773;
    const [mockValueContext] = createValueContextMock(mockInput);
    const mockOptions: ColorChannelBaseOptions = {};

    const mockChannelBaseValue = {} as ColorChannelBaseValue<ColorComplementaryChannels>;

    beforeEach(() => {
        vi.clearAllMocks();
        createColorChannelBaseValueMocked.mockReturnValue(mockChannelBaseValue);
    });

    describe('Given a value', () => {
        it('should call createColorChannelBaseValue()', () => {
            createSRGBHueValue(mockValueContext);

            expect(createColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
                mockOptions,
            );
        });

        it('should return the resolved value', () => {
            const result = createSRGBHueValue(mockValueContext);
            expect(result).toBe(mockChannelBaseValue);
        });
    });
});
