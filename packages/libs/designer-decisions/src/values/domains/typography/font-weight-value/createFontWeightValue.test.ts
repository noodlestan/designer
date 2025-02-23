import { beforeEach, describe, expect, it } from 'vitest';

import { FontWeightLiteral } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';

import { createFontWeightValue } from './createFontWeightValue';

describe('createFontWeightValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(mockDecisionContext);
    });

    describe('Given a number value', () => {
        const input = 333.33;

        it('should have the provided context', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should consume the input', () => {
            createFontWeightValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved (quantized) value via .get()', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.get().value).toEqual(300);
            expect(result.get().named()).toEqual(undefined);
        });

        it('should expose the raw value via .raw()', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.raw()).toEqual(333.33);
        });

        it('should expose the quantized value via .quantized()', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.quantized()).toEqual(300);
        });

        it('should (re)quantize the value', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.quantized(25)).toEqual(325);
        });

        it('should expose the value as a string', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.toString()).toEqual('300');
        });

        it('should quantize the string value', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.toString({ quantize: 25 })).toEqual('325');
        });
    });

    describe('Given a quantize param', () => {
        const input = 333.33;

        it('should expose the quantized value via .get()', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.get().value).toEqual(333);
        });

        it('should expose the raw value via .raw()', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.raw()).toEqual(333.33);
        });

        it('should expose the quantized value', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.quantized()).toEqual(333);
        });

        it('should expose the (un)quantized value (given q is 0)', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.quantized(0)).toEqual(333.33);
        });

        it('should (re)quantize the value', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.quantized(25)).toEqual(325);
        });

        it('should expose the quantized value as a string', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.toString()).toEqual('333');
        });

        it('should expose the (un)quantized value as a string (given q is 0', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.toString({ quantize: 0 })).toEqual('333.33');
        });

        it('should (re)quantize the string value', () => {
            const result = createFontWeightValue(valueContext, input, { quantize: 1 });

            expect(result.toString({ quantize: 25 })).toEqual('325');
        });
    });

    describe('Given a valid weight name', () => {
        const input = 'Thin';

        it('should expose the resolved (quantized) value via .get()', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.get().value).toEqual(100);
            expect(result.get().named()).toEqual('Thin');
            expect(result.get().toString()).toEqual('Thin');
        });
    });

    describe('Given an invalid weight name', () => {
        const input = 'Foo' as unknown as FontWeightLiteral;

        it('should expose the resolved (quantized) value via .get()', () => {
            const result = createFontWeightValue(valueContext, input);

            expect(result.get().value).toEqual(400);
            expect(result.get().named()).toEqual(undefined);
            expect(result.get().toString()).toEqual('400');
        });
    });
});
