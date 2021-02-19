<template>
    <aside class="sidebar">
        <el-menu
            :default-active="activedIndex"
            router
            class="menu">
            <el-menu-item index="/companies">
                <i class="iconfont icon-document"></i>
                <span slot="title">客户档案</span>
            </el-menu-item>
            <el-menu-item index="/upload-info">
                <i class="iconfont icon-upload"></i>
                <span slot="title">信息上传</span>
            </el-menu-item>
            <el-menu-item index="/smart-bill">
                <i class="iconfont icon-smart"></i>
                <span slot="title">智能做账</span>
            </el-menu-item>
            <el-submenu index="/one-key-bill">
                <template slot="title">
                    <i class="iconfont icon-one-key"></i>
                    <span>一键报税</span>
                </template>
                <el-menu-item index="/one-key-bill">企业增值税</el-menu-item>
            </el-submenu>
            <el-menu-item index="/history">
                <i class="iconfont icon-history"></i>
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

<script>
export default {
    data() {
        // const routes = [
        //     '/client-document',
        //     '/upload-info',
        //     '/smart-bill',
        //     '/one-key-bill',
        //     '/history'
        // ];

        return {
            activedIndex: null
            // routes
        };
    },

    watch: {
        $route() {
            this.activedIndex = this.$route.path;
            // this.routes.some(item => {
            //     if (item === this.$route.path) {
            //         this.activedIndex = item;
            //         console.log(item);
            //         return true;
            //     }
            // });
        }
    },

    mounted() {
        // 由于此组件不在 router-view 中，无法及时获取 route 信息
        // 所以要放在 $nextTick 中执行
        // this.$nextTick(() => {
        //     console.log(this.routes, this.$route.path);
        //     this.routes.some(item => {
        //         // console.log(this.$route.path);
        //         if (item === this.$route.path) {
        //             this.activedIndex = item;
        //             console.log(item);
        //             return true;
        //         }
        //     });
        // });
    },
    methods: {

        /**
         * 菜单选中
         *
         * @param {Number} index 索引值
         */
        // selectMenuItem(index) {
        //     if (this.activedIndex !== index) {
        //         this.activedIndex = index;
        //         this.$router.push(this.routes[index]);
        //     }
        // }
    }
}
</script>
<style lang="less" scoped>
.sidebar {
    flex: 0 0 138px;
    background: #fff;
    .menu {
        // margin-top: 1px;
        // height: calc(100% - 2px);
        height: 100%;
    }
    .icon-upload,
    .icon-one-key {
        font-size: 20px;
    }
}
</style>
