<template>
    <el-dialog
        title="新增客户"
        :visible.sync="dialogVisible"
        width="500px">
        <el-form
            ref="form"
            :model="form"
            label-width="110px"
            size="mini"
            class="form-section">
            <el-form-item label="活动名称">
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
                        v-for="item in companyTypeList"
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
                        <el-button size="small" type="primary">点击上传【现金流量表】excel</el-button>
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
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import map from '@/components/map.js';
import 'element-ui/lib/theme-chalk/upload.css';

export default {
    data() {
        return {
            dialogVisible: false,
            industryList: map.industryList,
            companyTypeList: map.companyTypeList,
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
        open() {
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/var.less';

.form-section {
    max-height: 300px;
    width: 430px;
    overflow: auto;

    .explain {
        padding-top: 5px;
        color: @color-grey-low;
        font-size: 12px;
        line-height: 1.2em;
    }

    .upload-item {
        margin-bottom: 5px;
    }
}
</style>