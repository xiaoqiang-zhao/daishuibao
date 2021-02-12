/**
 * @file 开发版本设置
 *
 * @author zxq
 * @date 2021-02-11
 */

'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
});
