import { type Decision } from '@noodlestan/designer-decisions';
import { type StaticDecisionStore } from '@noodlestan/designer-functions';

export const resolveDecisionProp = <V>(
    store: StaticDecisionStore,
    d: string | Decision<unknown>,
): Decision<V> | undefined => {
    return typeof d === 'string' ? store.decision<V>({ $name: d }) : (d as Decision<V>);
};
