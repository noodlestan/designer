import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { SpaceValueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSpaceValue } from './createSpaceValue';

describe('createSpaceValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        const input = { value: 123.391, units: 'rem' } as SpaceValueInput;

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

            expect(result.get()).toEqual(123.391);
        });

        it('should expose the raw value via .raw()', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.raw()).toEqual(123.391);
        });

        it('should expose the raw value via .quantized()', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.quantized()).toEqual(123.391);
        });

        it('should quantize the value', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.quantized(2)).toEqual(124);
        });

        it('should expose the value as SpaceWithUnits ', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.toObject()).toEqual(input);
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

            expect(result.toString()).toEqual('123.391rem');
        });

        it('should quantize the string value', () => {
            const result = createSpaceValue(valueContext, input);

            expect(result.toString({ quantize: 0.5 })).toEqual('123.5rem');
        });
    });

    describe('Given a quantize param', () => {
        const input = { value: 123.391, units: 'rem' } as SpaceValueInput;

        it('should expose the quantized value via .get()', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.get()).toEqual(124);
        });

        it('should expose the raw value via .raw()', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.raw()).toEqual(123.391);
        });

        it('should expose the quantized value', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.quantized()).toEqual(124);
        });

        it('should expose the (un)quantized value (given q is 0)', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.quantized(0)).toEqual(123.391);
        });

        it('should (re)quantize the value', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.quantized(0.5)).toEqual(123.5);
        });

        it('should expose the quantized value as SpaceWithUnits ', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.toObject()).toEqual({
                value: 124,
                units: 'rem',
            });
        });

        it('should expose the (un)quantized value as SpaceWithUnits (given q is 0', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.toObject({ quantize: 0 })).toEqual(input);
        });

        it('should (re)quantize the SpaceWithUnits ', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.toObject({ quantize: 5 })).toEqual({
                value: 125,
                units: 'rem',
            });
        });

        it('should expose the quantized value as a string', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.toString()).toEqual('124rem');
        });

        it('should expose the (un)quantized value as a string (given q is 0', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.toString({ quantize: 0 })).toEqual('123.391rem');
        });

        it('should (re)quantize the string value', () => {
            const result = createSpaceValue(valueContext, input, { quantize: 2 });

            expect(result.toString({ quantize: 0.5 })).toEqual('123.5rem');
        });
    });
});
