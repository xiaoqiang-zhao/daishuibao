<template>
    <header class="header-bar">
        <div class="left-icon-container">
            <i class="iconfont icon-to-left"></i>
        </div>
        <span>
            当前日期: {{currentDate}}，
            <template v-if="day">
                距离下一次报税截止时间还有 {{day}} 天
            </template>
            <template v-else>
                今天可报税
            </template>
        </span>
        <el-dropdown @command="logout" class="user-section">
            <span class="el-dropdown-link">
                <i class="el-icon-user"></i>
                用户名
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>注销登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </header>
</template>
<script>

import utiles from '@/components/utiles';

export default {
    data() {
        const currentDate = new Date();
        const endDate = new Date();
        let date = currentDate.getDate();

        if (endDate.getMonth() === 11) {
            endDate.setFullYear(endDate.getFullYear() + 1);
            endDate.setMonth(0);
        }
        else if (date > 15) {
            endDate.setMonth(endDate.getMonth() + 1);
        }
        endDate.setDate(15);
        
        const time = endDate.getTime() - currentDate.getTime();
        const day = Number.parseInt(time / (1000 * 60 * 60 * 24));
        return {
            currentDate: utiles.formateDate(),
            day
        };
    },
    methods: {

        /**
         * 退出登录
         */
        logout() {
            utiles.setCurrentUser(null);
            this.$emit('userStatusChange', false);
        }
    }
}
</script>
<style lang="less" scoped>
@import '../assets/var.less';
.header-bar {
    position: relative;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgba(0,0,0,.09);
    color: rgba(0,0,0,.65);
    text-align: right;
    background: #fff;

    .left-icon-container {
        padding: 0 16px;
        float: left;
        cursor: pointer;

        .iconfont {
            font-size: 18px;
        }

        &:hover .iconfont {
            color: rgba(0, 0, 0, .85);
        }
    }

    > span {
        display: inline-block;
        margin: 0 20px;
        line-height: 1.5em;
        vertical-align: middle;
    }

    .user-section {
        padding: 0 10px;
        cursor: pointer;
        &:hover {
            background: #e6f7ff;
        }
    }
}
</style>