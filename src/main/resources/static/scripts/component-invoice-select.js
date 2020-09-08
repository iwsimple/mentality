//查询 Select组件
define(['jquery', 'vue'], function ($, Vue) {
    return Vue.component('invoice-select', {
        props: {
            value: {default: ''}
        },
        template: '<select class="form_control" v-model="selectInvoice">\
                    <option :value="item" v-for="item in range">{{text[item]}}</option>\
                   </select>',
        data: function () {
            return {
                selectInvoice: this.value,
                range: [],
                text: {
                    myInvoice: '我的单据',
                    departmentInvoice: '部门单据',
                    allInvoice: '全部单据'
                }
            }
        },
        created: function () {
            var that = this;
            $.ajax({
                url: '/api/invoice-range/list',
                method: 'post',
                async: false,
                data: {url: window.location.pathname},
                success: function (data) {
                    that.range = data.data
                }
            });
            this.selectInvoice = this.range[0];
            this.$emit('input', this.selectInvoice);
        },
        watch: {
            selectInvoice: {
                // immediate: true,
                handler: function (val) {
                    this.$emit('input', val);
                    this.$emit('change');
                }
            },
            value: function (val) {
                this.selectInvoice = val
            },
            range: function (val) {
                this.selectInvoice = val[0];
            }
        },
        methods: {
            init: function () {
                this.selectInvoice = this.range[0];
                this.$emit('input', this.selectInvoice);
            }
        }
    })
});
