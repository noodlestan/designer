import {
    DECISION_SPACE_VALUE,
    isSpaceScaleDecision,
    isSpaceValueDecision,
} from '../../../decision';
import type { DecisionRef, SpaceWithUnits, ValueContext } from '../../../types';

export const resolveSpaceValueRef = (context: ValueContext, ref: DecisionRef): SpaceWithUnits => {
    // const resolution = context.resolve();
    const decision = context.resolve(ref);

    // WIP if (!decision)
    if (!decision) {
        // push to context.errors ?
        throw new Error(`Could not find decision by ref "${JSON.stringify(ref)}".`);
    }
    if (isSpaceValueDecision(decision)) {
        const v = decision.produce(context).value();
        return v.getValueWithUnits();
    } else if (isSpaceScaleDecision(decision)) {
        const scale = decision.produce(context).value();
        const v = scale.get()[ref.index || 0];
        return v.getValueWithUnits();
    } else {
        throw new Error(
            `Did not resolve to a "${DECISION_SPACE_VALUE}" - "${JSON.stringify(ref)}".`,
        );
    }
};
