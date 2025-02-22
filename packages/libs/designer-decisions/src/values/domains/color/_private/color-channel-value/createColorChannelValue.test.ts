import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorOkLCHLiteral, ColorOklabChromaInput } from '../../../../../inputs';
import { createDecisionContextMock } from '../../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../../value';
import { COLOR_FORMAT_OKLCH } from '../../../../primitives';

import { createColorChannelValue } from './createColorChannelValue';
import { mockChannelAttributes } from './mocks';

describe('createColorChannelValue()', () => {
    const mockChannel = mockChannelAttributes;
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput: ColorOklabChromaInput = 277.333;

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
    });

    describe('Given a value', () => {
        it('should have the provided context', () => {
            const result = createColorChannelValue(mockChannel, mockContext, mockInput);

            expect(result.context()).toBe(mockContext);
        });

        it('should have the expected name', () => {
            const result = createColorChannelValue(mockChannel, mockContext, mockInput);

            expect(result.channelName()).toBe(mockChannel.channelName);
        });

        it('should consume the input', () => {
            createColorChannelValue(mockChannel, mockContext, mockInput);

            expect(mockContext.valueInput()).toEqual(mockInput);
        });

        it('should expose the quantized value via get() and quantized()', () => {
            const result = createColorChannelValue(mockChannel, mockContext, mockInput);

            expect(result.get()).toEqual(277.3);
            expect(result.quantized()).toEqual(277.3);
        });

        it('should expose the raw via raw() and quantized(0)', () => {
            const result = createColorChannelValue(mockChannel, mockContext, mockInput);

            expect(result.raw()).toEqual(mockInput);
            expect(result.quantized(0)).toEqual(mockInput);
        });

        it('should quantize the value', () => {
            const result = createColorChannelValue(mockChannel, mockContext, mockInput);

            expect(result.quantized(0.2)).toEqual(277.4);
        });

        it('should clamp the quantized value', () => {
            const result = createColorChannelValue(mockChannel, mockContext, mockInput);

            expect(result.quantized(400)).toEqual(360);
        });

        it('should convert to a color with given channels', () => {
            const result = createColorChannelValue(mockChannel, mockContext, mockInput);

            const color = result.toColor({ l: 0.5552, c: 0.02773 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>(COLOR_FORMAT_OKLCH);

            expect(l).toEqual(0.555);
            expect(c).toEqual(0.028);
            expect(h).toEqual(277.3);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createColorChannelValue(
                mockChannelAttributes,
                mockContext,
                mockInput,
                options,
            );

            expect(result.get()).toEqual(278);
            expect(result.quantized()).toEqual(278);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createColorChannelValue(
                mockChannelAttributes,
                mockContext,
                mockInput,
                options,
            );

            expect(result.raw()).toEqual(mockInput);
            expect(result.quantized(0)).toEqual(mockInput);
        });

        it('should (re)quantize the value', () => {
            const result = createColorChannelValue(
                mockChannelAttributes,
                mockContext,
                mockInput,
                options,
            );

            expect(result.quantized(10)).toEqual(280);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createColorChannelValue(
                mockChannelAttributes,
                mockContext,
                mockInput,
                options,
            );

            const color = result.toColor({ l: 0.5552, c: 0.02773 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>(COLOR_FORMAT_OKLCH);

            expect(l).toEqual(0.56);
            expect(c).toEqual(0.02);
            expect(h).toEqual(278);
        });
    });
});
