import { DECISION_COLOR_VALUE, isColorSaturationValueDecision } from '../../../decision';
import type { ColorSaturationInput, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

export const resolveSaturationValue = (
    context: ValueContext,
    input: ColorSaturationInput,
): number => {
    if (isDecisionRef(input)) {
        // const resolution = context.resolve();
        const decision = context.resolve(input);

        // WIP if (!decision)
        if (!decision) {
            // push to context.errors ?
            throw new Error(`Could not find decision by ref "${JSON.stringify(input)}".`);
        }
        if (isColorSaturationValueDecision(decision)) {
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
