<template>
    <header class="header-bar">
        <div class="left-logo-container">
            <div class="logo-container">
                <img src="/static/img/logo-white.png" alt="">
                <span class="text">代税宝</span>
            </div>
            <div class="text">用最前沿的人工智能技术，为代账公司提供最专业的自动化服务</div>
        </div>
        <div class="text">
            当前日期: {{currentDate}}
            <template v-if="day">
                <span class="left">距离下一次报税截止时间还有</span> {{day}} <span class="right">天</span>
            </template>
            <template v-else>
                今天可报税
            </template>
        </div>
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
    color: #fff;
    text-align: right;
    background: #323241;

    .left-logo-container {
        padding: 0 10px;
        float: left;
        line-height: 1.3em;
        text-align: left;
        cursor: pointer;

        .logo-container {
            padding-top: 4px;

            img {
                width: 36px;
            }
            .text {
                display: inline-block;
                margin-left: 6px;
                padding-left: 8px;
                border-left: 1px solid #666;
                font-size: 18px;
                line-height: 16px;
                vertical-align: 7px;
                color: #fff;
            }
        }

        > .text {
            font-size: 12px;
            color: #828282;
        }
    }

    > .text {
        display: inline-block;
        margin: 0 20px;
        line-height: 1.5em;
        vertical-align: middle;
        span {
            color: #828282;
        }
        .left {
            margin-left: 30px;
        }
    }

    .user-section {
        padding: 0 10px;
        margin: 15px 0;
        border-left: 1px solid #989898;
        line-height: 30px;
        color: #fff;
        cursor: pointer;
        
        .el-icon-user {
            padding: 4px;
            border: 1px solid #fff;
            border-radius: 24px;
        }
    }
}
</style>