import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabChromaScaleBoundedInput } from '../../../types';

import { createColorSRGBLightnessScaleBoundedModel } from './createColorSRGBLightnessScaleBoundedModel';

describe('createColorSRGBLightnessScaleBoundedModel()', () => {
    const model = createColorSRGBLightnessScaleBoundedModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 9;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.5,
            to: 1.5,
            steps: expectedLength - 2,
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(params.from);
            expect(result.get().item(4)?.get()).toEqual(0.75);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });
});
