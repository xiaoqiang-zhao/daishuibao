/**
 * @file 主文件
 *
 * @author zxq
 * @date 2021-02-10
 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import utiles from '@/components/utiles';
import elementUI from 'element-ui';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(elementUI);
let errorMark = false;

axios.interceptors.request.use((config) => {
    config.url = '/api' + config.url;
    const currentUser = utiles.getCurrentUser();
    if (currentUser) {
        config.data = config.data || {};
        config.data.bName = currentUser.bCompanyName;
    }

    return config;
});

axios.interceptors.response.use(res => {
    res.status = Number(res.status);
    const data = res.data;

    if (res.status === 200) {
        if (data.data === null) {
            data.data = {};
        }

        if (data.code !== 0) {
            // 2 秒后跳转到登陆页
            if (data.code === 1) {
                data.messageChs = '登录超时，2 秒后跳转到登陆页';
                utiles.setCurrentUser(null);

                setTimeout(() => {
                    vue.$router.replace({
                        path: '/login'
                    });
                    window.location.reload();
                }, 2000);
            }

            vue.$message({
                message: data.messageChs,
                type: 'error'
            });
            return Promise.reject(data);
        }
        return data;
    }

    return Promise.reject(data);
}, error => {
    const errorCode = [500, 502];
    if (errorCode.includes(error.response.status) && !errorMark) {
        vue.$alert('重启后，请刷新当前页面，再进行操作', '服务异常，请重启', {
            confirmButtonText: '知道了'
        });
        errorMark = true;
    }
    return Promise.reject(error);
});

router.beforeEach(function(to, from, next) {
    // 未找到匹配页面
    const isLogined = utiles.getCurrentUser() !== null;
    const noLoginedPagesPath = [
        '/login'
    ];
    // 登录状态下默认到 “A页”
    if (isLogined) {
        if (to.path === '/' || noLoginedPagesPath.indexOf(to.path) !== -1) {
            next({
                replace: true,
                path: '/companies'
            });
        }
        else {
            next();
        }
    }
    // 非登陆状态下，noLoginedPagesPath 以外的一面只能到登陆页
    else {
        if (noLoginedPagesPath.indexOf(to.path) === -1) {
            next({
                path: '/login'
            });
        }
        else {
            next();
        }
    }

    // 404 页面
    if (to.matched.length === 0) {
        next({
            path: '/page-404',
            query: {
                fromPath: to.path
            }
        });
    }
});

/* eslint-disable no-new */
const vue = new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});
