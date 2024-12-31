import type { AnchoredColorListParams, ColorOkLCHLiteral, ColorValue } from '../../../types';

import { generateModifierColorList } from './functions';

export const generateAnchoredColorList = (
    anchor: ColorValue,
    params: AnchoredColorListParams,
): ColorOkLCHLiteral[] => {
    const { steps: beforeSteps = 0, modifier: beforeMod } = params.before || {};
    const before = generateModifierColorList(anchor, beforeSteps + 1, beforeMod);

    const { steps: afterSteps = 0, modifier: afterMod } = params.after || {};
    const after = generateModifierColorList(anchor, afterSteps + 1, afterMod);

    const anchorValue = anchor.toObject('oklch') as ColorOkLCHLiteral;
    return [...before.splice(1).reverse(), anchorValue, ...after.splice(1)];
};
