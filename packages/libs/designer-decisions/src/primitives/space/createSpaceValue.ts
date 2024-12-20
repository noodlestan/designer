import { DECISION_SPACE_VALUE, isSpaceValueDecision } from '../../decision';
import type {
    DecisionRef,
    SpaceInput,
    SpaceValue,
    SpaceWithUnitsInput,
    ValueContext,
} from '../../types';

const isDecisionRef = (data: unknown): data is DecisionRef => {
    return typeof data === 'object' && data !== null && ('$name' in data || '$id' in data);
};

const resolveSpaceValue = (context: ValueContext, input: SpaceInput): SpaceWithUnitsInput => {
    if (isDecisionRef(input)) {
        // WIP - pass contexts down to resolver
        // const resolution = context.resolver(input, context.contexts);
        const decision = context.resolve(input);

        // WIP if (!decision)
        if (!decision) {
            // push to context.errors ?
            throw new Error(`Could not find decision by ref "${JSON.stringify(input)}".`);
        }
        // WIP // validate against [DECISION_SPACE_VALUE]
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

export const createSpaceValue = (context: ValueContext, input: SpaceInput): SpaceValue => {
    const value = resolveSpaceValue(context, input);

    return {
        get: () => String(value.value) + value.units,
        getValueWithUnits: () => value,
    };
};
