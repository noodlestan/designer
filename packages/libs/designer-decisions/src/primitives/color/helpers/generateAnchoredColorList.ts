import type { AnchoredColorListParams, ColorSRGBHSLiteral, ColorValue } from '../../../types';

import { generateModifierColorList } from './functions';

export const generateAnchoredColorList = (
    anchor: ColorValue,
    params: AnchoredColorListParams,
): ColorSRGBHSLiteral[] => {
    const { steps: beforeSteps = 0, modifier: beforeMod } = params.before || {};
    const before = generateModifierColorList(anchor, beforeSteps + 1, beforeMod);

    const { steps: afterSteps = 0, modifier: afterMod } = params.after || {};
    const after = generateModifierColorList(anchor, afterSteps + 1, afterMod);

    const { h, s, l } = anchor.toObject('hsl') as ColorSRGBHSLiteral;
    const anchorValue = { h: h || 0, s: s || 0, l: l || 0 };

    return [...before.splice(1).reverse(), anchorValue, ...after.splice(1)];
};
