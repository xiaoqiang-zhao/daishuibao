<template>
    <section class="upload-file-section">
        <div class="form-item">
            <section class="title-section">
                上传发票
            </section>
            <el-upload
                class="upload-demo"
                ref="invoiceUploadComponent"
                drag
                accept=".jpg,.png"
                action="/api/upload/invoice"
                :file-list="invoiceFileList"
                :on-change="beforeUploadInvoiceFiles"
                :before-remove="beforeRemoveInvoiceFiles"
                :auto-upload="false"
                :data="{uid: invoiceFileListId}"
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
                ref="bankSlipUploadComponent"
                drag
                accept=".jpg,.png"
                action="/api/upload/bankSlip"
                :file-list="bankSlipFileList"
                :on-change="beforeUploadBankSlipFiles"
                :before-remove="beforeRemoveBankSlipFiles"
                :auto-upload="false"
                :data="{uid: bankSlipFileListId}"
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
import utiles from '@/components/utiles';

export default {
    data() {
        return {
            invoiceFileList: [],
            bankSlipFileList: [],
            invoiceFileListId: utiles.getUUID(),
            bankSlipFileListId: utiles.getUUID(),
            cb: new Function(),
            count: 0
        };
    },
    methods: {
        // uploadFile: function (fileData) {
        //     const formData = new FormData();
        //     // 键值
        //     formData.append('file', fileData.file);
        //     formData.append('uid', fileData.file.uid);

        //     this.$http.post(
        //         fileData.action,
        //         formData,
        //         {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         }
        //     ).then(res => {
        //     }).catch(err => {
        //         console.error(err);
        //     });
        // },

        beforeUploadInvoiceFiles(file) {
            if (file.status === 'ready') {
                this.invoiceFileList.push(file);
            }
            else if (file.status === 'success') {
                this.count--;
                this.executeCallback();
            }
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
            if (file.status === 'ready') {
                this.bankSlipFileList.push(file);
            }
            else if (file.status === 'success') {
                this.count--;
                this.executeCallback();
            }
        },

        beforeRemoveBankSlipFiles(file) {
            this.bankSlipFileList.some((item, index) => {
                if (file.uid === item.uid) {
                    this.bankSlipFileList.splice(index, 1);
                    return true;
                }
            });
        },

        /**
         * 获取上传文件的id
         */
        getUploadFileListIds() {
            const data = {
                invoiceFileListId: this.invoiceFileList.length ? this.invoiceFileListId : '',
                bankSlipFileListId: this.bankSlipFileList.length ? this.bankSlipFileListId : '',
            };
            return data;
        },

        /**
         * 手动触发上传
         */
        upload(cb) {
            this.cb = cb;
            const data = this.getUploadFileListIds();
            this.count = 0;
            if (data.invoiceFileListId) {
                this.count++;
                this.$refs.invoiceUploadComponent.submit();
            }
            if (data.bankSlipFileListId) {
                this.count++;
                this.$refs.bankSlipUploadComponent.submit();
            }
        },
        
        /**
         * 执行回调
         */
        executeCallback() {
            if (this.count === 0) {
                this.cb();
            }
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