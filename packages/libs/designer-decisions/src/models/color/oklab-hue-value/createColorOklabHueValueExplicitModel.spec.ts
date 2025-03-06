import { describe, expect, it } from 'vitest';

import type { ColorOklabHueValueExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabHueValueExplicitModel } from './createColorOklabHueValueExplicitModel';

describe('createColorOklabHueValueExplicitModel()', () => {
    const model = createColorOklabHueValueExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorOklabHueValueExplicitInput['params'] = {
            value: 333.111,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().toNumber()).toEqual(333.1);
        });
    });

    describe('Given input out of range', () => {
        const params: ColorOklabHueValueExplicitInput['params'] = {
            value: 390,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a clamped value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().toNumber()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabHueValueExplicitInput['params'] = {
            value: 333.1,
            quantize: 5,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a quantized value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().toNumber()).toEqual(335);
        });
    });
});
