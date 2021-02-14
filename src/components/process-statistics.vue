<template>
    <section class="process-statistics common-block-section">
        <header>
            <div>
                <i class="iconfont icon-sand-clock"></i>
                进度统计
            </div>
            <span>共计 {{ total }} 家企业</span>
        </header>
        <article v-for="item in dataList" :key="item.status">
            <header>
                {{ item.title }}
            </header>
            <section>
                {{ item.amount }}
            </section>
            <footer>
                <div ref="chartContainer" class="chart-container"></div>
                <div class="percent">{{ item.persent }}%</div>
            </footer>
        </article>
    </section>
</template>

<script>
import * as echarts from 'echarts';
import map from '@/components/map';
export default {
    data() {
        return {
            num: '30%',
            total: 0,
            dataList: []
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {

        /**
         * 加载数据
         */
        loadData() {
            this.$http.get('/process-statistics').then(res => {
                this.total = res.data.total;
                map.accountStatus.forEach(item => {
                    const amount = this.getStatusAmount(res.data.statusAmountList, item.value);
                    this.dataList.push({
                        title: item.label,
                        amount,
                        persent: ((amount / this.total) * 100).toFixed(2)
                    });
                });
                this.$nextTick(() => {
                    this.initChart();
                });
            });
        },

        /**
         * 获取数据
         * 
         * @param {Array} statusAmountList 服务端返回数据
         * @param {Number} status 状态值
         */
        getStatusAmount(statusAmountList, status) {
            let amount;
            statusAmountList.some(item => {
                if (item.status === status) {
                    amount = item.amount;
                    return true;
                }
            });
            return amount;
        },

        /**
         * 初始化饼图
         */
        initChart() {
            this.$refs.chartContainer.forEach((item, index) => {
                const chart = echarts.init(item);
                chart.setOption({
                    color: [
                        '#4175fa',
                        '#d3d3d3'
                    ],
                    series: [
                        {
                            type: 'pie',
                            radius: '100%',
                            // 关闭放大功能
                            hoverAnimation: false,
                            data: [
                                {
                                    value: this.dataList[index].amount,
                                    name: '当前状态量'
                                },
                                {
                                    value: this.total - this.dataList[index].amount,
                                    name: '其他'
                                }
                            ],
                            // 去除饼图的指示折线label
                            label: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    ]
                });
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
        flex: 1;
        text-align: center;
        > div {
            font-size: 18px;
            .icon-sand-clock {
                font-size: 36px;
                color: @color-blue;
            }
        }
        > span {
            color: @color-grey;
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
            .chart-container {
                width: 50px;
                height: 50px;
            }
            .percent {
                height: 50px;
                margin-right: -30px;
                font-size: 12px;
                color: @color-grey-low;
            }
        }
    }
}
</style>