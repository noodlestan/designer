import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabLightnessScaleExplicitInput } from '../../../types';

import { createColorOklabLightnessScaleExplicitModel } from './createColorOklabLightnessScaleExplicitModel';

describe('createColorOklabLightnessScaleExplicitModel()', () => {
    const model = createColorOklabLightnessScaleExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabLightnessScaleExplicitInput['params'] = {
            values: [0.111, 0.5, 1.1],
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(params.values[0]);
            expect(result.get().item(1)?.get()).toEqual(params.values[1]);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });

    describe('Given a precision', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabLightnessScaleExplicitInput['params'] = {
            values: [0.111, 0.5, 1.1],
            precision: 0.2,
        };

        it('should round the value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.2);
            expect(result.get().item(1)?.get()).toEqual(0.6);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });
});
