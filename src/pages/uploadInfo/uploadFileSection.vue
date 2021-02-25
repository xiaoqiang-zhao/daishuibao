<template>
    <section class="upload-file-section">
        <div class="form-item">
            <section class="title-section">
                上传发票
            </section>
            <el-upload
                class="upload-demo"
                drag
                accept=".xlsx,.xls"
                action="/api/upload/invoice"
                :file-list="invoiceFileList"
                :before-upload="beforeUploadInvoiceFiles"
                :before-remove="beforeRemoveInvoiceFiles"
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
                :file-list="bankSlipFileList"
                :before-upload="beforeUploadBankSlipFiles"
                :before-remove="beforeRemoveBankSlipFiles"
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
</template>
<script>
/**
 * @file 上传资料页 / 上传发票部分
 */
import 'element-ui/lib/theme-chalk/upload.css';

export default {
    data() {
        return {
            invoiceFileList: [],
            bankSlipFileList: []
        }
    },
    methods: {

        beforeUploadInvoiceFiles(file) {
            this.invoiceFileList.push(file);
        },

        beforeRemoveInvoiceFiles(file) {
            this.invoiceFileList.some((item, index) => {
                if (file.uid === item.uid) {
                    this.invoiceFileList.splice(index, 1);
                    return true;
                }
            });
        },

        beforeUploadBankSlipFiles(file) {
            this.bankSlipFileList.push(file);
        },

        beforeRemoveBankSlipFiles(file) {
            this.bankSlipFileList.some((item, index) => {
                if (file.uid === item.uid) {
                    this.bankSlipFileList.splice(index, 1);
                    return true;
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/var.less';
.upload-file-section {
    display: flex;
    padding: 0 0 20px 0;
    .form-item {
        flex: 1;
    }
    .form-item ~ .form-item {
        margin-left: 20px;
    }
    .title-section {
        margin: 0 0 10px 0;
        padding-bottom: 10px;
        line-height: 1.5em;
    }
    .upload-item {
        display: inline-block;
    }
}
</style>