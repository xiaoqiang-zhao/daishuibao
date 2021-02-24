<template>
    <section class="upload-info-detail">
        <section class="info-section">
            <section class="common-text-block-section">
                <div class="title-section">
                    <div class="title">
                        客户基础信息
                    </div>
                </div>
                <div class="text-section">
                    <div class="single-line iconfont icon-name">
                        客户名称: {{ accountBillData.companyName }}
                    </div>
                    <div class="item iconfont icon-phone">
                        客户电话: {{ accountBillData.mobile }}
                    </div>
                    <div class="item  iconfont icon-wechart">
                        客户微信: {{ accountBillData.weChartAccount }}
                    </div>
                    <div class="single-line  iconfont icon-man">
                        会计负责人: {{ accountBillData.accountingManager }}
                    </div>
                </div>
            </section>
            <section class="common-text-block-section">
                <div class="title-section">
                    <div class="title">
                        客户上传信息
                    </div>
                </div>
                <div class="text-section upload-info-section">
                    <div class="left">
                        <div class="single-line iconfont icon-inventory">
                            库存信息:
                            <span :class="{uploaded: uploadInfo.inventory}">
                                {{uploadInfo.inventory ? '已上传' : '未上传' }}
                            </span>
                        </div>
                        <div class="single-line iconfont icon-salary">
                            工资信息:
                            <span :class="{uploaded: uploadInfo.salary}">
                                {{uploadInfo.salary ? '已上传' : '未上传' }}
                            </span>
                        </div>
                        <div class="single-line iconfont icon-bank">
                            银行流水:
                            <span class="bank" :class="{uploaded: uploadInfo.bank}">
                                {{uploadInfo.bank ? '已上传' : '未上传' }}
                            </span>
                        </div>
                    </div>
                    <div class="right tip-info">
                        <div>
                            提示:
                        </div>
                        <div>
                            1. 请督促客户及时上传左侧三项信息；
                        </div>
                        <div>
                            2. 银行流水信息为必须项，其余两项可不上传。
                        </div>
                    </div>
                </div>
            </section>
        </section>
        
        <section class="common-text-block-section">
            <section class="title-section">
                <div class="title">
                    编辑
                </div>
            </section>
            <section class="form-section">
                <div class="form-item">
                    <section class="title-section">
                        上传发票
                    </section>
                    <!-- 
                        :data="{id: balanceStatementFileId}"
                        :with-credentials="true"
                        :on-success="addBalanceStatementFile"
                        :on-remove="removeBalanceStatementFile"
                     -->
                    <!-- <el-upload
                        :multiple="false"
                        :limit="1"
                        accept=".xlsx,.xls"
                        action="/api/upload/balanceStatement"
                        class="upload-item">
                        <el-button size="mini" type="primary">上传</el-button>
                    </el-upload> -->
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <div>提示:</div>
                            <div>1. 票据包含增值税发票、机打发票和餐票</div>
                            <div>2. 务必保证票据文字清晰可见，若有明显折痕请手动输入，否则影响出账结果</div>
                        </div>
                    </el-upload>
                </div>
                <div class="form-item">
                    <section class="title-section">
                        上传银行回单
                    </section>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <div>提示:</div>
                            <div>1. 务必保证票据文字清晰可见，若有明显折痕请手动输入，否则影响出账结果</div>    
                        </div>
                    </el-upload>
                </div>
                <div class="form-item">
                    <section class="title-section">
                        手动录入分录
                        <div class="right">
                            手动录入
                            <el-switch v-model="switchValue"></el-switch>
                        </div>
                    </section>
                    <section class="content-section">
                        <div class="tip-info">
                            <div>提示:</div>
                            <div>1. 目前支持输入名称和代码两种形式</div>
                            <div>2. 若输入名称，请输入一级科目后在下拉框进行选择</div>
                            <div>3. 若输入代码，请输入完整代码，敲击回车生成科目</div>
                        </div>
                        <el-table
                            v-if="currentData"
                            :data="currentData.columnData"
                            :header-cell-class-name="getHeaderCellClassName"
                            :cell-class-name="getCellClassName"
                            :highlight-current-row="false"
                            border>
                            <el-table-column
                                label="业务日期"
                                prop="subject">
                                <template slot="header" class="table-header-cell">
                                    业务日期
                                </template>
                            </el-table-column>
                            <el-table-column prop="money">
                                <template slot="header" slot-scope="scope">
                                    <!-- <el-input
                                    size="mini"
                                    placeholder="请选择日期"/> -->
                                    {{currentData.headerData.date}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="业务描述"
                                prop="number">
                            </el-table-column>
                            <el-table-column
                                prop="companyName">
                                <template slot="header" slot-scope="scope">
                                    <!-- <el-input
                                    size="mini"
                                    placeholder="请选择日期"/> -->
                                    {{currentData.headerData.des}}
                                </template>
                            </el-table-column>
                            <!-- <el-table-column
                                align="right">
                                <template slot="header" slot-scope="scope">
                                    <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                                </template>
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </section>
                </div>
            </section>
        </section>
    </section>
</template>
<script>
/**
 * @file 上传资料页
 */
import 'element-ui/lib/theme-chalk/upload.css';
import 'element-ui/lib/theme-chalk/switch.css';
import dataHelper from './dataHelper';

export default {
    data() {
        return {
            switchValue: false,
            accountBillData: {},
            uploadInfo: {},
            activedIndex: 0,
            artificialTableDataList: []
        };
    },
    computed: {
        currentData() {
            let currentData = null;
            if (this.artificialTableDataList.length > 0) {
                currentData = this.artificialTableDataList[this.activedIndex];
            }
            return currentData;
        }
    },
    mounted() {
        const str = localStorage.getItem('currentAccountBill');
        const data = JSON.parse(str);
        this.accountBillData = data;

        // 获取上传相关信息
        this.$http.get('/accountBills/getInfo', {
            compamyName: data.compamyName
        }).then(res => {
            this.uploadInfo = res.data.customerUploadInfo;
            this.artificialTableDataList = dataHelper.getArtificialTableDataList(res.data.artificialInput);
        });
    },
    methods: {

        /**
         * 获取表头 class name
         */
        getHeaderCellClassName(data) {
            let className = 'table-body-cell';
            if (data.columnIndex % 2 === 0) {
                className = 'table-header-cell';
            }
            return className;
        },

        /**
         * 获取单元格 class name
         */
        getCellClassName(data) {
            let className = '';
            if (data.row.type === 'header') {
                className = 'table-header-cell';
            }
            return className;
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/var.less';
.upload-info-detail {
    padding: 0 10px;
    .info-section {
        display: flex;
        .common-text-block-section {
            flex: 1;
            .item {
                width: 49%;
            }
        }
        .common-text-block-section ~ .common-text-block-section {
            margin-left: 10px;
        }
        .iconfont::before {
            color: @color-grey-low;
        }
        .upload-info-section {
            display: flex;
            .left,
            .right {
                flex: 1;
            }
            .left span {
                font-size: 14px;
                &.bank {
                    color: @color-error;
                }
                &.uploaded {
                    color: @color-green;
                }
            }
        }
    }
    .company-info {
        color: @color-grey;
        span {
            padding-right: 10px;
        }
    }
    .form-section {
        .title-section {
            margin: 0 0 10px 0;
            padding-bottom: 10px;
            line-height: 1.5em;
        }
        .form-item ~ .form-item {
            margin-top: 20px;
        }
        .upload-item {
            display: inline-block;
        }
        .el-table {
            margin: 10px 0;
        }
    }
}
</style>
