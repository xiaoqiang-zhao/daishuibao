<template>
    <el-dialog
        v-if="companyData"
        title="更新客户库与供应商库"
        :visible.sync="dialogVisible"
        width="800px">
        <section class="top-section">
            <div>{{ companyData.companyName }}</div>
            <div class="explain">
                <div>
                    1. 请务必保证表格内公司名称与发票上名称相同，否则将影响会计凭证生成
                </div>
                <div>
                    2. 可从Excel复制内容粘贴至表格
                </div>
                <div>
                    3. 该名单将根据每月发票信息自动更新
                </div>
            </div>
        </section>
        <section class="tabs-container">
            <el-tabs value="suppliers" class="tab suppliers">
                <el-tab-pane label="供应商库" name="suppliers">
                    供应商库
                </el-tab-pane>
            </el-tabs>
            <el-tabs value="customers" class="tab customers">
                <el-tab-pane label="客户库" name="customers">
                    供应商库
                </el-tab-pane>
            </el-tabs>
        </section>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            dialogVisible: false,
            companyData: null
        };
    },
    methods: {

        /**
         * 打开弹框
         */
        open(companyData) {
            this.companyData = companyData;
            this.dialogVisible = true;
            this.loadData();
        },

        loadData() {
            this.$http.get(`/companies/${this.companyData.id}/suppliers-and-customers`).then(res => {
                console.log(res.data);
            });
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/var.less';

.top-section {
    margin-top: -20px;

    .explain {
        padding-top: 5px;
        color: @color-grey-low;
        font-size: 12px;
        line-height: 1.2em;
    }
}

.tabs-container {
    display: flex;

    .tab {
        flex: 1;
    }

    .suppliers {
        margin-right: 10px;
    }

    .customers {
        margin-left: 10px;
    }
}
</style>