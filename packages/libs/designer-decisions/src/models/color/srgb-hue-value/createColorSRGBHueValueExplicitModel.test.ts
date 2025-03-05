import { describe, expect, it } from 'vitest';

import type { ColorSRGBHueValueExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorSRGBHueValueExplicitModel } from './createColorSRGBHueValueExplicitModel';

describe('createColorSRGBHueValueExplicitModel()', () => {
    const model = createColorSRGBHueValueExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorSRGBHueValueExplicitInput['params'] = {
            value: 330.111,
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toNumber()).toEqual(330.1);
        });
    });

    describe('Given input out of range', () => {
        const params: ColorSRGBHueValueExplicitInput['params'] = {
            value: 390,
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a clamped value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toNumber()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorSRGBHueValueExplicitInput['params'] = {
            value: 333.111,
            quantize: 5,
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a quantized value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toNumber()).toEqual(335);
        });
    });
});
