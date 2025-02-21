import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorOklabChromaScaleExplicitModel } from './createColorOklabChromaScaleExplicitModel';

describe('createColorOklabChromaScaleExplicitModel()', () => {
    const model = createColorOklabChromaScaleExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.1119, 0.5, 0.9],
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
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.1117, 0.3357, 1.132],
            quantize: 0.2,
        };

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.112);
            expect(result.get().item(1)?.get()).toEqual(0.336);
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });
});
