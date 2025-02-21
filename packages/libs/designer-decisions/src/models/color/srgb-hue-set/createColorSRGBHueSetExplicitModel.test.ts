import { describe, expect, it } from 'vitest';

import type { ColorSRGBHueSetExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorSRGBHueSetExplicitModel } from './createColorSRGBHueSetExplicitModel';

describe('createColorSRGBHueSetExplicitModel()', () => {
    const model = createColorSRGBHueSetExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBHueSetExplicitInput['params'] = {
            values: [330.111, 350, 370],
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(330.1);
            expect(result.get().item(1)?.get()).toEqual(params.values[1]);
            expect(result.get().last()?.get()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBHueSetExplicitInput['params'] = {
            values: [333.311, 344, 371],
            quantize: 5,
        };

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(335);
            expect(result.get().item(1)?.get()).toEqual(345);
            expect(result.get().last()?.get()).toEqual(360);
        });
    });
});
