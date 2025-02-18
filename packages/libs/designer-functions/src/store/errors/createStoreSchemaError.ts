import type { DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { StoreSchemaError } from '../types';

import { ERROR_STORE_SCHEMA } from './constants';

type Attributes = DesignerErrorParams<StoreSchemaError>;

export const createStoreSchemaError = (attributes: Attributes): StoreSchemaError => {
    const { id, reason } = attributes || {};

    const message = () => {
        return `Invalid schema "${id}". ${reason}`;
    };

    return {
        name: ERROR_STORE_SCHEMA,
        id,
        reason,
        message,
    };
};
