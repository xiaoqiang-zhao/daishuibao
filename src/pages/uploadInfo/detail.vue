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
                <section class="upload-section">
                    <div class="form-item">
                        <section class="title-section">
                            上传发票
                        </section>
                        <el-upload
                            class="upload-demo"
                            drag
                            accept=".xlsx,.xls"
                            action="/api/upload/invoice"
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
                            accept=".xlsx,.xls"
                            action="/api/upload/bankSlip"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">
                                <div>提示:</div>
                                <div>1. 务必保证票据文字清晰可见，若有明显折痕请手动输入，否则影响出账结果</div>    
                            </div>
                        </el-upload>
                    </div>
                </section>
                <div class="form-item">
                    <section class="title-section">
                        手动录入分录
                        <div class="right">
                            手动录入
                            <el-switch v-model="switchValue"></el-switch>
                        </div>
                    </section>
                    <section class="content-section">
                        <div class="tip-info" v-if="switchValue">
                            <div>提示:</div>
                            <div>1. 目前支持输入名称和代码两种形式</div>
                            <div>2. 若输入名称，请输入一级科目后在下拉框进行选择</div>
                            <div>3. 若输入代码，请输入完整代码，敲击回车生成科目</div>
                        </div>
                        <section v-if="currentData" class="table-section">
                            <el-table
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
                                    <template slot-scope="scope">
                                        <template v-if="!switchValue">
                                            {{ scope.row.subject }}
                                        </template>
                                        <template v-else>
                                            <template v-if="scope.row.type === 'header'">
                                                {{ scope.row.subject }}
                                            </template>
                                            <el-input
                                                v-else
                                                v-model="scope.row.subject"
                                                size="mini"
                                                placeholder="请填写"/>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="money">
                                    <template slot="header" slot-scope="scope">
                                        <template v-if="!switchValue">
                                            {{formateDate(currentData.headerData.date)}}
                                        </template>
                                        <el-date-picker
                                            v-else
                                            v-model="currentData.headerData.date"
                                            type="date"
                                            size="mini"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </template>
                                    <template slot-scope="scope">
                                        <template v-if="!switchValue">
                                            {{ scope.row.money }}
                                        </template>
                                        <template v-else>
                                            <template v-if="scope.row.type === 'header'">
                                                {{ scope.row.money }}
                                            </template>
                                            <el-input
                                                v-else
                                                v-model="scope.row.money"
                                                size="mini"
                                                placeholder="请填写"/>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="业务描述"
                                    prop="number">
                                    <template slot-scope="scope">
                                        <template v-if="!switchValue">
                                            {{ scope.row.number }}
                                        </template>
                                        <template v-else>
                                            <template v-if="scope.row.type === 'header'">
                                                {{ scope.row.number }}
                                            </template>
                                            <el-input
                                                v-else
                                                v-model="scope.row.number"
                                                size="mini"
                                                placeholder="请填写"/>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="companyName">
                                    <template slot="header" slot-scope="scope">
                                        <template v-if="!switchValue">
                                            {{currentData.headerData.des}}
                                        </template>
                                        <el-input
                                            v-else
                                            v-model="currentData.headerData.des"
                                            size="mini"
                                            placeholder="请填写业务描述"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <template v-if="!switchValue">
                                            {{ scope.row.number }}
                                        </template>
                                        <template v-else>
                                            <template v-if="scope.row.type === 'header'">
                                                {{ scope.row.number }}
                                            </template>
                                            <el-input
                                                v-else
                                                v-model="scope.row.number"
                                                size="mini"
                                                placeholder="请填写"/>
                                        </template>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="button-line">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    :disabled="activedIndex === 0"
                                    @click="switchActivedIndex(-1)"
                                    class="previous">
                                    上一条
                                </el-button>
                                <div>
                                    {{ activedIndex + 1}} / {{ artificialTableDataList.length }}
                                </div>
                                <el-button
                                    v-if="activedIndex === (artificialTableDataList.length - 1) && switchValue"
                                    type="primary"
                                    size="mini"
                                    @click="addOneArtificial"
                                    class="next">
                                    新增一条
                                </el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    :disabled="activedIndex === (artificialTableDataList.length - 1)"
                                    @click="switchActivedIndex(1)"
                                    class="next">
                                    下一条
                                </el-button>
                            </div>
                        </section>
                        <div v-else class="empty-data tip-info">
                            暂无分录信息
                        </div>
                        <footer v-if="switchValue">
                            <el-button type="primary">保存</el-button>
                        </footer>
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
import utiles from '@/components/utiles';

export default {
    data() {
        return {
            switchValue: false,
            accountBillData: {},
            uploadInfo: {},
            activedIndex: 0,
            artificialTableDataList: [],
            currentData: null
        };
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
            if (this.artificialTableDataList.length > 0) {
                this.currentData = this.artificialTableDataList[0];
            }
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
        },

        /**
         * 格式化日期
         */
        formateDate(value) {
            let result = '';
            if (value) {
                result = utiles.formateDate(value);
            }
            return result;
        },

        switchActivedIndex(value) {
            this.activedIndex += value;
            this.currentData = this.artificialTableDataList[this.activedIndex];
        },

        /**
         * 添加一行
         */
        addOneArtificial() {
            const oneArtificial = dataHelper.getOneNewArtificialTableData();
            this.artificialTableDataList.push(oneArtificial);
            this.activedIndex++;
            this.currentData = this.artificialTableDataList[this.activedIndex];
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
        .upload-section {
            display: flex;
            padding: 0 0 20px 0;
            .form-item {
                flex: 1;
            }
            .form-item ~ .form-item {
                margin-left: 20px;
            }
        }
        .upload-item {
            display: inline-block;
        }
        .el-table {
            margin: 10px 0;
        }
        .button-line {
            display: flex;
            .previous,
            .next {
                flex: 0 0 68px;
            }
            > div {
                flex: 1;
                text-align: center;
            }
        }
        footer {
            text-align: center;
        }
    }
}
</style>
