/**
 * @file 基本配置
 *
 * @author zxq
 * @date 2021-02-11
 */

'use strict';
const path = require('path');
const mockMiddleware = require('../build/mock-middleware');

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '/api': {
        //         // 联调环境
        //         // target: 'http://10.64.232.244:8802',
        //         filter: (pathname, req) => {
        //             return req.headers['x-requested-with'];
        //         }
        //     }
        // },
        host: '127.0.0.1',
        port: 8898,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        cacheBusting: true,
        cssSourceMap: true,
        after(app) {
            app.use(mockMiddleware);
        }
    },

    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
};
