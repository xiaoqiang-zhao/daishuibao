<template>
<section class="upload-info-type-table">
    <section class="top-line"></section>
    <el-table
        ref="multipleTable"
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
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
            tableData: []
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {

        loadData() {
            this.$http.get('/bills').then(res => {
                this.total = res.data.total;
                this.tableData = res.data.list;
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
}
</style>
