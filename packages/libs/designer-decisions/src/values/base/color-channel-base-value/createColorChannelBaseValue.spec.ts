import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ColorChannelInput, createStaticInput } from '../../../inputs';
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

    describe('Given a size definition, a context, and an input', () => {
        const params = { $name: 'Foo' } as ColorChannelInput;
        const mockInput = createStaticInput({ params });
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return a BaseValue with the provided context', () => {
            const result = createColorChannelBaseValue(channelDef, mockValueContext, params);

            expect(result.context()).toEqual(mockValueContext);
        });
    });

    describe('When get() is called', () => {
        const params = 123.371 as ColorChannelInput;
        const mockInput = createStaticInput({ params });
        const mockLiteral = { value: 44 } as ColorChannelLiteral;
        const mockColorChannel = { value: 33 } as ColorChannel;
        const [mockValueContext, { primitiveContextSpy }] = createValueContextMock(mockInput);
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockOptions = {} as ColorChannelBaseOptions;

        beforeEach(() => {
            resolveColorChannelBaseValueMocked.mockReturnValue(mockLiteral);
            primitiveContextSpy.mockReturnValue(mockPrimitiveContext);
            createColorChannelMocked.mockReturnValue(mockColorChannel);
        });

        it('should call resolveColorChannelBaseValue() with the expected arguments', () => {
            const result = createColorChannelBaseValue(
                channelDef,
                mockValueContext,
                params,
                mockOptions,
            );
            result.get();

            expect(resolveColorChannelBaseValueMocked).toHaveBeenCalledWith(
                channelDef,
                mockValueContext,
                params,
            );
        });

        it('should call primitiveContext() with the resolved input', () => {
            const result = createColorChannelBaseValue(
                channelDef,
                mockValueContext,
                params,
                mockOptions,
            );
            result.get();

            expect(primitiveContextSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColorChannel() with the expected arguments', () => {
            const result = createColorChannelBaseValue(
                channelDef,
                mockValueContext,
                params,
                mockOptions,
            );
            result.get();

            expect(createColorChannelMocked).toHaveBeenCalledWith(
                channelDef,
                mockPrimitiveContext,
                mockOptions,
            );
        });

        it('should return the created ColorChannel primitive', () => {
            const result = createColorChannelBaseValue(
                channelDef,
                mockValueContext,
                params,
                mockOptions,
            );

            expect(result.get()).toBe(mockColorChannel);
        });
    });
});
