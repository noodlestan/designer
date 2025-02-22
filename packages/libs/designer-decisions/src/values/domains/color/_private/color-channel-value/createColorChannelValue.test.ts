import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorOkLCHLiteral, ColorOklabChromaInput } from '../../../../../inputs';
import { createDecisionContextMock } from '../../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../../value';
import { COLOR_CHANNEL_OKLAB_CHROMA_NAME as name } from '../../../../primitives';

import { createOklabChromaValue } from './createColorChannelValue';

describe('createOklabChromaValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorOklabChromaInput = 0.2773;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        it('should have the provided context', () => {
            const result = createOklabChromaValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should have the expected name', () => {
            const result = createOklabChromaValue(valueContext, input);

            expect(result.name()).toBe(name);
        });

        it('should consume the input', () => {
            createOklabChromaValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the quantized value via get() and quantized()', () => {
            const result = createOklabChromaValue(valueContext, input);

            expect(result.get()).toEqual(0.277);
            expect(result.quantized()).toEqual(0.277);
        });

        it('should expose the raw via raw() and quantized(0)', () => {
            const result = createOklabChromaValue(valueContext, input);

            expect(result.raw()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createOklabChromaValue(valueContext, input);

            expect(result.quantized(0.2)).toEqual(0.278);
        });

        it('should clamp the quantized value', () => {
            const result = createOklabChromaValue(valueContext, input);

            expect(result.quantized(51)).toEqual(0.5);
        });

        it('should convert to a color with given channels', () => {
            const result = createOklabChromaValue(valueContext, input);

            const color = result.toColor({ l: 0.5552, h: 301.1533 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toEqual(0.555);
            expect(c).toEqual(0.277);
            expect(h).toEqual(301.1);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createOklabChromaValue(valueContext, input, options);

            expect(result.get()).toEqual(0.28);
            expect(result.quantized()).toEqual(0.28);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createOklabChromaValue(valueContext, input, options);

            expect(result.raw()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should (re)quantize the value', () => {
            const result = createOklabChromaValue(valueContext, input, options);

            expect(result.quantized(10)).toEqual(0.3);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createOklabChromaValue(valueContext, input, options);

            const color = result.toColor({ l: 0.555, h: 301.1533 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toEqual(0.56);
            expect(c).toEqual(0.28);
            expect(h).toEqual(302);
        });
    });
});
