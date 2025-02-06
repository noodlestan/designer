import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabHueSetExplicitInput } from '../../../types';

import { createColorOklabHueSetExplicitModel } from './createColorOklabHueSetExplicitModel';

describe('createColorOklabHueSetExplicitModel()', () => {
    const model = createColorOklabHueSetExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabHueSetExplicitInput['params'] = {
            values: [330.111, 350, 370],
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
            expect(result.get().last()?.get()).toEqual(360);
        });
    });
});
