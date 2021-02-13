<template>
    <aside class="sidebar">
        <div class="brand">
            <img src="/static/img/logo.png" alt="logo" />
            <h1 class="title">
                代账宝
                <!-- 代账宝智能财务系统 -->
            </h1>
        </div>
        <el-menu
            default-active="1"
            class="menu">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">客户档案</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">信息上传</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">智能做账</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">一键报税</span>
            </el-menu-item>
            <el-menu-item index="5">
                <i class="el-icon-menu"></i>
                <span slot="title">历史记录</span>
            </el-menu-item>
            <!-- <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            -->
        </el-menu>
    </aside>
</template>


<style lang="less" scoped>
.sidebar {
    flex: 0 0 256px;
    background: #fff;
    .brand {
        height: 60px;
        line-height: 60px;
        padding: 0 16px;
        overflow: hidden;
        box-shadow: 0 1px 0 0 rgb(0 0 0 / 4%);
        border-right: solid 1px #e6e6e6;
        border-bottom: solid 1px #e6e6e6;
        > img {
            margin-top: -8px;
            height: 32px;
            vertical-align: middle;
        }
        > h1 {
            display: inline-block;
            padding: 0;
            margin: 0 0 0 12px;
            font-size: 20px;
            font-weight: 700;
            line-height: 60px;
            color: rgba(0, 0, 0, 0.65);
        }
    }
    .menu {
        margin-top: 1px;
        height: calc(100% - 62px);
    }
}
</style>
