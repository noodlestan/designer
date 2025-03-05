import type { Store } from '@noodlestan/designer-decisions';

import type { ReactiveMap } from '../records';

export type ReactiveStore = Store & {
    insertRecord: ReactiveMap['insertRecord'];
    updateRecord: ReactiveMap['updateRecord'];
};
