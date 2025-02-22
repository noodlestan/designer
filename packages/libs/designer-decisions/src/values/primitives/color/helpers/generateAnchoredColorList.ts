import type { AnchoredColorListParams, ColorFormat, ColorObjectLiteral } from '../../../../inputs';
import { COLOR_FORMAT_OKLCH } from '../constants';
import { generateColorList } from '../functions';
import type { ColorValue } from '../types';

export const generateAnchoredColorList = <T extends ColorObjectLiteral = ColorObjectLiteral>(
    anchor: ColorValue,
    params: AnchoredColorListParams,
    format: ColorFormat = COLOR_FORMAT_OKLCH,
): T[] => {
    const { steps: beforeSteps = 0, modifier: beforeMod } = params.before || {};
    const before = generateColorList(anchor, beforeSteps + 1, beforeMod, format);

    const { steps: afterSteps = 0, modifier: afterMod } = params.after || {};
    const after = generateColorList(anchor, afterSteps + 1, afterMod, format);

    return [...before.splice(1).reverse(), anchor.toObject(format), ...after.splice(1)] as T[];
};
