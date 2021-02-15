<template>
    <section class="upload-info">
        <process-statistics/>
        信息上传开发中，敬请期待...
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
