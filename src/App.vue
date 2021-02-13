<template>
<div class="page-root">
    <!-- 已登录 -->
    <template v-if="isLogined">
        <sidebar/>
        <main class="main-container">
            <header>头</header>
            <router-view></router-view>
        </main>
    </template>
    <!-- 未登录 - 登陆页 -->
    <router-view v-else @userStatusChange="userStatusChange"></router-view>
</div>
</template>

<script>
/**
 * @file 首页文件
 *
 * @author zxq
 */

import '@/assets/iconfont/iconfont.css';
// iconfont
import '@/assets/base.less';
// 常用组件的样式
import 'element-ui/lib/theme-chalk/alert.css';
import 'element-ui/lib/theme-chalk/breadcrumb.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/card.css';
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/form.css';
import 'element-ui/lib/theme-chalk/loading.css';
import 'element-ui/lib/theme-chalk/menu.css';
import 'element-ui/lib/theme-chalk/submenu.css';
import 'element-ui/lib/theme-chalk/message-box.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/pagination.css';
import 'element-ui/lib/theme-chalk/popover.css';
import 'element-ui/lib/theme-chalk/switch.css';
import 'element-ui/lib/theme-chalk/table.css';
import 'element-ui/lib/theme-chalk/table-column.css';
import 'element-ui/lib/theme-chalk/tabs.css';

import utiles from '@/components/utiles';
import sidebar from '@/components/sidebar';

export default {
    name: 'App',
    components: {
        sidebar
    },
    data() {
        return {
            // 是否已登录
            isLogined: utiles.getCurrentUser() !== null
        };
    },
    mounted() {
    },
    methods: {

        /**
         * 用户登录状态改变
         * 
         * @param {Boolean} status false: 退出登录，true: 登录成功
         */
        userStatusChange(status) {
            this.isLogined = status;
        }

    }
};
</script>

<style lang="less" scoped>
.page-root {
    display: flex;
    min-height: 100vh;
    background: rgba(0, 0, 0, .03);
    .main-container {
        flex: 1;
    }
}
</style>