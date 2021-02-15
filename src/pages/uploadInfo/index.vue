<template>
    <section class="upload-info">
        <process-statistics/>
        <section class="common-block-section">
            <el-tabs v-model="activeName" @tab-click="handleClick">
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
 * @file 上传信息
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
            activeName: 'second'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>


<style lang="less" scoped>
.upload-info {
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
