import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOkLCHLiteral } from '../../../inputs';
import { createPrimitiveContextMock, mockChannelDefinition } from '../../../mocks';

import { createColorChannel } from './createColorChannel';
import { normalizeColorChannelInput } from './private';

vi.mock('./private');

const normalizeColorChannelInputMocked = vi.mocked(normalizeColorChannelInput);

describe('createColorChannel()', () => {
    const channelDef = mockChannelDefinition;
    const literalChannel = { value: 233 };
    const mockInput = 13;
    const [mockPrimitiveContext, { forOutputSpy }] = createPrimitiveContextMock(mockInput);

    beforeEach(() => {
        vi.clearAllMocks();
        normalizeColorChannelInputMocked.mockReturnValue(literalChannel);
    });

    describe('Given a context with an input', () => {
        it('should call normalizeColorChannelInputMocked() with the expected arguments', () => {
            createColorChannel(channelDef, mockPrimitiveContext);
            expect(normalizeColorChannelInputMocked).toHaveBeenCalledWith(
                channelDef,
                mockPrimitiveContext,
            );
        });

        it('should expose the resolved attributes', () => {
            const result = createColorChannel(channelDef, mockPrimitiveContext);
            expect(result.value).toEqual(literalChannel.value);
        });
    });

    describe('When literal() is called', () => {
        it('should return a ColorChannelObjectLiteral', () => {
            const channel = createColorChannel(channelDef, mockPrimitiveContext);
            const result = channel.literal();
            expect(result).toEqual(literalChannel);
        });
    });

    describe('When toString() is called', () => {
        it('should return the value as a string', () => {
            const channel = createColorChannel(channelDef, mockPrimitiveContext);
            const result = channel.toString();
            expect(result).toEqual(String(literalChannel.value));
        });
    });

    describe('When toColor() is called', () => {
        const colorLiteral = { l: 0.5, c: 0.1, h: 233 };
        const [forOutput] = createPrimitiveContextMock(colorLiteral);

        beforeEach(() => {
            forOutputSpy.mockReturnValue(forOutput);
        });

        it('should create an output context', () => {
            const channel = createColorChannel(channelDef, mockPrimitiveContext);
            channel.toColor({ l: 0.5, c: 0.1 });
            expect(forOutputSpy).toHaveBeenCalledWith(colorLiteral);
        });

        it('should return the value as an object', () => {
            const channel = createColorChannel(channelDef, mockPrimitiveContext);
            const result = channel.toColor({ l: 0.5, c: 0.1 });
            const lch = result.toObject<ColorOkLCHLiteral>({ format: 'oklch' });
            expect(lch.l).toEqual(0.5);
            expect(lch.c).toEqual(0.1);
            expect(lch.h).toEqual(233);
        });
    });
});
