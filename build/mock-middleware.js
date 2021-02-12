/**
 * @file 本地和远程数据模拟模块
 *
 * @author zxq
 * @date 2021-02-11
 */

const fs = require('fs');
const path = require('path');
const mockRoot = path.resolve(__dirname, '../mock/') + '/';

/**
 * 解析URL参数
 *
 * @param {string} url 地址
 * @return {Object} URL参数对象
 */
function parseParam(url) {
    url = url.split('?')[1];
    if (!url) {
        return {};
    }

    const params = url.split('#')[0].split('&');
    const query = {};
    for (let i = 0; i < params.length; i++) {
        const item = params[i].split('=');
        if (item.length === 2) {
            query[item[0]] = decodeURIComponent(item[1]);
        }
    }
    return query;
}

function mockJsFile(uri, req, res) {
    console.log('本地模拟数据:', uri.replace(mockRoot, ''));

    const mock = require(uri);
    if (typeof mock === 'function') {
        const param = req.method.toUpperCase() === 'POST'
            ? req.body : parseParam(req.url);

        const result = require(uri).call(this, param || {}, req, res);
        if (result.next && typeof result.next === 'function') {
            res.send(require(uri).call(this, param || {}, req, res));
        }
        else {
            res.send(result);
        }
    }
    else {
        res.send(mock);
    }

    delete require.cache[require.resolve(uri)];
}

module.exports = function(req, res, next) {
    const base = mockRoot + req.url.split('?')[0];
    const files = ['.js', '.json', '/index.js', '/index.json', ''];

    let i;
    for (i = 0; i < files.length; i++) {
        const uri = base + files[i];
        if (fs.existsSync(uri) && fs.statSync(uri).isFile()) {
            if (/\.js$/.test(uri)) {
                mockJsFile(uri, req, res);
            }
            else {
                console.log('本地模拟数据:', uri.replace(mockRoot, ''));
                res.send(fs.readFileSync(uri, {
                    encoding: 'utf8'
                }));
            }
            break;
        }
    }
    if (i === files.length) {
        next();
    }
};
