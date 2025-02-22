import { describe, expect, it } from 'vitest';

import type { ColorOkLCHLiteral, ColorSetAnchoredInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';
import { COLOR_FORMAT_OKLCH } from '../../../values';

import { createColorSetAnchoredModel } from './createColorSetAnchoredModel';

describe('createColorSetAnchoredModel()', () => {
    const model = createColorSetAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const anchorL = 0.5;
        const params: ColorSetAnchoredInput['params'] = {
            anchor: { l: anchorL, c: 0.01, h: 300 },
            before: {
                steps: 2,
                modifier: {
                    space: COLOR_FORMAT_OKLCH,
                    l: { mode: 'linear', by: -0.1 },
                },
            },
            after: {
                steps: 3,
                modifier: {
                    space: COLOR_FORMAT_OKLCH,
                    l: { mode: 'linear', by: 0.2 },
                },
            },
        };

        it('should create a set of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockContext, params);

            expect(
                result.get().first()?.toObject<ColorOkLCHLiteral>(COLOR_FORMAT_OKLCH).l,
            ).toBeCloseTo(0.3);
            expect(result.get().item(2)?.toObject<ColorOkLCHLiteral>(COLOR_FORMAT_OKLCH).l).toEqual(
                anchorL,
            );
            expect(
                result.get().last()?.toObject<ColorOkLCHLiteral>(COLOR_FORMAT_OKLCH).l,
            ).toBeCloseTo(1);
        });
    });
});
