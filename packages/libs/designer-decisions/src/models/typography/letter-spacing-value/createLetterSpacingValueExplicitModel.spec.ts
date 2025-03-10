import { describe, expect, it } from 'vitest';

import { type SizeObjectLiteral } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createLetterSpacingValueExplicitModel } from './createLetterSpacingValueExplicitModel';

describe('createLetterSpacingValueExplicitModel()', () => {
    const model = createLetterSpacingValueExplicitModel();

    describe('Given a context and params', () => {
        const input = {
            value: -0.0033,
            unit: 'rem',
        } as SizeObjectLiteral;
        const params = { value: input };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.literal()).toEqual(input);
            expect(result.toString()).toEqual('-0.0033rem');
        });
    });

    describe('Given a context and params with no units', () => {
        const input = '0.0033';
        const params = { value: input };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value with the default units', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('0.0033px');
        });
    });

    describe('Given a context and no params', () => {
        const [mockModelContext] = createModelContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('0px');
        });
    });
});
