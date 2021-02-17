<template>
<section class="upload-info-type-table">
    <section class="top-line">
        <el-button
            v-if="!isCheckStatus"
            @click="isCheckStatus = true"
            icon="el-icon-edit"
            type="primary">
            批量核对
        </el-button>
        <template v-else>
            <el-button @click="checkBilles" type="primary">
                确认
            </el-button>
            <el-button @click="isCheckStatus = false" type="primary" plain>
                返回
            </el-button>
        </template>
    </section>
    <el-table
        ref="multipleTable"
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
            v-if="isCheckStatus"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="编号"
            width="120">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column
            prop="companyName"
            label="公司名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="industry"
            label="所属行业">
        </el-table-column>
        <el-table-column
            prop="address"
            label="会计负责人">
        </el-table-column>
        <el-table-column
            prop="address"
            label="手机号">
        </el-table-column>
        <el-table-column
            prop="address"
            label="微信号">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
        </el-table-column>
        <el-table-column
            label="操作"
            width="250">
            <template slot-scope="scope">
                <el-button
                    v-if="scope.row.status === 1"
                    type="primary"
                    icon="el-icon-upload"
                    size="mini">
                    上传资料
                </el-button>
                <el-button
                    v-if="scope.row.status === 3"
                    type="success"
                    icon="el-icon-tickets"
                    size="mini">
                    查看详情
                </el-button>
                <el-button
                    v-if="scope.row.status === 3"
                    type="warning"
                    icon="el-icon-s-claim"
                    size="mini">
                    强制做账
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        class="pagination">
    </el-pagination>
</section>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            activedName: 'a',
            total: 0,
            tableData: [],
            isCheckStatus: false
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {

        /**
         * 加载数据
         */
        loadData() {
            this.$http.get('/bills').then(res => {
                this.total = res.data.total;
                this.tableData = res.data.list;
            });
        },

        /**
         * 发起批量核对状态
         */
        checkBilles() {
            // this.isCheckStatus = true;

            this.$confirm(
                '账务核对需要在电子税务局上取数，因此请保证办税人手机已经和电脑连接，否则将无法进入流程！',
                '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    customClass: 'checking-bill',
                    lock: true,
                    text: '核对中，请稍等...',
                    spinner: 'el-icon-loading',
                    // spinner: 'iconfont icon-jindutiao1',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    // loading.close();
                    debugger
                    loading.text = '核对中，请稍等...  37/209';
                }, 2000);
            });

        },

        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            }
            else {
                this.$refs.multipleTable.clearSelection();
            }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>

<style lang="less" scoped>
.upload-info-type-table {
    padding: 0 10px;
    .top-line {
        padding-bottom: 10px;
    }
    .pagination {
        text-align: right;
        padding: 20px 0 0;
    }
    .checking-bill {
        font-size: 50px;
    }
}
</style>
<style lang="less">
.checking-bill .el-icon-loading {
    font-size: 50px;
}
</style>
