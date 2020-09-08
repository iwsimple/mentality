//日期时间选择控件
define(['vue', 'My97DatePicker'], function (Vue) {

    Vue.prototype.WdatePicker = WdatePicker;

    return Vue.component('datetime-picker', {
        props: {
            placeholder: '',
            value: '',
            disabled: {default: false},
            minDate: {default: undefined},
            maxDate: {default: undefined},
            month: {default: false},
            id: ''
        },
        template: '<div class="input_group datepicker">\
                       <input type="text" class="form_control" :id="id" :placeholder="placeholder"\
                       @click="WdatePicker({dateFmt:(month? \'yyyy-MM\':\'yyyy-MM-dd HH:mm:ss\'),onpicked:changeData,oncleared:changeData,minDate:minDate,maxDate:maxDate})"\
                       @blur="changeData($event)" @keyup="changeData($event)"\
                       v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" :disabled="disabled" readonly>\
                       <span class="input_group_addon" @click="calender($event)"><i class="iconfont icon-calendar"></i></span>\
                   </div>',
        methods: {
            changeData: function (e) {
                if (e.el) {
                    this.$emit('input', e.el.value);
                } else {
                    this.$emit('input', e.target.value);
                }
            },
            calender: function (event) {
                if (this.disabled) {
                    return
                }
                $(event.target).parents('.input_group').find('input').trigger('click');
            }
        }
    });
});