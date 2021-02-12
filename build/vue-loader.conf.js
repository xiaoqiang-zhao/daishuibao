/**
 * @file loader config
 *
 * @author zxq
 * @date 2021-02-11
 */

'use strict';
const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap;

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: isProduction
    }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
};
