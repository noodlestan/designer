import { describe, expect, it } from 'vitest';

import type { SizeScaleExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createSizeScaleExplicitModel } from './createSizeScaleExplicitModel';

describe('createSizeScaleExplicitModel()', () => {
    const model = createSizeScaleExplicitModel();

    describe('Given a context and params', () => {
        const params: SizeScaleExplicitInput['params'] = {
            values: [32.111, 64, 128],
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockValueContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().first()?.get().toString()).toEqual('32.11');
            expect(result.get().item(1)?.get().toString()).toEqual('64');
            expect(result.get().last()?.get().toString()).toEqual('128');
        });
    });

    describe('Given a quantize param', () => {
        const params: SizeScaleExplicitInput['params'] = {
            values: [{ value: 32.111, unit: 'rem' }, 63, 127],
            quantize: 2,
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().first()?.get().toString()).toEqual('32rem');
            expect(result.get().item(1)?.get().toString()).toEqual('64');
            expect(result.get().last()?.get().toString()).toEqual('128');
        });
    });
});
