import { DECISION_COLOR_VALUE, isColorHueValueDecision } from '../../../decision';
import type { ColorHueInput, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

export const resolveHueValue = (context: ValueContext, input: ColorHueInput): number => {
    if (isDecisionRef(input)) {
        // const resolution = context.resolve();
        const decision = context.resolve(input);

        // WIP if (!decision)
        if (!decision) {
            // push to context.errors ?
            throw new Error(`Could not find decision by ref "${JSON.stringify(input)}".`);
        }
        if (isColorHueValueDecision(decision)) {
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
