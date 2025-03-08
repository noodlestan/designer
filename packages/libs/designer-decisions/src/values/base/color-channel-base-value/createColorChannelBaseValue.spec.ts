import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ColorChannelInput } from '../../../inputs';
import {
    createPrimitiveContextMock,
    createValueContextMock,
    mockChannelDefinition,
} from '../../../mocks';
import {
    type ColorChannel,
    type ColorChannelLiteral,
    createColorChannel,
} from '../../../primitives';

import { createColorChannelBaseValue } from './createColorChannelBaseValue';
import { resolveColorChannelBaseValue } from './resolveColorChannelBaseValue';
import type { ColorChannelBaseOptions } from './types';

vi.mock('./resolveColorChannelBaseValue');
vi.mock('../../../primitives');

const resolveColorChannelBaseValueMocked = vi.mocked(resolveColorChannelBaseValue);
const createColorChannelMocked = vi.mocked(createColorChannel);

describe('createColorChannelBaseValue()', () => {
    const channelDef = mockChannelDefinition;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When get() is called', () => {
        const mockInput = 123.371 as ColorChannelInput;
        const [mockValueContext, { forPrimitiveSpy }] = createValueContextMock(mockInput);

        const mockLiteral = { value: 44 } as ColorChannelLiteral;
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockColorChannel = { value: 33 } as ColorChannel;
        const mockOptions = {} as ColorChannelBaseOptions;

        beforeEach(() => {
            resolveColorChannelBaseValueMocked.mockReturnValue(mockLiteral);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createColorChannelMocked.mockReturnValue(mockColorChannel);
        });

        it('should return a BaseValue with the provided context', () => {
            const result = createColorChannelBaseValue(channelDef, mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a BaseValue with the provided context', () => {
            const result = createColorChannelBaseValue(channelDef, mockValueContext);
            expect(result.value).toEqual(mockColorChannel.value);
        });

        it('should call resolveColorChannelBaseValue() with the expected arguments', () => {
            createColorChannelBaseValue(channelDef, mockValueContext, mockOptions);
            expect(resolveColorChannelBaseValueMocked).toHaveBeenCalledWith(
                channelDef,
                mockValueContext,
            );
        });

        it('should call primitiveContext() with the resolved input', () => {
            createColorChannelBaseValue(channelDef, mockValueContext, mockOptions);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColorChannel() with the expected arguments', () => {
            createColorChannelBaseValue(channelDef, mockValueContext, mockOptions);
            expect(createColorChannelMocked).toHaveBeenCalledWith(
                channelDef,
                mockPrimitiveContext,
                mockOptions,
            );
        });

        describe('when get() is called', () => {
            it('should return the created ColorChannel primitive', () => {
                const result = createColorChannelBaseValue(
                    channelDef,
                    mockValueContext,
                    mockOptions,
                );
                expect(result.get()).toBe(mockColorChannel);
            });
        });
    });
});
