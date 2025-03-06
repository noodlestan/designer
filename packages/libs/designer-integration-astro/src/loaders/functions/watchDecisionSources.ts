import { resolveDecisionWatchPaths } from '@noodlestan/designer-functions';
import type { LoaderContext } from 'astro/loaders';

import { integrationAPI } from '../../api';

import { produceAndReport } from './produceAndReport';

type LoaderState = {
    count: number;
    paths: string[];
};

/**
 * This function implements a loader for an Astro collection
 *
 * It was only created because it provides access to the both
 * - the watcher (so we can register our )
 * - a way to trigger an update on the context collection
 *
 * What does it do?
 * 1) constructor
 * - acquires the file paths to watch (from the config) and adds them to the watcher
 * 2) on watcher notification: if the updated file is one of the watched data files:
 * - increment a counter on the collection (triggers page re-rendering)
 * - produceAndReport (logs all validation errors)
 *
 * What does it NOT do?
 * - guarantee that the page is refresh. this requires that Astro detects that the MDX
 *   page depends on the content layer. For that we rely on the remarkInjectStore()
 *   remark plugin which injects the `import 'astro:content'`
 */
export async function watchDecisionSources(loaderCtx: LoaderContext): Promise<void> {
    const { config, context, build } = integrationAPI;

    const state: LoaderState = {
        count: 0,
        paths: [],
    };
    const { logger, watcher, store: contentStore } = loaderCtx;

    state.paths = await resolveDecisionWatchPaths(config.store);

    state.paths.forEach(path => {
        logger.debug('watching: ' + path);
        watcher?.add(path);
    });

    watcher?.on('change', updated => {
        if (updated.endsWith('.json') && !updated.includes('.astro')) {
            produceAndReport(loaderCtx, context, build);
            contentStore.set({ id: '1', data: { count: state.count++ } });
            logger.info('Updated:' + updated);
        }
    });
}
