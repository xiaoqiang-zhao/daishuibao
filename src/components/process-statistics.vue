<template>
    <section class="process-statistics common-block-section">
        <header>
            <div>
                <img src="/static/img/sand-time.png" alt="">
                <span class="text">
                    进度统计
                </span>
            </div>
            <span>客户总数量: {{ total }}</span>
        </header>
        <article v-for="item in pageStatusList" :key="item.status" class="item-left">
            <header>
                {{ item.title }}
            </header>
            <section>
                {{ item.amount }}
            </section>
            <footer>
                <img src="/static/img/percent.png"/>
                <div class="percent">{{ item.persent }}%</div>
            </footer>
        </article>
        <article v-for="item in bizStatusList" :key="item.status" class="item-right">
            <header>
                {{ item.title }}
            </header>
            <section>
                {{ item.amount }}
            </section>
            <footer>
                <img src="/static/img/percent2.png"/>
                <div class="percent">{{ item.persent }}%</div>
            </footer>
        </article>
    </section>
</template>

<script>
export default {
    data() {
        return {
            total: 0,
            pageStatusList: [],
            bizStatusList: []
        };
    },
    mounted() {
        // this.loadData();
    },
    methods: {

        /**
         * 加载数据
         */
        loadData() {
            this.$http.get('/process-statistics').then(res => {
                this.total = res.data.total;
                // 加工数据
                const pageStatusMap = [
                    '信息上传环节',
                    '智能做账环节',
                    '一键报税环节',
                ];
                res.data.pageStatusList.forEach(item => {
                    item.title = pageStatusMap[item.pageStatus - 1];
                    item.persent = ((item.amount / this.total) * 100).toFixed(2)
                });
                this.pageStatusList = res.data.pageStatusList;

                const bizStatusMap = [
                    '财务完成',
                    '报税完成'
                ];
                res.data.bizStatusList.forEach(item => {
                    item.title = bizStatusMap[item.status - 1];
                    item.persent = ((item.amount / this.total) * 100).toFixed(2)
                });
                this.bizStatusList = res.data.bizStatusList;
            });
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/var.less';
.process-statistics {
    display: flex;
    > header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        text-align: center;
        > div {
            font-size: 18px;
            img {
                width: 50px;
            }
            .text {
                vertical-align: 19px;
            }
        }
        > span {
            color: @color-grey-low;
            font-size: 16px;
        }
        
    }
    > article {
        flex: 1;
        text-align: center;
        > header {
            color: @color-grey;
        }
        > section {
            font-size: 22px;
        }
        > footer {
            > div {
                display: inline-block;
                vertical-align: middle;
            }
            img {
                width: 40px;
            }
            .percent {
                margin-right: -30px;
                font-size: 12px;
                color: @color-grey-low;
                vertical-align: 21px;
            }
        }
    }
    .item-right {
        > header,
        > footer .percent {
            color: @color-blue;
        }
    }
    .item-left + .item-right {
        border-left: 1px solid @color-grey-low;
    }
}
</style>