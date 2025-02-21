import { describe, expect, it } from 'vitest';

import type { ColorSRGBSaturationValueExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorSRGBSaturationValueExplicitModel } from './createColorSRGBSaturationValueExplicitModel';

describe('createColorSRGBSaturationValueExplicitModel()', () => {
    const model = createColorSRGBSaturationValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBSaturationValueExplicitInput['params'] = {
            value: 0.555,
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(params.value);
        });
    });

    describe('Given input out of range', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBSaturationValueExplicitInput['params'] = {
            value: 2,
        };

        it('should create a clamped value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBSaturationValueExplicitInput['params'] = {
            value: 0.3137,
            quantize: 2,
        };

        it('should create a quantized value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(0.32);
        });
    });
});
