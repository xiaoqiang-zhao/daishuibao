/**
 * @file 字典
 * @author zxq
 */

export default {
    // 性别
    gender: {
        male: '男',
        female: '女',
        unknown: '未知'
    },
    // 报账状态
    accountStatus: [
        {
            label: '待上传资料',
            value: 1
        },
        {
            label: '待核对资料',
            value: 2
        },
        {
            label: '待确认',
            value: 3
        },
        {
            label: '待报税',
            value: 4
        },
        {
            label: '报税完成',
            value: 5
        }
    ],
    // 行业列表
    industryList: [
        '餐饮',
        '制造'
    ],
    // 公司类型
    payTaxesTypeList: [
        '一般纳税人',
        '小规模纳税人'
    ]
};
