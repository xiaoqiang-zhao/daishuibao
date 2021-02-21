<template>
    <el-dialog
        v-if="companyData"
        :title="title"
        :visible.sync="dialogVisible"
        width="800px">
        <section>
            <el-form
                ref="form"
                :model="form"
                label-width="120px"
                size="mini"
                class="form-section">
                <el-form-item label="公司名称">
                    <el-input v-model="form.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="所属行业">
                    <el-select v-model="form.industry" placeholder="请选择">
                        <el-option
                            v-for="item in industryList"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会计负责人">
                    <el-input v-model="form.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="微信号">
                    <el-input v-model="form.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号">
                    <el-input v-model="form.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="纳税类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                            v-for="item in payTaxesTypeList"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电子税务局密码">
                    <el-input v-model="form.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="初期数">
                    <div>
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            class="upload-item">
                            <el-button size="small" type="primary">点击上传【资产负债表】excel</el-button>
                        </el-upload>
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            class="upload-item">
                            <el-button size="small" type="primary">点击上传【利润表】excel</el-button>
                        </el-upload>
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            class="upload-item">
                            <el-button size="small" type="primary">点击上传【银行流水表】excel</el-button>
                        </el-upload>
                        <div class="explain">
                            若客户为老客户，则请将上一财务周期的报表上传至此；若客户为新客户，则忽略。
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </section>
        <!-- <section class="top-section">
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
        </section> -->
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import map from '@/components/map.js';
export default {
    props: {
    },
    data() {
        return {
            dialogVisible: false,
            title: '',
            companyData: null,
            industryList: map.industryList,
            payTaxesTypeList: map.payTaxesTypeList,
            form: {
                companyName: '',
                type: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    },
    methods: {

        /**
         * 打开弹框
         */
        open(companyData) {
            // debugger
            this.dialogVisible = true;
            // this.companyData = companyData;
            // // 编辑
            // if (companyData) {
            //     this.title = companyData.companyName;
            // }
            // // 新建
            // else {
            //     this.title = '新建客户';
            // }
        },

        loadData() {
            // this.$http.get(`/companies/${this.companyData.id}/suppliers-and-customers`).then(res => {
            //     console.log(res.data);
            // });
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/var.less';
.form-section {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
        // display: inline-block;
        flex: 1;
        min-width: 47%;
        max-width: 47%;
    }
}
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