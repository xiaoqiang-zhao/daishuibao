<template>
    <section class="upload-info-detail">
        <upload-info-section/>
        
        <section class="common-text-block-section">
            <section class="title-section">
                <div class="title">
                    编辑
                </div>
            </section>
            <section class="form-section">
                <upload-file-section ref="uploadFileSection"/>
                <div class="form-item">
                    <section class="title-section">
                        手动录入分录
                        <div class="right">
                            手动录入
                            <el-switch v-model="switchValue"></el-switch>
                        </div>
                    </section>
                    <artificial-table :switch-value="switchValue" ref="artificialTable"/>

                    <footer>
                        <el-button type="primary" @click="save">保存</el-button>
                    </footer>
                </div>
            </section>
        </section>
    </section>
</template>
<script>
/**
 * @file 上传资料页
 */

import 'element-ui/lib/theme-chalk/switch.css';
// import utiles from '@/components/utiles';
import uploadInfoSection from './uploadInfoSection';
import uploadFileSection from './uploadFileSection';
import artificialTable from './artificialTable';

export default {
    components: {
        uploadInfoSection,
        uploadFileSection,
        artificialTable
    },
    data() {
        return {
            switchValue: false
        };
    },
    mounted() {
        const str = localStorage.getItem('currentAccountBill');
        const data = JSON.parse(str);
        this.accountBillData = data;
    },
    methods: {

        /**
         * 保存
         */
        save() {
            const uploadFileListIds = this.$refs.uploadFileSection.getUploadFileListIds();
            let artificialInput = [];
            if (this.switchValue) {
                artificialInput = this.$refs.artificialTable.getData();
            }

            this.$refs.uploadFileSection.upload(() => {
                this.$http.post('/accountBills/saveInfo', {
                    cName: this.accountBillData.companyName,
                    invoiceFileId: uploadFileListIds.invoiceFileListId,
                    bankSlipFileId: uploadFileListIds.bankSlipFileListId,
                    artificialInput
                }).then(res => {
                    this.$router.push('/upload-info-list');
                });
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/var.less';
.upload-info-detail {
    padding: 0 10px;

    .form-section {
        .title-section {
            margin: 0 0 10px 0;
            padding-bottom: 10px;
            line-height: 1.5em;
        }
        .el-table {
            margin: 10px 0;
        }
        
        footer {
            text-align: center;
            padding: 20px;
            .el-button {
                min-width: 130px;
            }
        }
    }
}
</style>
