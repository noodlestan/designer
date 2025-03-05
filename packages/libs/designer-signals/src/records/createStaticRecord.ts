import type { DecisionInput, LoadedRecord } from '@noodlestan/designer-decisions';

export const createStaticRecord = (input: DecisionInput): LoadedRecord => {
    return {
        input,
        source: {
            name: '<static>',
            source: {
                type: 'path',
                path: '.',
            },
        },
    };
};
