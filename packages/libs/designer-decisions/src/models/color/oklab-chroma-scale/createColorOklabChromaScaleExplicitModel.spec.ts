import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabChromaScaleExplicitModel } from './createColorOklabChromaScaleExplicitModel';

describe('createColorOklabChromaScaleExplicitModel()', () => {
    const model = createColorOklabChromaScaleExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.1119, 0.5, 0.9],
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(0.112);
            expect(result.item(1)?.toNumber()).toEqual(params.values[1]);
            expect(result.last()?.toNumber()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.1117, 0.3357, 1.132],
            quantize: 0.2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(0.112);
            expect(result.item(1)?.toNumber()).toEqual(0.336);
            expect(result.last()?.toNumber()).toEqual(0.5);
        });
    });
});
