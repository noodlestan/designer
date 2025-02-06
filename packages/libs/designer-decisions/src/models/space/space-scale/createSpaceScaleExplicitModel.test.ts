import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { SpaceScaleExplicitInput } from '../../../types';

import { createSpaceScaleExplicitModel } from './createSpaceScaleExplicitModel';

describe('createSpaceScaleExplicitModel()', () => {
    const model = createSpaceScaleExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: SpaceScaleExplicitInput['params'] = {
            values: [32.111, 64, 128],
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(params.values[0] + 'px');
            expect(result.get().item(1)?.get()).toEqual(params.values[1] + 'px');
            expect(result.get().last()?.get()).toEqual(params.values[2] + 'px');
        });
    });
});
