import { describe, expect, it } from 'vitest';

import type { FontWeightValueExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createFontWeightValueExplicitModel } from './createFontWeightValueExplicitModel';

describe('createFontWeightValueExplicitModel()', () => {
    const model = createFontWeightValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: FontWeightValueExplicitInput['params'] = {
            value: 100,
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().value).toEqual(100);
            expect(result.toString()).toEqual('100');
        });
    });

    describe('Given a valid named weight', () => {
        const [mockContext] = createValueContextMock();
        const params: FontWeightValueExplicitInput['params'] = {
            value: 'Extra Light',
        };

        it('should map the name to a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().value).toEqual(200);
            expect(result.get().named()).toEqual('Extra Light');
            expect(result.toString()).toEqual('Extra Light');
        });
    });

    describe('Given an invalid named weight', () => {
        const [mockContext] = createValueContextMock();
        const params = {
            value: 'Foo',
        } as unknown as FontWeightValueExplicitInput['params'];

        it('should create a value with the fallback', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().value).toEqual(400);
            expect(result.get().named()).toEqual(undefined);
            expect(result.toString()).toEqual('400');
        });

        it('should return the original name', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().named()).toEqual(undefined);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: FontWeightValueExplicitInput['params'] = {
            value: 573,
            quantize: 25,
        };

        it('should create a quantized value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().value).toEqual(575);
            expect(result.get().named()).toEqual(undefined);
            expect(result.toString()).toEqual('575');
        });
    });
});
