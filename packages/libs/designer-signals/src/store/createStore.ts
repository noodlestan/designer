import type { ReactiveMap } from '../records';

import type { ReactiveStore } from './types';

export const createStore = (validatedMap: ReactiveMap): ReactiveStore => {
    const store = createStore(validatedMap);

    return {
        ...store,
        insertRecord: validatedMap.insertRecord,
        updateRecord: validatedMap.updateRecord,
    };
};
