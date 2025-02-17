import { describe, expect, it } from 'vitest';

import { ColorOkLCHLiteral, ColorSetBoundedInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorSetBoundedModel } from './createColorSetBoundedModel';

describe('createColorSetBoundedModel()', () => {
    const model = createColorSetBoundedModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 9;
        const fromL = 0.5;
        const toL = 1;
        const params: ColorSetBoundedInput['params'] = {
            from: { l: fromL, c: 0.01, h: 300 },
            to: { l: toL, c: 0.01, h: 300 },
            steps: expectedLength - 2,
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.toObject<ColorOkLCHLiteral>('oklch').l).toEqual(fromL);
            expect(result.get().item(4)?.toObject<ColorOkLCHLiteral>('oklch').l).toBeCloseTo(0.75);
            expect(result.get().last()?.toObject<ColorOkLCHLiteral>('oklch').l).toBeCloseTo(toL);
        });
    });
});
