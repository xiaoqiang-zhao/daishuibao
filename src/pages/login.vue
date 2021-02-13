<template>
    <div class="login">
        <el-card class="login-card">
            <div class="logo">
                <img src="/static/img/logo.png" alt="logo"/>
            </div>
            <div class="title">
                代账宝智能财务系统
            </div>
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input v-model="form.name" placeholder="登录账号">
                        <i slot="prepend" class="el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="登录密码">
                        <i slot="prepend" class="iconfont icon-password"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <wave/>
    </div>
</template>

<script>
/**
 * @file 登录
 *
 * @author zxq
 */

import wave from "@/components/wave";
export default {
    components: {
        wave,
    },
    data() {
        return {
            form: {
                name: '',
                password: ''
            }
        };
    },
    created() {},
    mounted() {},
    methods: {

        /**
         * 登录
         */
        login() {

        }
    },
};
</script>

<style lang="less" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url(/static/img/bg.jpg) 50%;

    .login-card {
        position: absolute;
        z-index: 3;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-60%);
        width: 400px;

        .logo {
            text-align: center;
            margin-bottom: 3px;
            img {
                width: 40px;
            }
        }

        .title {
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 30px;
        }

        .el-icon-user,
        .icon-password {
            padding-top: 4px;
            font-size: 16px;
        }

        .login-btn {
            width: 100%;
            font-size: 18px;
        }
    }
}
</style>
