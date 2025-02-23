import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOklabChromaInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import {
    ColorChannelBaseOptions,
    ColorChannelBaseValue,
    createColorChannelBaseValue,
} from '../../../base';
import type { ColorComplementaryChannels } from '../../../primitives';

import { createOklabChromaValue } from './createOklabChromaValue';
import { CHANNEL_DEFINITION } from './private';

vi.mock('../../../base', () => ({
    createColorChannelBaseValue: vi.fn(),
}));

const createColorChannelBaseValueMocked = vi.mocked(createColorChannelBaseValue);

describe('createOklabChromaValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorOklabChromaInput = 0.2773;
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
            createOklabChromaValue(mockContext, mockInput);

            expect(createColorChannelBaseValueMocked).toHaveBeenCalledWith(
                CHANNEL_DEFINITION,
                mockContext,
                mockInput,
                mockOptions,
            );
        });

        it('should return the resolved value', () => {
            const result = createOklabChromaValue(mockContext, mockInput);

            expect(result).toBe(mockValue);
        });
    });
});
