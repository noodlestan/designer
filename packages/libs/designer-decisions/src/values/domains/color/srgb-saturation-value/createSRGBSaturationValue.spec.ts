import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorSRGBSaturationInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ColorComplementaryChannels } from '../../../../primitives';
import {
    type ColorChannelBaseOptions,
    type ColorChannelBaseValue,
    createColorChannelBaseValue,
} from '../../../base';

import { createSRGBSaturationValue } from './createSRGBSaturationValue';
import { CHANNEL_DEFINITION } from './private';

vi.mock('../../../base');

const createColorChannelBaseValueMocked = vi.mocked(createColorChannelBaseValue);

describe('createSRGBSaturationValue()', () => {
    const mockInput: ColorSRGBSaturationInput = 0.2773;
    const [mockValueContext] = createValueContextMock(mockInput);
    const mockOptions: ColorChannelBaseOptions = {};

    const mockChannelBaseValue = {} as ColorChannelBaseValue<ColorComplementaryChannels>;

    beforeEach(() => {
        vi.clearAllMocks();
        createColorChannelBaseValueMocked.mockReturnValue(mockChannelBaseValue);
    });

    describe('Given a value', () => {
        it('should call createColorChannelBaseValue()', () => {
            createSRGBSaturationValue(mockValueContext);

            expect(createColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
                mockOptions,
            );
        });

        it('should return the resolved value', () => {
            const result = createSRGBSaturationValue(mockValueContext);
            expect(result).toBe(mockChannelBaseValue);
        });
    });
});
