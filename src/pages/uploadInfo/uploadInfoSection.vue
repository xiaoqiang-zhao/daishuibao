<template>
    <section class="upload-info-section">
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
</template>

<script>
/**
 * @file 上传模块 / 客户信息纯展示模块
 */
export default {
    props: {
    },
    data() {
        return {
            accountBillData: {},
            uploadInfo: {}
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
        });
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/var.less';
.upload-info-section {
    display: flex;
    .common-text-block-section {
        flex: 1;
        margin-bottom: 0;
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
</style>