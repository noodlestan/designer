import { DECISION_SPACE_VALUE, isSpaceValueDecision } from '../../../decision';
import type { SpaceInput, SpaceWithUnitsInput, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

export const resolveSpaceValue = (
    context: ValueContext,
    input: SpaceInput,
): SpaceWithUnitsInput => {
    if (isDecisionRef(input)) {
        // const resolution = context.resolve();
        const decision = context.resolve(input);

        // WIP if (!decision)
        if (!decision) {
            // push to context.errors ?
            throw new Error(`Could not find decision by ref "${JSON.stringify(input)}".`);
        }
        if (isSpaceValueDecision(decision)) {
            const v = decision.produce(context).value();
            return v.getValueWithUnits();
        } else {
            throw new Error(
                `Did not resolve to a "${DECISION_SPACE_VALUE}" - "${JSON.stringify(input)}".`,
            );
        }
    } else if (typeof input === 'string') {
        return {
            value: Number(input),
            units: 'px',
        };
    } else if (typeof input === 'number') {
        return {
            value: input,
            units: 'px',
        };
    } else {
        return input;
    }
};
