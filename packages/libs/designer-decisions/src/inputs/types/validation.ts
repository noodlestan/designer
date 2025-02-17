import type { ErrorObject } from 'ajv';

import type { InputRecord } from './record';

export type InputValidationError = {
    decision: InputRecord;
    error: ErrorObject;
};
