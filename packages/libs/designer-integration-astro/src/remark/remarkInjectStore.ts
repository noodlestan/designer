import type { Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx';
import type { Plugin } from 'unified';

import type { MdxEsmRoot } from '../private';
import {
    createIdentifier,
    createJsxAttribute,
    createMdxjsEsm,
    findShowComponents,
    hasExport,
    nodeHasAttribute,
} from '../private';
import { hasImport } from '../private/ast/hasImport';

function injectImports(tree: MdxEsmRoot): void {
    if (!hasImport(tree, 'astro:content')) {
        const importAstroContent = createMdxjsEsm("import 'astro:content'");
        tree.children.unshift(importAstroContent);
    }
    if (!hasImport(tree, 'integrationAPI')) {
        const inportIngegrationAPI = createMdxjsEsm(
            "import { integrationAPI } from '@noodlestan/designer-integration-astro';",
        );
        tree.children.unshift(inportIngegrationAPI);
    }
}

function injectStoreDeclaration(tree: MdxEsmRoot): void {
    if (hasExport(tree, 'store')) {
        return;
    }
    const storeDeclaration = createMdxjsEsm('export const store = await integrationAPI.build();');
    const lastImportIndex = [...tree.children]
        .reverse()
        .findIndex(node => node.type === 'mdxjsEsm');

    tree.children.splice(tree.children.length - lastImportIndex, 0, storeDeclaration);
}

function injectStoreProp(node: MdxJsxFlowElement): void {
    if (!nodeHasAttribute(node, 'store')) {
        const identifier = createIdentifier('store');
        const store = createJsxAttribute('store', identifier);
        node.attributes.push(store);
    }
}

/**
 * Remark plugin to:
 *  - Inject two imports at the top:
 *      - import 'astro:content';
 *      - import { integrationAPI } from '@noodlestan/designer-integration-astro';
 *  - Add `export const store = await integrationAPI.build();` after all the imports.
 *  - Inject the `store={store}` prop in all components that start with <Show... />.
 */
export const remarkInjectStore: Plugin<[], Root> = function () {
    return function (tree: Root): void {
        const showComponents = findShowComponents(tree);

        if (showComponents.length) {
            injectImports(tree);
            injectStoreDeclaration(tree);
            showComponents.forEach(component => injectStoreProp(component));
        }
    };
};
