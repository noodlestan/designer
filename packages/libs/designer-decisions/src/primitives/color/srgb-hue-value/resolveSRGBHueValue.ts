import { DECISION_COLOR_VALUE, isColorSRGBHueValueDecision } from '../../../decision';
import type { ColorSRGBHue, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

export const resolveSRGBHueValue = (context: ValueContext, input: ColorSRGBHue): number => {
    if (isDecisionRef(input)) {
        // const resolution = context.resolve();
        const decision = context.resolve(input);

        // WIP if (!decision)
        if (!decision) {
            // push to context.errors ?
            throw new Error(`Could not find decision by ref "${JSON.stringify(input)}".`);
        }
        if (isColorSRGBHueValueDecision(decision)) {
            const v = decision.produce(context).value();
            return v.get();
        } else {
            throw new Error(
                `Did not resolve to a "${DECISION_COLOR_VALUE}" - "${JSON.stringify(input)}".`,
            );
        }
    }
    return input;
};
