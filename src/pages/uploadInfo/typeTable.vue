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
                v-model="status"
                @change="search"
                @clear="search"
                clearable
                size="mini"
                placeholder="请选择状态">
                <el-option
                    v-for="item in accountStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
    </section>
    <el-table
        ref="multipleTable"
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column
            v-if="isCheckStatus"
            type="selection"
            label="全选"
            width="55">
        </el-table-column>
        <el-table-column
            prop="serialNumber"
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
            prop="accountingManager"
            label="会计负责人">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机号">
        </el-table-column>
        <el-table-column
            prop="weChartAccount"
            label="微信号">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
            {{getStatusText(scope.row.status)}}
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="250">
            <template slot-scope="scope">
                <template v-if="scope.row.status === 1">
                    <el-button
                        type="primary"
                        icon="el-icon-upload"
                        size="mini"
                        @click="toDetail(scope.row, 'upload-info-page')">
                        上传资料
                    </el-button>
                    <el-button
                        v-if="scope.row.payTaxesType === 1"
                        type="primary"
                        icon="el-icon-coordinate"
                        size="mini">
                        零账簿处理
                    </el-button>
                </template>
                <el-button
                    v-if="scope.row.status === 2 || scope.row.status === 3"
                    type="primary"
                    icon="el-icon-view"
                    size="mini"
                    @click="toDetail(scope.row, 'view-info-page')">
                    查看资料
                </el-button>
                <el-button
                    v-if="scope.row.status === 2"
                    type="success"
                    icon="el-icon-tickets"
                    size="mini">
                    微信催办
                </el-button>
                <el-button
                    v-if="scope.row.status === 5 || scope.row.status === 6"
                    type="warning"
                    icon="el-icon-s-claim"
                    size="mini">
                    强制做账
                </el-button>
                <el-button
                    v-if="scope.row.status === 6"
                    type="primary"
                    icon="el-icon-view"
                    size="mini">
                    查看详情
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
</template>

<script>
import map from '@/components/map';

export default {
    components: {
    },
    data() {
        return {
            companyName: '',
            status: '',
            total: 0,
            currentPage: 1,
            pageSize: 20,
            tableData: [],
            isCheckStatus: false,
            accountStatusList: map.accountStatusList
        };
    },
    mounted() {
        this.currentPageChange(1);
    },
    methods: {

        /**
         * 翻页触发
         *
         * @param {Number} pageNumber 页码
         */
        currentPageChange(pageNumber) {
            // 获取搜索条件
            const queryData = {
                companyName: this.companyName,
                status: this.status,
                pageSize: this.pageSize,
                pageNumber
            };

            this.$http.get('/accountBills', {
                params: queryData
            }).then(res => {
                this.total = res.data.total;
                this.tableData = res.data.list;
            });
        },

        /**
         * 将状态编码转为文字
         * 
         * @param {Number} status 状态码
         */
        getStatusText(status) {
            let result = '';
            map.accountStatusList.some(item => {
                if (item.value === status) {
                    result = item.label;
                    return true;
                }
            });
            return result;
        },

        /**
         * 搜索
         */
        search() {
            this.pageNumber = 1;
            this.currentPageChange(1);
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
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.text = '核对中，请稍等...  37/209';
                }, 2000);
            });

        },

        /**
         * 选项改变
         */
        selectionChange(val) {
            this.multipleSelection = val;
        },

        /**
         * 到上传详情页
         */
        toDetail(data, path) {
            const str = JSON.stringify(data);
            localStorage.setItem('currentAccountBill', str);
            this.$router.push(`/upload-info/${path}`);
        }
    }
}
</script>

<style lang="less" scoped>
.upload-info-type-table {
    padding: 0 10px;
    .top-line {
        padding-bottom: 10px;

        .search-section {
            float: right;
            width: 200px;
            text-align: right;
            .el-select {
                margin-top: 2px;
                width: 100%;
            }
        }
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
