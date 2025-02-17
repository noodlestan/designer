import type { DataSource, DataSourcePackage, DataSourcePath } from '@noodlestan/designer-decisions';

import type { DeepPartial } from '../../../private';
import { isNonEmptyString } from '../../../private/validate/isNonEmptyString';
import { isObject } from '../../../private/validate/isObject';
import { createOptionsError } from '../../errors';
import type { StoreError } from '../../types';

export const validateDataSource = (
    path: string,
    addError: (error: StoreError) => void,
    source: DeepPartial<DataSource> | undefined,
): DataSource | undefined => {
    if (!isObject(source)) {
        const error = createOptionsError({
            path,
            reason: 'Data source is not an object.',
            options: source,
        });
        addError(error);
        return undefined;
    }

    if (!isNonEmptyString(source.type)) {
        const error = createOptionsError({
            path: `${path}.type`,
            reason: 'Must be a non-empty string.',
            options: source.type,
        });
        addError(error);
        return undefined;
    }

    if (!isNonEmptyString(source.path)) {
        const error = createOptionsError({
            path: `${path}.path`,
            reason: 'Must be a non-empty string.',
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
            const error = createOptionsError({
                path: `${path}.package`,
                reason: 'Must be a non-empty string.',
                options: source.package,
            });
            addError(error);
            return undefined;
        }

        return source as DataSourcePackage;
    }

    const error = createOptionsError({
        path,
        reason: 'Unknown data source type.',
        options: source,
    });
    addError(error);
    return undefined;
};
