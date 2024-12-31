import type { Color } from 'chroma-js';
import chroma from 'chroma-js';

import { DECISION_COLOR_VALUE, isColorValueDecision } from '../../../decision';
import type { ColorInputValue, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';
import { resolveSRGBHueValue } from '../srgb-hue-value';
import { resolveSRGBLightnessValue } from '../srgb-lightness-value';
import { resolveSRGBSaturationValue } from '../srgb-saturation-value';

export const resolveColorValue = (context: ValueContext, input: ColorInputValue): Color => {
    if (isDecisionRef(input)) {
        // const resolution = context.resolve();
        const decision = context.resolve(input);

        // WIP if (!decision)
        if (!decision) {
            // push to context.errors ?
            throw new Error(`Could not find decision by ref "${JSON.stringify(input)}".`);
        }
        if (isColorValueDecision(decision)) {
            const v = decision.produce(context).value();
            return v.get();
        } else {
            throw new Error(
                `Did not resolve to a "${DECISION_COLOR_VALUE}" - "${JSON.stringify(input)}".`,
            );
        }
    } else if (typeof input === 'object') {
        if ('s' in input) {
            return chroma.hsl(
                resolveSRGBHueValue(context, input.h),
                resolveSRGBSaturationValue(context, input.s),
                resolveSRGBLightnessValue(context, input.l),
            );
            // } else if ('a' in input) {
            //     return chroma.oklab(
            //         resolveSRGBHueValue(context, input.l),
            //         resolveSRGBSaturationValue(context, input.a),
            //         resolveSRGBLightnessValue(context, input.b),
            //     );
        }
    } else if (typeof input === 'string' || typeof input === 'number') {
        return chroma(input);
    }
    console.error(input);
    throw new Error(`Unexpected type "${typeof input}".`);
};
