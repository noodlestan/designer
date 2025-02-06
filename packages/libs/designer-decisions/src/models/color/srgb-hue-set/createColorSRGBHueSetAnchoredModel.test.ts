import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorSRGBHueSetAnchoredInput } from '../../../types';

import { createColorSRGBHueSetAnchoredModel } from './createColorSRGBHueSetAnchoredModel';

describe('createColorSRGBHueSetAnchoredModel()', () => {
    const model = createColorSRGBHueSetAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const params: ColorSRGBHueSetAnchoredInput['params'] = {
            anchor: 330,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.01 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
        };

        it('should create a set of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(329.98);
            expect(result.get().item(2)?.get()).toEqual(params.anchor);
            expect(result.get().last()?.get()).toEqual(360);
        });
    });
});
