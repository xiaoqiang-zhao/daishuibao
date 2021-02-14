<template>
    <section class="client-ducoment">
        <process-statistics/>
    </section>
</template>

<script>

import processStatistics from '@/components/process-statistics';

export default {
    components: {
        processStatistics
    },
    data() {
        return {};
    }
}
</script>

<style lang="less" scoped>
.client-ducoment {
    padding: 0 10px;
}
</style>
