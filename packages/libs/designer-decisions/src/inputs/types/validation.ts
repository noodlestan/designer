import type { ErrorObject } from 'ajv';

import type { InputRecord } from './primitives/record';

export type InputValidationError = {
    decision: InputRecord;
    error: ErrorObject;
};
