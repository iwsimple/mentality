define(['vue', 'jquery'], function (Vue) {
// 注册一个全局自定义指令 `v-ellipsis`
    var tooltipFn = function (el, binding) {
        var ellipsisWidth = binding.arg == undefined ? 0 : binding.arg;
        if (ellipsisWidth != 0) {
            $(el).css('width', ellipsisWidth).addClass("ellipsis tooltip").attr('title', binding.value)
        } else {
            $(el).addClass("ellipsis tooltip").attr('title', binding.value)
        }
    }
    return Vue.directive('ellipsis', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el, binding) {
            tooltipFn(el, binding);
        },
        update: function (el, binding) { // 所在组件的 VNode 更新时调用
            if (binding.value == binding.oldValue) return
            tooltipFn(el, binding);
        }
    })
})
