<template>
    <div class="login">
        <wave/>
    </div>
</template>

<script>
/**
 * @file 登录
 *
 * @author zxq
 */

import wave from '@/components/wave';
export default {
    components: {
        wave
    },
    data() {
        return {

        };
    },
    created() {},
    mounted() {
    },
    methods: {
        
    }
};
</script>

<style lang="less" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url(/static/img/bg.jpg) 50%;
}
</style>
