<template>
    <el-table
        ref="multipleTable"
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
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
            prop="name"
            label="公司名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="电子税务局账号">
        </el-table-column>
    </el-table>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            activedName: 'a',
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }],
            multipleSelection: []
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {

        loadData() {
            this.$http.get('/documents').then(res => {

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
.client-ducoment {
    padding: 0 10px;
}
</style>
