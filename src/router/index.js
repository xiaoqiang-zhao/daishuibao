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
        // 信息上传
        {
            path: '/upload',
            component: () => import('@/pages/upload')
        },
        // 智能做账
        {
            path: '/smart-bill',
            component: () => import('@/pages/smartBill')
        },
        // 一键报税
        {
            path: '/one-key-bill',
            component: () => import('@/pages/oneKeyBill')
        },
        // 历史记录
        {
            path: '/history',
            component: () => import('@/pages/history')
        },
        // 页面未找到
        {
            path: '/page-404',
            component: () => import('@/pages/page-404')
        }
    ]
});
