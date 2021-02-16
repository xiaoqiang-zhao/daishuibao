<template>
    <el-dialog
        title="更新客户库与供应商库"
        :visible.sync="dialogVisible"
        width="500">
        <span>这是表单</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        /**
         * 打开弹框
         */
        open() {
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="less" scoped>

</style>