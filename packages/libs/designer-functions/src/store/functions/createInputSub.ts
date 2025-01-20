import type { DecisionInputBase, DecisionRef } from '@noodlestan/designer-decisions';

export const createInputSub = (ref?: DecisionRef): DecisionInputBase => {
    const $uuid = ref && '$uuid' in ref ? ref.$uuid : '<uuid>';
    const $name = ref && '$name' in ref ? ref.$name : '<unknown>';
    return {
        uuid: $uuid,
        model: 'unknown',
        name: $name,
        params: {},
    };
};
