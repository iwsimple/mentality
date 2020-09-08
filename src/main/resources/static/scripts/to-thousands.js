//金额显示千分位
define(['jquery', 'vue', 'utils'], function ($, Vue, utils) {
    return Vue.component('to-thousands', {
        props: {
            value: '',
            precision: {default: 2}
        },
        template: '<p>{{showText}}</p>',
        data: function () {
            return {
                showText: '',
                sign: ''
            }
        },
        computed: {},
        watch: {
            value: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    this.showText = this.getNum(newVal);
                }
            }
        },
        mounted: function () {
        },
        created: function () {
        },
        methods: {
            getNum: function (value) {
                // precision： 保留几位小数，不够的补0
                // 正负值
                this.sign = '';
                if ((/^\-/g).test(String(value))) {
                    this.sign = '-'
                }
                if ((/^\+/g).test(String(value))) {
                    this.sign = '+'
                }
                var pow = Math.pow(10, this.precision);
                var num = String(value).replace(/[^\d.]/g, '') == '' ? 0: String(value).replace(/[^\d.]/g, '')*1;
                num = (Math.round(utils.accMul(num, pow)) / pow).toFixed(this.precision); // (四舍五入).自动补零
                return this.thousands(this.sign + num);
            },
            thousands: function (params) {
                var res = params.toString().replace(/\d+/, function (n) {
                    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($2) {
                        return $2 + ',';
                    });
                });
                return res;
            }
        }
    })
});
