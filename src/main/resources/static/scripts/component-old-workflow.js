//老数据流程显示组件
define(['jquery', 'vue'], function ($, Vue) {
    return Vue.component('old-history', {
        props: {
            histories: {
                default: function () {
                    return [];
                }
            }
        },
        data: function () {
            return {
                showSystem: true
            }
        },
        template: '\
          <div class="block_container">\
            <div class="title">审批流程\
            </div>\
            <div class="content">\
            <div style="color: #333333; font-weight: normal;">\
                    <table class="table table_list table_striped text_center">\
                        <thead>\
                            <tr>\
                                <th>序号</th>\
                                <th>流程步骤</th>\
                                <th>处理人</th>\
                                <th>部门</th>\
                                <th>开始时间</th>\
                                <th>结束时间</th>\
                                <th>审批意见</th>\
                                <th>备注</th>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <template v-for="(history, index) in filterHistories">\
                            <tr>\
                                <td>{{index + 1}}</td>\
                                <td>{{history.step}}</td>\
                                <td>{{history.userName}}</td>\
                                <td>{{history.orgname}}</td>\
                                <td>{{history.startDate}}</td>\
                                <td>{{history.endDate}}</td>\
                                <td class="text-left">{{history.comm}}</td>\
                                <td class="text-left">{{history.note}}</td>\
                            </tr>\
                            </template>\
                        </tbody>\
                    </table></div></div></div>',
        created: function () {

        },
        mounted: function () {
        },
        watch: {},
        computed: {
            filterHistories: function () {
                if (this.showSystem) {
                    return this.histories;
                }
            }
        },
        methods: {}
    });
});
