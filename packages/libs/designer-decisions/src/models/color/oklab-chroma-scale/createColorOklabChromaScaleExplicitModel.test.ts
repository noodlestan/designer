import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabChromaScaleExplicitInput } from '../../../types';

import { createColorOklabChromaScaleExplicitModel } from './createColorOklabChromaScaleExplicitModel';

describe('createColorOklabChromaScaleExplicitModel()', () => {
    const model = createColorOklabChromaScaleExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.111, 0.5, 0.9],
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
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.111, 0.5, 1.1],
            quantize: 0.2,
        };

        it('should round the value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.2);
            expect(result.get().item(1)?.get()).toEqual(0.5);
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });
});
