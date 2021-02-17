<template>
    <section class="client-ducoment">
        <process-statistics/>
        <section class="common-block-section">
            <header class="top-line">
                <el-button @click="addClient" icon="el-icon-plus" type="primary">
                    新增客户
                </el-button>
            </header>
            <el-table
                ref="multipleTable"
                stripe
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    prop="serialNumber"
                    label="编号"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="companyName"
                    label="公司名">
                </el-table-column>
                <el-table-column
                    prop="industry"
                    label="所属行业"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="会计负责人"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="微信号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="营业执照号"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="纳税人类型"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="电子税务局密码"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="期初数"
                    width="70">
                </el-table-column>
                <el-table-column
                    label="客户库/供应商库"
                    width="140">
                    <template slot-scope="scope">
                        <el-button
                            @click="updateLibrary(scope.row)"
                            type="primary"
                            icon="el-icon-edit"
                            size="mini">
                            更新
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
        <additionDialog ref="additionDialog"/>
        <updateDialog ref="updateDialog" :companyData="companyData"/>
    </section>
</template>

<script>
/**
 * @file 客户档案
 */
import processStatistics from '@/components/process-statistics';
import additionDialog from './additionDialog.vue';
import updateDialog from './updateDialog.vue';

export default {
    components: {
        processStatistics,
        additionDialog,
        updateDialog
    },
    data() {
        return {
            activedName: 'a',
            total: 0,
            tableData: [],
            multipleSelection: [],
            companyData: null
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {

        loadData() {
            this.$http.get('/companies').then(res => {
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
        },

        /**
         * 打开新增客户弹框
         */
        addClient() {
            this.$refs.additionDialog.open();
        },

        updateLibrary(companyData) {
            this.companyData = companyData;
            this.$refs.updateDialog.open(companyData);
        }
    }
}
</script>

<style lang="less" scoped>
.client-ducoment {
    padding: 0 10px;
    .top-line {
        padding-bottom: 10px;
        text-align: right;
    }
    .pagination {
        text-align: right;
        padding: 20px 0 0;
    }
}
</style>
