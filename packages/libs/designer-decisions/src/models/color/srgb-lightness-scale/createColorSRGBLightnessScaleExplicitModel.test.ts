import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorSRGBLightnessScaleExplicitInput } from '../../../types';

import { createColorSRGBLightnessScaleExplicitModel } from './createColorSRGBLightnessScaleExplicitModel';

describe('createColorSRGBLightnessScaleExplicitModel()', () => {
    const model = createColorSRGBLightnessScaleExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBLightnessScaleExplicitInput['params'] = {
            values: [0.1119, 0.5, 1.1],
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.112);
            expect(result.get().item(1)?.get()).toEqual(params.values[1]);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBLightnessScaleExplicitInput['params'] = {
            values: [0.1117, 0.5357, 1.132],
            quantize: 0.2,
        };

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.112);
            expect(result.get().item(1)?.get()).toEqual(0.536);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });
});
