import { describe, expect, it } from 'vitest';

import type { ColorOkLCHLiteral, ColorSetBoundedInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';
import { COLOR_FORMAT_OKLCH } from '../../../primitives';

import { createColorSetBoundedModel } from './createColorSetBoundedModel';

describe('createColorSetBoundedModel()', () => {
    const model = createColorSetBoundedModel();

    describe('Given a context and params', () => {
        const expectedLength = 9;
        const fromL = 0.5;
        const toL = 1;
        const params: ColorSetBoundedInput['params'] = {
            from: { l: fromL, c: 0.01, h: 300 },
            to: { l: toL, c: 0.01, h: 300 },
            steps: expectedLength - 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(
                result
                    .get()
                    .first()
                    ?.get()
                    .toObject<ColorOkLCHLiteral>({ format: COLOR_FORMAT_OKLCH }).l,
            ).toEqual(fromL);
            expect(
                result
                    .get()
                    .item(4)
                    ?.get()
                    .toObject<ColorOkLCHLiteral>({ format: COLOR_FORMAT_OKLCH }).l,
            ).toBeCloseTo(0.75);
            expect(
                result
                    .get()
                    .last()
                    ?.get()
                    .toObject<ColorOkLCHLiteral>({ format: COLOR_FORMAT_OKLCH }).l,
            ).toBeCloseTo(toL);
        });
    });
});
