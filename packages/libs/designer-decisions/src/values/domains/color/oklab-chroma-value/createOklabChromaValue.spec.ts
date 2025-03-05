import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabChromaInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ColorComplementaryChannels } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import {
    type ColorChannelBaseOptions,
    type ColorChannelBaseValue,
    createColorChannelBaseValue,
} from '../../../base';

import { createOklabChromaValue } from './createOklabChromaValue';
import { CHANNEL_DEFINITION } from './private';

vi.mock('../../../base');

const createColorChannelBaseValueMocked = vi.mocked(createColorChannelBaseValue);

describe('createOklabChromaValue()', () => {
    const mockInput: ColorOklabChromaInput = 0.2773;
    const mockValue = {} as ColorChannelBaseValue<ColorComplementaryChannels>;
    const mockOptions: ColorChannelBaseOptions = {};

    let mockValueContext: ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
        [mockValueContext] = createValueContextMock();
        createColorChannelBaseValueMocked.mockReturnValue(mockValue);
    });

    describe('Given a value', () => {
        it('should call createColorChannelBaseValue()', () => {
            createOklabChromaValue(mockValueContext, mockInput);

            expect(createColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockValueContext,
                mockInput,
                mockOptions,
            );
        });

        it('should return the resolved value', () => {
            const result = createOklabChromaValue(mockValueContext, mockInput);

            expect(result).toBe(mockValue);
        });
    });
});
