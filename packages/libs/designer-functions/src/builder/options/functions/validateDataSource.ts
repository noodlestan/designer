import type { DataSource, DataSourcePackage, DataSourcePath } from '@noodlestan/designer-decisions';

import type { DeepPartial } from '../../../private';
import { isNonEmptyString } from '../../../private/validate/isNonEmptyString';
import { isObject } from '../../../private/validate/isObject';
import { createBuilderOptionsError } from '../../errors';
import type { BuilderError } from '../../types';

export const validateDataSource = (
    path: string,
    addError: (error: BuilderError) => void,
    source: DeepPartial<DataSource> | undefined,
): DataSource | undefined => {
    if (!isObject(source)) {
        const error = createBuilderOptionsError({
            path,
            reason: 'must be a DataSource object',
            options: source,
        });
        addError(error);
        return undefined;
    }

    if (!isNonEmptyString(source.type)) {
        const error = createBuilderOptionsError({
            path: `${path}.type`,
            reason: 'must be a non-empty string',
            options: source.type,
        });
        addError(error);
        return undefined;
    }

    if (!isNonEmptyString(source.path)) {
        const error = createBuilderOptionsError({
            path: `${path}.path`,
            reason: 'must be a non-empty string',
            options: source.path,
        });
        addError(error);
        return undefined;
    }

    if (source.type === 'path') {
        return source as DataSourcePath;
    }

    if (source.type === 'package') {
        if (!isNonEmptyString(source.package)) {
            const error = createBuilderOptionsError({
                path: `${path}.package`,
                reason: 'must be a non-empty string',
                options: source.package,
            });
            addError(error);
            return undefined;
        }

        return source as DataSourcePackage;
    }

    const error = createBuilderOptionsError({
        path,
        reason: 'Unknown data source type.',
        options: source,
    });
    addError(error);
    return undefined;
};
