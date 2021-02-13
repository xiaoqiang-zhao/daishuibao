/**
 * @file 路由文件
 *
 * @author zxq
 * @date 2021-02-11
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/pages/',
    routes: [
        {
            path: '/',
            component: () => import('@/pages/login')
        },
        // 登录
        {
            path: '/login',
            component: () => import('@/pages/login')
        },
        // 客户档案
        {
            path: '/client-document',
            component: () => import('@/pages/clientDocument')
        },
        // 页面未找到
        {
            path: '/page-404',
            component: () => import('@/pages/page-404')
        }
    ]
});
