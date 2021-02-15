<template>
    <section class="upload-info">
        <process-statistics/>
        <section class="common-block-section">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="一般纳税人" name="first">
                    用户管理
                </el-tab-pane>
                <el-tab-pane label="小规模纳税人" name="second">
                    配置管理
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

export default {
    components: {
        processStatistics
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
