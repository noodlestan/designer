import { type Decision, getDecisionType } from '@noodlestan/designer-decisions';
import { type StaticDecisionStore } from '@noodlestan/designer-functions';

export const resolveDecisionProp = <V>(
    store: StaticDecisionStore,
    d: string | Decision<unknown>,
    type?: string,
): Decision<V> | undefined => {
    const decision = typeof d === 'string' ? store.decision<V>({ $name: d }) : (d as Decision<V>);

    if (decision && type) {
        return getDecisionType(decision) === type ? decision : undefined;
    }
    return decision;
};
