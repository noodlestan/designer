import type { Color } from 'chroma-js';
import chroma from 'chroma-js';

import { DECISION_COLOR_VALUE, isColorValueDecision } from '../../../decision';
import type { ColorInput, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';
import { resolveHueValue } from '../hue-value';
import { resolveLightnessValue } from '../lightness-value';
import { resolveSaturationValue } from '../saturation-value';

export const resolveColorValue = (context: ValueContext, input: ColorInput): Color => {
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
        if ('l' in input) {
            return chroma.hsl(
                resolveHueValue(context, input.h),
                resolveSaturationValue(context, input.s),
                resolveLightnessValue(context, input.l),
            );
        } else if ('v' in input) {
            return chroma.hsv(
                resolveHueValue(context, input.h),
                resolveSaturationValue(context, input.s),
                resolveLightnessValue(context, input.v),
            );
        } else if ('r' in input) {
            return chroma.rgb(input.r, input.g, input.b);
        }
    } else if (typeof input === 'string' || typeof input === 'number') {
        return chroma(input);
    }
    throw new Error(`Unexpected type "${typeof input}".`);
};
