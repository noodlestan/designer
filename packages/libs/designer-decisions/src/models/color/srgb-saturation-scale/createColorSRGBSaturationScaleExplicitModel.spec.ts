import { describe, expect, it } from 'vitest';

import type { ColorSRGBSaturationScaleExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorSRGBSaturationScaleExplicitModel } from './createColorSRGBSaturationScaleExplicitModel';

describe('createColorSRGBSaturationScaleExplicitModel()', () => {
    const model = createColorSRGBSaturationScaleExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorSRGBSaturationScaleExplicitInput['params'] = {
            values: [0.1119, 0.5, 1.1],
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(0.112);
            expect(result.get().item(1)?.get().toNumber()).toEqual(params.values[1]);
            expect(result.get().last()?.get().toNumber()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorSRGBSaturationScaleExplicitInput['params'] = {
            values: [0.1117, 0.5357, 1.132],
            quantize: 0.2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(0.112);
            expect(result.get().item(1)?.get().toNumber()).toEqual(0.536);
            expect(result.get().last()?.get().toNumber()).toEqual(1);
        });
    });
});
