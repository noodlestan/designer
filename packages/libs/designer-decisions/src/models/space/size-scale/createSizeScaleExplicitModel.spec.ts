import { describe, expect, it } from 'vitest';

import type { SizeScaleExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createSizeScaleExplicitModel } from './createSizeScaleExplicitModel';

describe('createSizeScaleExplicitModel()', () => {
    const model = createSizeScaleExplicitModel();

    describe('Given a context and params', () => {
        const params: SizeScaleExplicitInput['params'] = {
            values: [32.111, 64, 128],
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toString()).toEqual('32.11');
            expect(result.item(1)?.toString()).toEqual('64');
            expect(result.last()?.toString()).toEqual('128');
        });
    });

    describe('Given a quantize param', () => {
        const params: SizeScaleExplicitInput['params'] = {
            values: [{ value: 32.111, unit: 'rem' }, 63, 127],
            quantize: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toString()).toEqual('32rem');
            expect(result.item(1)?.toString()).toEqual('64');
            expect(result.last()?.toString()).toEqual('128');
        });
    });
});
