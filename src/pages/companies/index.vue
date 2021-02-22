<template>
    <section class="client-ducoment">
        <process-statistics/>
        <section class="common-block-section">
            <header class="top-line">
                <el-button @click="openDialog(null)" icon="el-icon-plus" type="primary">
                    新增客户
                </el-button>
                <div class="search-section">
                    <el-input
                        placeholder="请输入公司名称进行查询"
                        v-model="companyName"
                        @keyup.enter.native="search"
                        @clear="search"
                        size="mini"
                        suffix-icon="el-icon-search"
                        clearable>
                    </el-input>
                    <el-select
                        v-model="industry"
                        @change="search"
                        @clear="search"
                        clearable
                        size="mini"
                        placeholder="请选择行业">
                        <el-option
                            v-for="item in industryList"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="payTaxesType"
                        @change="search"
                        @clear="search"
                        clearable
                        size="mini"
                        placeholder="请选择纳税人类型">
                        <el-option
                            v-for="(item, index) in payTaxesTypeList"
                            :key="item"
                            :label="item"
                            :value="index">
                        </el-option>
                    </el-select>
                </div>
            </header>
            <el-table
                stripe
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
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
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="accountingManager"
                    label="会计负责人"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="weChartAccount"
                    label="微信号">
                </el-table-column>
                <el-table-column
                    prop="businessLicenseNumber"
                    label="营业执照号"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="payTaxesType"
                    label="纳税人类型"
                    width="120">
                    <template slot-scope="scope">
                        {{ payTaxesTypeList[scope.row.payTaxesType] }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="password"
                    label="电子税务局密码">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button
                            @click="openDialog(scope.row)"
                            type="primary"
                            icon="el-icon-edit"
                            size="mini">
                            更新
                        </el-button>
                        <el-button
                            @click="deleteCompany(scope.row)"
                            type="danger"
                            icon="el-icon-delete"
                            size="mini">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                @current-change="currentPageChange"
                class="pagination">
            </el-pagination>
        </section>
        <company-dialog ref="dialog" @add="add" @modify="modify"/>
    </section>
</template>

<script>
/**
 * @file 客户档案
 */
import map from '@/components/map';
import processStatistics from '@/components/process-statistics';
import dialog from './dialog.vue';

export default {
    components: {
        processStatistics,
        companyDialog: dialog
    },
    data() {
        return {
            companyName: '',
            industry: '',
            payTaxesType: '',
            industryList: map.industryList,
            payTaxesTypeList: map.payTaxesTypeList,
            total: 0,
            tableData: [],
            multipleSelection: [],
            currentPage: 1,
            pageSize: 20
        };
    },
    mounted() {
        this.currentPageChange(1);
    },
    methods: {

        /**
         * 打开弹框
         * 
         * @param {Object} companyData 编辑时公司数据，新建时为 null
         */
        openDialog(companyData) {
            this.$refs.dialog.open(companyData);
        },

        /**
         * 翻页触发
         *
         * @param {Number} pageNumber 页码
         */
        currentPageChange(pageNumber) {
            // 获取搜索条件
            const queryData = {
                companyName: this.companyName,
                industry: this.industry,
                payTaxesType: this.payTaxesType,
                pageSize: this.pageSize,
                pageNumber
            };

            this.$http.get('/companies', {
                params: queryData
            }).then(res => {
                this.total = res.data.total;
                this.tableData = res.data.list;
            });
        },

        /**
         * 搜索
         */
        search() {
            this.pageNumber = 1;
            this.currentPageChange(1);
        },

        /**
         * 删除公司
         *
         * @param {Object} row 行数据
         */
        deleteCompany(row) {
            this.$confirm('此操作将删除该客户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.postDelete(row.companyName);
            });
        },

        /**
         * 发送删除请求
         * @param {String} companyName 公司名称
         */
        postDelete(companyName) {
            this.$http.post('/company/delete', {
                companyName: companyName
            }).then(res => {
                if (res.data.isSuccess) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 移除一条数据
                    this.tableData.some((item, index) => {
                        if (item.companyName === companyName) {
                            this.tableData.splice(index, 1);
                            return true;
                        }
                    });
                }
                else {
                    this.$message({
                        type: 'error',
                        message: '删除未成功，请稍后再试!'
                    });
                }
            });
        },

        /**
         * 添加一行
         * 
         * @param {Object} 一行数据
         */
        add(data) {
            this.tableData.push(data);
        },

        /**
         * 修改一行
         * 
         * @param {Object} 一行数据
         */
        modify(data) {
            this.tableData.some((item, index) => {
                if (item.companyName === data.companyName) {
                    // 替换字段
                    for(let key of Object.keys(this.tableData[index])) {
                        if (key !== 'serialNumber') {
                            this.tableData[index][key] = data[key];
                        }
                    }
                    return true;
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.client-ducoment {
    padding: 0 10px;
    .top-line {
        padding-bottom: 10px;
        .search-section {
            float: right;
            width: 360px;
            text-align: right;
            .el-select {
                margin-top: 2px;
            }
        }
    }
    .pagination {
        text-align: right;
        padding: 20px 0 0;
    }
}
</style>
