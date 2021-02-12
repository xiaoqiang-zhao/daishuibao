/**
 * @file 工具函数
 * @author zxq
 */

import moment from 'moment';

export default {
    // 去除前后空格，默认赋空串，防止值为undefined或null时报错
    trim(value = '') {
        return value.replace(/^\s+|\s+$/g, '');
    },

    // 验证手机号
    validateMobil(value) {
        return /^1[3|4|5|7|8|9][0-9]{9}$/.test(value);
    },

    // 验证身份证号
    validateIdentify(value) {
        return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value);
    },

    // 验证手机验证码格式
    validateIdentifyCode(value) {
        return /^\d{6}$/.test(value);
    },

    // 将用户信息存续到 localstorage 中
    setCurrentUser(data) {
        const str = JSON.stringify(data);
        localStorage.setItem('currentUser', str);
    },

    // 从 localStorage 中获取当前用户信息
    getCurrentUser() {
        const str = localStorage.getItem('currentUser');
        return JSON.parse(str);
    },

    /**
     * 格式化时间到日期 YYYY-MM-DD
     *
     * @param {string} value 输入值
     * @return {string} 格式化后的字符串
     */
    formateDate(value) {
        const date = value ? new Date(value * 1000) : new Date();
        return moment(date).format('YYYY-MM-DD');
    },

    /**
     * 格式化时间到秒 YYYYMMDD H:mm:ss
     *
     * @param {string} value 输入值
     * @return {string} 格式化后的字符串
     */
    formateTime(value) {
        const date = new Date(value * 1000);
        return moment(date).format('YYYYMMDD H:mm:ss');
    },

    /**
     * 格式化时间到秒
     *
     * @param {string} value 输入值
     * @return {string} 格式化后的字符串
     */
    formateTime2(value) {
        const date = new Date(value * 1000);
        return moment(date).format('YYYY/MM/DD H:mm:ss');
    },

    /**
     * 格式化时间到分
     *
     * @param {string} value 输入值
     * @return {string} 格式化后的字符串
     */
    formateTime3(value) {
        const date = new Date(value * 1000);
        return moment(date).format('YYYY/MM/DD H:mm');
    },

    /**
     * 填充数据
     *
     * @param {Object} keyObj 定义键的对象
     * @param {Object} valueObj 存储值的对象
     */
    fillData(keyObj, valueObj) {
        for (const key of Object.keys(keyObj)) {
            if (valueObj[key] !== undefined) {
                keyObj[key] = valueObj[key];
            }
        }
    }
};
