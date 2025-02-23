import { describe, expect, it } from 'vitest';

import type { SizeScaleExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createSizeScaleExplicitModel } from './createSizeScaleExplicitModel';

describe('createSizeScaleExplicitModel()', () => {
    const model = createSizeScaleExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: SizeScaleExplicitInput['params'] = {
            values: [32.111, 64, 128],
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(params.values.length);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.toString()).toEqual('32.1px');
            expect(result.get().item(1)?.toString()).toEqual(params.values[1] + 'px');
            expect(result.get().last()?.toString()).toEqual(params.values[2] + 'px');
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: SizeScaleExplicitInput['params'] = {
            values: [32.111, 63, 127],
            quantize: 2,
        };

        it('should populate the scale with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.toString()).toEqual('32px');
            expect(result.get().item(1)?.toString()).toEqual('64px');
            expect(result.get().last()?.toString()).toEqual('128px');
        });
    });
});
