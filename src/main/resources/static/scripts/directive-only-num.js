define(['vue', 'jquery'], function (Vue) {
    var trigger = function (el, type) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, true, true);
        $(el)[0].dispatchEvent(e);
    }

    return Vue.directive('onlyNum',{
        bind: function (el, binding, vnode) {
            var ele = el.tagName === 'INPUT' ? el : el.querySelector('input');
            ele.oninput = function() { // oninput: 输入框输入的时候执行； 缺点：从脚本中修改值不会触发事件

                var val = ele.value;
                var oldValue = ele.value;

                // 浮点数
                if (binding.modifiers.negative) {
                    // 负数
                    val = val.replace(/[^\d.-]/g, ''); // 清除“数字”和“.”以外的字符
                    val = val.replace(/-{2,}/g, '-'); // 只保留首位- 清除剩余的负号
                    val = val.replace(/(\d|.)(-)/g,'$1');
                } else {
                    // 正数
                    val = val.replace(/[^\d.]/g, ''); // 清除“数字”和“.”以外的字符
                }
                val = val.replace(/\.{2,}/g, '.');// 只保留第一个. 清除多余的
                val = val.replace('.', '$#$');
                val = val.replace(/\./g, '');
                val = val.replace('$#$', '.');

                // 整数限制位数
                if (binding.arg) {
                    var index = val.indexOf('.') != -1
                    var tmp = val.split('.');
                    val = tmp[0].substring(0, binding.arg) + (index ? '.': '') + (tmp[1] ? tmp[1] : '');
                }


                var num = binding.value==undefined?0:binding.value;
                if (num== 'infinity') {
                    val = val.replace(/^(\-)*(\d+)\.(\d+).*$/, '$1$2.$3'); //不限制小数位
                }
                else if(num==3){
                    val = val.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入三位小数
                }else if(num==4){
                    val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
                }else{
                    val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数
                }

                if (val.indexOf('.') < 0 && val != '' && val != '-') {
                    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    val = parseFloat(val);
                }

                ele.value = val;
                if (oldValue !== val.toString()) {
                    trigger(ele,'input')
                }
            }
        },
        update: function (el, binding, vnode, oldVnode) { // 所在组件的 VNode 更新时调用
            var ele = el.tagName === 'INPUT' ? el : el.querySelector('input');

            if (vnode.data.domProps && vnode.data.domProps.value != oldVnode.data.domProps.value) {
                trigger(ele,'input');
            }
        }
    })
})