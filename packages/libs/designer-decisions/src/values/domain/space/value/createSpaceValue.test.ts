import { beforeEach, describe, expect, it } from 'vitest';

import type { SpaceValueInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';

import { createSpaceValue } from './createSpaceValue';

describe('createSpaceValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        const input = { value: 123.371, units: 'rem' } as SpaceValueInput;

        it('should have the provided context', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should consume the input', () => {
            createSpaceValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved value via .get()', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.get()).toEqual(123.4);
        });

        it('should expose the raw value via .raw()', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.raw()).toEqual(123.371);
        });

        it('should expose the quantized value via .quantized()', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.quantized()).toEqual(123.4);
        });

        it('should (re)quantize the value', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.quantized(2)).toEqual(124);
        });

        it('should expose the value as SpaceWithUnits ', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.toObject()).toEqual({
                value: 123.4,
                units: 'rem',
            });
        });

        it('should quantize the SpaceWithUnits ', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.toObject({ quantize: 0.5 })).toEqual({
                value: 123.5,
                units: 'rem',
            });
        });

        it('should expose the value as a string', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.toString()).toEqual('123.4rem');
        });

        it('should quantize the string value', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.toString({ quantize: 0.5 })).toEqual('123.5rem');
        });
    });

    describe('Given a quantize param', () => {
        const input = { value: 123.371, units: 'rem' } as SpaceValueInput;

        it('should expose the quantized value via .get()', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.get()).toEqual(123.38);
        });

        it('should expose the raw value via .raw()', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.raw()).toEqual(123.371);
        });

        it('should expose the quantized value', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.quantized()).toEqual(123.38);
        });

        it('should expose the (un)quantized value (given q is 0)', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.quantized(0)).toEqual(123.371);
        });

        it('should (re)quantize the value', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.quantized(0.5)).toEqual(123.5);
        });

        it('should expose the quantized value as SpaceWithUnits ', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.toObject()).toEqual({
                value: 123.38,
                units: 'rem',
            });
        });

        it('should expose the (un)quantized value as SpaceWithUnits (given q is 0', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.toObject({ quantize: 0 })).toEqual(input);
        });

        it('should (re)quantize the SpaceWithUnits ', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.toObject({ quantize: 5 })).toEqual({
                value: 125,
                units: 'rem',
            });
        });

        it('should expose the quantized value as a string', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.toString()).toEqual('123.38rem');
        });

        it('should expose the (un)quantized value as a string (given q is 0', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.toString({ quantize: 0 })).toEqual('123.371rem');
        });

        it('should (re)quantize the string value', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 0.02 });

            expect(result.toString({ quantize: 0.5 })).toEqual('123.5rem');
        });
    });
});
