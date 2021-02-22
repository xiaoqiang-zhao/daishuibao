<template>
    <section class="smart-bill">
        <process-statistics/>
        <section class="common-block-section">
            <el-tabs v-model="activedName">
                <el-tab-pane label="一般纳税人" name="first">
                    <type-table :type="0"/>
                </el-tab-pane>
                <el-tab-pane label="小规模纳税人" name="second">
                    <type-table :type="1"/>
                </el-tab-pane>
            </el-tabs>
        </section>
    </section>
</template>
<script>
/**
 * @file 智能做账
 */
import processStatistics from '@/components/process-statistics';
import typeTable from './typeTable';

export default {
    components: {
        processStatistics,
        typeTable
    },
    data() {
        return {
            activedName: 'first'
        };
    },
    mounted() {
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    }
}
</script>

<style lang="less" scoped>
.smart-bill {
    padding: 0 10px;
    .top-line {
        padding-bottom: 10px;
    }
    .pagination {
        text-align: right;
        padding: 20px 0 0;
    }
}
</style>
