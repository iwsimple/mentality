// 下拉框模糊查询(简易版, 输入不选下拉项时, 保存输入的数据)
define(['jquery', 'vue', 'Popper'], function ($, Vue, Popper) {
    Vue.directive('clickoutside', {
        bind: function (el, binding, vnode) {
            function documentHandler(e) {
                if (!el.contains(e.target) && binding.expression) {
                    binding.value(e);
                }
            }

            el.__vueClickOutside__ = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        undind: function (el, binding) {
            document.removeEventListener('click', el.__vueClickOutside__);
            delete el.__vueClickOutside__;
        }
    })
    return Vue.component('fuzzy-query-select-simple', {
        props: {
            fuzzyList: {
                default: function () {
                    return []
                }
            },   // 所有下拉数据 数据格式[]
            defaultText: {default: '请选择'},   // 默认值
            queryValue: {default: ''},          // 查询结果value
            disabled: {default: false}          // 禁用
        },
        template: '<div class="fuzzy_query" v-clickoutside="hideSelect">\
                        <input type="text" class="form_control" v-model="fuzzyValue" aria-describedby="tooltip"\
                        @keyup="resetPosition" @focus="resetPosition" :placeholder="defaultText" :disabled="disabled">\
                        <div v-show="queryShow"  role="tooltip" class="query_content_container"><ul class="query_content">\
                            <li class="nowrap" v-show="queryList.length == 0">没有找到匹配项</li>\
                            <li class="nowrap" v-for="item in queryList" @click="selectItem(item)">{{item}}</li>\
                        </ul></div>\
                    </div>',
        data: function () {
            return {
                queryShow: false,
                fuzzyValue: this.queryValue,
                popperInstance: null
            }
        },
        computed: {
            queryList: function () { // 模糊查询后的数据
                var that = this;
                return that.fuzzyValue == null ? this.fuzzyList :
                    this.fuzzyList.filter(function (item) {
                        return item.indexOf(that.fuzzyValue) > -1;
                    });
            }
        },
        watch: {
            queryValue: function (val) {
                this.fuzzyValue = val;
            },
            fuzzyValue: function (val) {
                this.$emit("update:queryValue", val);
                this.$emit("fuzzy-change", val);
            }
        },
        mounted: function () {
        },
        methods: {
            selectItem: function (item) { // 点击选择事件
                this.queryShow = false;
                if (this.popperInstance) { // 销毁popper实例
                    this.popperInstance.destroy();
                    this.popperInstance = null;
                }
                this.fuzzyValue = item;
                this.$emit("update:queryValue", item);
                this.$emit("fuzzy-change", item);
            },
            hideSelect: function () { // 点击组件之外的地方, 隐藏组件
                var that = this;
                if (!this.queryShow) {
                    return
                }
                this.queryShow = false;
                if (this.popperInstance) { // 销毁popper实例
                    this.popperInstance.destroy();
                    this.popperInstance = null;
                }
                this.$emit("update:queryValue", that.fuzzyValue);
                this.$emit("fuzzy-change", that.fuzzyValue);
            },
            resetPosition: function (event) { // 固定位置
                var $this = $(event.target);
                this.queryShow = true;
                var inputSelect = $this[0];
                var selectContent = $this.siblings('.query_content_container')[0];
                this.popperInstance = null;
                this.popperInstance = new Popper(inputSelect, selectContent, { // 创建popper实例
                    placement: 'bottom-start',
                    modifiers: {
                        offset: {
                            offset: '0, 0'
                        },
                        preventOverflow: { // 溢出显示的优先顺序
                            priority: ['bottom'],
                            boundariesElement: 'window'
                        }
                    }
                })
            }
        }
    })
});