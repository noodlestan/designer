import { describe, expect, it, vi } from 'vitest';

import {
    D_COLOR_SET,
    D_COLOR_VALUE,
    D_FONT_SIZE_VALUE,
    D_FONT_WEIGHT_VALUE,
    D_LETTER_SPACING_VALUE,
    D_LINE_HEIGHT_VALUE,
    D_OKLAB_CHROMA_SCALE,
    D_OKLAB_CHROMA_VALUE,
    D_OKLAB_HUE_SET,
    D_OKLAB_HUE_VALUE,
    D_OKLAB_LIGHTNESS_SCALE,
    D_OKLAB_LIGHTNESS_VALUE,
    D_SIZE_SCALE,
    D_SIZE_VALUE,
    D_SRGB_HUE_SET,
    D_SRGB_HUE_VALUE,
    D_SRGB_LIGHTNESS_SCALE,
    D_SRGB_LIGHTNESS_VALUE,
    D_SRGB_SATURATION_SCALE,
    D_SRGB_SATURATION_VALUE,
    D_TYPEFACE_VALUE,
} from '../constants';
import type { DecisionUnknown } from '../decision';

import {
    isColorSet,
    isColorValue,
    isOklabChromaScale,
    isOklabChromaValue,
    isOklabHueSet,
    isOklabHueValue,
    isOklabLightnessScale,
    isOklabLightnessValue,
    isSRGBHueSet,
    isSRGBHueValue,
    isSRGBLightnessScale,
    isSRGBLightnessValue,
    isSRGBSaturationScale,
    isSRGBSaturationValue,
} from './color';
import { isSizeScale, isSizeValue } from './space';
import {
    isFontSizeValue,
    isFontWeightValue,
    isLetterSpacingValue,
    isLineHeightValue,
    isTypefaceValue,
} from './typography';

const testCases = [
    {
        name: 'isOklabChromaScale',
        fn: isOklabChromaScale,
        type: D_OKLAB_CHROMA_SCALE,
    },
    {
        name: 'isOklabChromaValue',
        fn: isOklabChromaValue,
        type: D_OKLAB_CHROMA_VALUE,
    },
    {
        name: 'isOklabHueSet',
        fn: isOklabHueSet,
        type: D_OKLAB_HUE_SET,
    },
    {
        name: 'isOklabHueValue',
        fn: isOklabHueValue,
        type: D_OKLAB_HUE_VALUE,
    },
    {
        name: 'isOklabLightnessScale',
        fn: isOklabLightnessScale,
        type: D_OKLAB_LIGHTNESS_SCALE,
    },
    {
        name: 'isOklabLightnessValue',
        fn: isOklabLightnessValue,
        type: D_OKLAB_LIGHTNESS_VALUE,
    },
    {
        name: 'isSRGBHueSet',
        fn: isSRGBHueSet,
        type: D_SRGB_HUE_SET,
    },
    {
        name: 'isSRGBHueValue',
        fn: isSRGBHueValue,
        type: D_SRGB_HUE_VALUE,
    },
    {
        name: 'isSRGBLightnessScale',
        fn: isSRGBLightnessScale,
        type: D_SRGB_LIGHTNESS_SCALE,
    },
    {
        name: 'isSRGBLightnessValue',
        fn: isSRGBLightnessValue,
        type: D_SRGB_LIGHTNESS_VALUE,
    },
    {
        name: 'isSRGBSaturationScale',
        fn: isSRGBSaturationScale,
        type: D_SRGB_SATURATION_SCALE,
    },
    {
        name: 'isSRGBSaturationValue',
        fn: isSRGBSaturationValue,
        type: D_SRGB_SATURATION_VALUE,
    },
    {
        name: 'isColorSet',
        fn: isColorSet,
        type: D_COLOR_SET,
    },
    {
        name: 'isColorValue',
        fn: isColorValue,
        type: D_COLOR_VALUE,
    },
    {
        name: 'isSizeScale',
        fn: isSizeScale,
        type: D_SIZE_SCALE,
    },
    {
        name: 'isSizeValue',
        fn: isSizeValue,
        type: D_SIZE_VALUE,
    },
    {
        name: 'isTypefaceValue',
        fn: isTypefaceValue,
        type: D_TYPEFACE_VALUE,
    },
    {
        name: 'isTypefaceValue',
        fn: isFontSizeValue,
        type: D_FONT_SIZE_VALUE,
    },
    {
        name: 'isTypefaceValue',
        fn: isFontWeightValue,
        type: D_FONT_WEIGHT_VALUE,
    },
    {
        name: 'isTypefaceValue',
        fn: isLineHeightValue,
        type: D_LINE_HEIGHT_VALUE,
    },
    {
        name: 'isTypefaceValue',
        fn: isLetterSpacingValue,
        type: D_LETTER_SPACING_VALUE,
    },
];

testCases.forEach(({ name, fn, type: validType }) => {
    describe(`${name}()`, () => {
        const mockValidDecision = {
            type: vi.fn(() => validType),
        } as unknown as DecisionUnknown;

        const mockInvalidDecision = {
            type: vi.fn(() => 'OTHER_DECISION_TYPE'),
        } as unknown as DecisionUnknown;

        it('should return true for a valid decision type', () => {
            const result = fn(mockValidDecision);
            expect(result).toBe(true);
            expect(mockValidDecision.type).toHaveBeenCalled();
        });

        it('should return false for an invalid decision type', () => {
            const result = fn(mockInvalidDecision);
            expect(result).toBe(false);
            expect(mockInvalidDecision.type).toHaveBeenCalled();
        });
    });
});
