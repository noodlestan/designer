import type { DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { BuilderUnexpectedError } from '../types';

import { ERROR_BUILDER_UNEXPECTED } from './constants';

type Attributes = DesignerErrorParams<BuilderUnexpectedError>;

export const createBuilderUnexpectedError = (attributes?: Attributes): BuilderUnexpectedError => {
    const { error } = attributes || {};

    const message = () => {
        return `Unexpected store error.`;
    };

    return {
        name: ERROR_BUILDER_UNEXPECTED,
        error,
        message,
    };
};
