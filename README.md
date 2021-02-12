# 代驾宝

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 当前项目相关

### favicon.ico

```html
<link rel="shortcut icon" type="image/x-ico" href="/static/favicon.ico">
```

图标已经在 iconfont 中收藏。

### iconfont

### 前端测试静态资源路径

Nginx 代理配置:
```config
location \.(html|gif|jpg|png|js|css)$ {
    proxy_pass http://132.32.32.32:8001;
}
```
