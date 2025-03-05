import { describe, expect, it } from 'vitest';

import type { SizeScaleAnchoredInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createSizeScaleAnchoredModel } from './createSizeScaleAnchoredModel';

describe('createSizeScaleAnchoredModel()', () => {
    const model = createSizeScaleAnchoredModel();

    describe('Given a context and params', () => {
        const expectedLength = 6;
        const params: SizeScaleAnchoredInput['params'] = {
            anchor: 50,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.04 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a set of the expected size', () => {
            const result = model.produce(mockValueContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().first()?.get().toString()).toEqual('49.92');
            expect(result.get().item(2)?.get().toString()).toEqual('50');
            expect(result.get().last()?.get().toString()).toEqual('110');
        });
    });

    describe('Given a quantize param', () => {
        const params: SizeScaleAnchoredInput['params'] = {
            anchor: {
                value: 50,
                unit: 'rem',
            },
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.04 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
            quantize: 0.05,
        };
        const [mockValueContext] = createValueContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().first()?.get().toString()).toEqual('49.9rem');
            expect(result.get().item(2)?.get().toString()).toEqual('50rem');
            expect(result.get().last()?.get().toString()).toEqual('110rem');
        });
    });
});
