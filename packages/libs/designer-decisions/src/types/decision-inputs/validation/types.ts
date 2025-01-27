import type { ErrorObject } from 'ajv';

import type { InputRecord } from '../models';

export type InputValidationError = {
    decision: InputRecord;
    error: ErrorObject;
};
