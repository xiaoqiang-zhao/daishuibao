<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        @close="clear"
        width="800px">
        <section class="dialog-body">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                :validate-on-rule-change="false"
                label-width="140px"
                size="mini"
                class="form-section">
                <el-form-item label="公司名称" prop="companyName">
                    <el-input v-model="form.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" prop="">
                    <el-select v-model="form.industry" placeholder="请选择">
                        <el-option
                            v-for="item in industryList"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会计负责人" prop="accountingManager">
                    <el-input v-model="form.accountingManager" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="weChartAccount">
                    <el-input v-model="form.weChartAccount" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号" prop="businessLicenseNumber">
                    <el-input v-model="form.businessLicenseNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="纳税类型" prop="payTaxesType">
                    <el-select v-model="form.payTaxesType" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in payTaxesTypeList"
                            :key="item"
                            :label="item"
                            :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电子税务局密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入"></el-input>
                </el-form-item>
                <template v-if="type === 'add'">
                    <el-form-item label="资产负债表" prop="balanceStatement">
                        <el-upload
                            :multiple="false"
                            :limit="1"
                            :data="{id: form.balanceStatementFileId}"
                            accept=".xlsx,.xls"
                            action="/api/upload/balanceStatement"
                            class="upload-item">
                            <el-button size="small" type="primary">点击上传【资产负债表】excel</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="利润表" prop="">
                        <el-upload
                            :multiple="false"
                            :limit="1"
                            :data="{id: form.balanceStatementFileId}"
                            accept=".xlsx,.xls"
                            action="/api/upload/incomeStatement"
                            class="upload-item">
                            <el-button size="small" type="primary">点击上传【利润表】excel</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="银行流水表" prop="">
                        <el-upload
                            :multiple="false"
                            :limit="1"
                            :data="{id: form.balanceStatementFileId}"
                            accept=".xlsx,.xls"
                            action="/api/upload/bankStatement"
                            class="upload-item">
                            <el-button size="small" type="primary">点击上传【银行流水表】excel</el-button>
                        </el-upload>
                    </el-form-item>
                </template>
            </el-form>
            <section class="suppliers-and-customers">
                <section class="top-section">
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
                            <el-table
                                border
                                :data="suppliersTableData"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column
                                    label="编号"
                                    width="60"
                                    type="index"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="companyName"
                                    label="公司名称">
                                    <template slot-scope="scope">
                                        <template v-if="scope.row.type === 'show'">
                                            {{scope.row.companyName}}
                                        </template>
                                        <el-input
                                            v-else
                                            v-model="scope.row.companyName"
                                            placeholder="请输入公司名称"
                                            size="mini">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-circle-plus-outline"
                            class="add-btn"
                            @click="addSupplierOrcustomer('supplier')">
                            添加
                        </el-button>
                    </el-tabs>
                    <el-tabs value="customers" class="tab customers">
                        <el-tab-pane label="客户库" name="customers">
                            <el-table
                                border
                                :data="customersTableData"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column
                                    label="编号"
                                    width="60"
                                    type="index"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="companyName"
                                    label="公司名称">
                                    <template slot-scope="scope">
                                        <template v-if="scope.row.type === 'show'">
                                            {{scope.row.companyName}}
                                        </template>
                                        <el-input
                                            v-else
                                            v-model="scope.row.companyName"
                                            placeholder="请输入公司名称"
                                            size="mini">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button
                                @click="addSupplierOrcustomer('customer')"
                                type="primary"
                                size="mini"
                                icon="el-icon-circle-plus-outline"
                                class="add-btn">
                                添加
                            </el-button>
                        </el-tab-pane>
                    </el-tabs>
                </section>
            </section>
        </section>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import map from '@/components/map.js';
import utiles from '@/components/utiles.js';
import 'element-ui/lib/theme-chalk/upload.css';

export default {
    props: {
    },
    data() {
        const requiredRule = {
            required: true,
            trigger: 'blur',
            message: '请填写'
        };
        return {
            dialogVisible: false,
            title: '',
            type: '',
            companyData: null,
            industryList: map.industryList,
            payTaxesTypeList: map.payTaxesTypeList,
            form: {
                companyName: '',
                industry: '',
                accountingManager: '',
                mobile: '',
                weChartAccount: '',
                businessLicenseNumber: '',
                payTaxesType: '',
                password: '',
                balanceStatementFileId: '',
                incomeStatementFileId: '',
                bankStatementFileId: ''
            },
            rules: {
                companyName: requiredRule,
                industry: requiredRule,
                accountingManager: requiredRule,
                mobile: requiredRule,
                weChartAccount: requiredRule,
                businessLicenseNumber: requiredRule,
                payTaxesType: requiredRule,
                password: requiredRule
            },
            suppliersTableData: [],
            customersTableData: []
        };
    },
    methods: {

        /**
         * 打开弹框
         */
        open(companyData) {
            this.dialogVisible = true;
            this.companyData = companyData || {};

            // 编辑
            if (companyData) {
                this.type = 'edit';
                this.title = companyData.companyName;
                // 回填数据
                for (let key of Object.keys(this.form)) {
                    this.form[key] = companyData[key];
                }
                // 供应商库 与 客户库
                companyData.suppliers.forEach(item => {
                    this.suppliersTableData.push({
                        companyName: item,
                        type: 'show'
                    });
                });
                
                companyData.customers.forEach(item => {
                    this.customersTableData.push({
                        companyName: item,
                        type: 'show'
                    });
                });
            }
            // 新建
            else {
                this.type = 'add';
                this.title = '新建客户';

                this.form.balanceStatementFileId = utiles.getUUID();
                this.form.incomeStatementFileId = utiles.getUUID();
                this.form.bankStatementFileId = utiles.getUUID();
            }
        },

        /**
         * 添加供应商或客户
         */
        addSupplierOrcustomer(type) {
            this[`${type}sTableData`].push({
                companyName: '',
                type: 'new'
            });
        },

        /**
         * 清除表单和验证
         */
        clear() {
            // 清除数据
            this.suppliersTableData = [];
            this.customersTableData = [];
            for (let key of Object.keys(this.form)) {
                this.form[key] = '';
            }
            // 清除校验
            this.$refs.form.clearValidate();
        },

        // form.balanceStatementFileId
        beforeUpload(name) {
            this.form[`${name}StatementFileId`] = utiles.getUUID();
        },

        /**
         * 点击确定后的提交操作
         */
        submit() {
            this.$refs.form.validate(result => {
                debugger
            });
        },

        /**
         * 提交数据
         */
        postData() {
            // this.$http.get(`/companies/${this.companyData.id}/suppliers-and-customers`).then(res => {
            //     console.log(res.data);
            // });
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/var.less';
.dialog-body {
    max-height: 500px;
    overflow: auto;
}
.form-section {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
        // display: inline-block;
        flex: 1;
        min-width: 47%;
        max-width: 47%;
        .el-select,
        .el-upload {
            display: block;
        }
    }
}
.suppliers-and-customers {
    padding: 20px 46px 0 39px;
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

        .suppliers,
        .customers {
            margin-right: 5px;
        }
        .add-btn {
            float: right;
            margin-top: 5px;
        }
    }
}
</style>
