import { describe, expect, it } from 'vitest';

import type { ColorOklabHueSetExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabHueSetExplicitModel } from './createColorOklabHueSetExplicitModel';

describe('createColorOklabHueSetExplicitModel()', () => {
    const model = createColorOklabHueSetExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorOklabHueSetExplicitInput['params'] = {
            values: [333.111, 350, 370],
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(333.1);
            expect(result.get().item(1)?.get().toNumber()).toEqual(params.values[1]);
            expect(result.get().last()?.get().toNumber()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabHueSetExplicitInput['params'] = {
            values: [333.311, 344, 371],
            quantize: 5,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(335);
            expect(result.get().item(1)?.get().toNumber()).toEqual(345);
            expect(result.get().last()?.get().toNumber()).toEqual(360);
        });
    });
});
