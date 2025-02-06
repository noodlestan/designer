// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ShowColorChannelValue } from './ShowColorChannelValue.astro';
export { default as ShowColorChannelViz } from './ShowColorChannelViz.astro';
export { default as ShowColorValue } from './ShowColorValue.astro';
export { default as ShowColorViz } from './ShowColorViz.astro';
