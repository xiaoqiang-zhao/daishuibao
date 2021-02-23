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
                            库存信息: <span class="uploaded">已上传</span>
                        </div>
                        <div class="single-line iconfont icon-salary">
                            工资信息: <span>未上传</span>
                        </div>
                        <div class="single-line iconfont icon-bank">
                            银行流水: <span class="bank">未上传</span>
                        </div>
                    </div>
                    <div class="right">
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
        
        <section class="common-block-section form-section">
            <section class="left">
                发票上传

                银行回单上传

                客户上传信息
            </section>
            <section class="right">
                手动录入分录
            </section>
        </section>
    </section>
</template>
<script>
/**
 * @file 上传资料页
 */
export default {
    data() {
        return {
            accountBillData: {}
        };
    },
    mounted() {
        const str = localStorage.getItem('currentAccountBill');
        const data = JSON.parse(str);
        this.accountBillData = data;
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
            .right {
                color: @color-grey-low;
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
        display: flex;
    }
}
</style>
