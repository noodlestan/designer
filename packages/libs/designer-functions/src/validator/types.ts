import type { LoadedRecord, ValidatedRecord } from '@noodlestan/designer-decisions';

import type { SchemaData } from '../schemas';

export type DecisionValidator = {
    schemas: () => SchemaData[];
    validate: (partial: LoadedRecord) => ValidatedRecord;
};
