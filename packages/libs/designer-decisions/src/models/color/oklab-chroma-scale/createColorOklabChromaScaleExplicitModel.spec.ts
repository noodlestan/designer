import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorOklabChromaScaleExplicitModel } from './createColorOklabChromaScaleExplicitModel';

describe('createColorOklabChromaScaleExplicitModel()', () => {
    const model = createColorOklabChromaScaleExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.1119, 0.5, 0.9],
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockValueContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().first()?.get().toNumber()).toEqual(0.112);
            expect(result.get().item(1)?.get().toNumber()).toEqual(params.values[1]);
            expect(result.get().last()?.get().toNumber()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabChromaScaleExplicitInput['params'] = {
            values: [0.1117, 0.3357, 1.132],
            quantize: 0.2,
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().first()?.get().toNumber()).toEqual(0.112);
            expect(result.get().item(1)?.get().toNumber()).toEqual(0.336);
            expect(result.get().last()?.get().toNumber()).toEqual(0.5);
        });
    });
});
