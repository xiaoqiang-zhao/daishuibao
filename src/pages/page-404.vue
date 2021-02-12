<template>
    <div class="page-404">
        <div class="content-box">
            <img src="@/assets/img/404.png" class="bg" alt="404">
            <img src="@/assets/img/plane.png" class="plane" alt="plane">
            <p>抱歉，您所请求的页面不存在或已被删除</p>
            <el-button type="primary" @click="goHome">返回首页</el-button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goHome() {
            this.$router.push({
                path: '/'
            });
        }
    }
};
</script>
<style lang="less" scoped>
.content-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .bg {
        width: 400px;
    }
    .plane {
        width: 40px;
        position: absolute;
        top: 60px;
        left: 70px;
        z-index: 1;
        animation-name: flight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
        opacity: 0;
    }
    p {
        margin: 20px 0;
    }
}
@keyframes flight {
    0% {
        top: 60px;
        left: 70px;
        opacity: 0;
    }
    20% {
        top: 40px;
        left: 28px;
        transform: rotateY(41deg);
        opacity: 1;
    }
    50% {
        top: 18px;
        left: 70px;
        transform: rotateY(132deg);
        opacity: 1;
    }
    80% {
        top: -10px;
        left: 97px;
        transform: rotateY(142deg);
        opacity: 0;
    }
}
</style>
