//上传文件显示组件
define(['vue'], function (Vue) {
    return Vue.component('files', {
        props: {
            files: {
                default: function () {
                    return [];
                }
            },
            filesId: {
                default: function () {
                    return [];
                }
            },
        },
        template: '<div><table class="table_list table_striped table_hover text_center">\
                        <thead><tr>\
                            <th>序号</th>\
                            <th>文件名</th>\
                            <th>上传人</th>\
                            <th>大小</th>\
                            <th>上传时间</th>\
                            <th v-if="innerFiles.length>0"><i class="tooltip pointer iconfont icon-batch-download" title="批量下载" @click="downloadZip"></i></th>\
                        </tr></thead>\
                        <tbody><tr v-if="innerFiles.length>0" v-for="(item ,index) in innerFiles">\
                            <td>{{index+1}}</td>\
                            <td class="text_left"><a href="javascript:void(0);" @click="downloadFile(item)">{{item.name}}</a></td>\
                            <td ><p>{{item.applyUsername}}</p></td>\
                            <td>{{autoUnitSize(item.size)}}</td>\
                            <td>{{item.uploadTime}}</td>\
                            <td><i class="tooltip pointer iconfont icon-download-line" title="下载" @click="downloadFile(item)"></i></td>\
                        </tr>\
                        <tr v-if="null==innerFiles||innerFiles.length==0">\
                             <td colspan="5">\
                                    <p class="text_center">无数据</p>\
                                </td>\
                        </tr>\
                    </tbody></table></div>',
        data: function () {
            return {
                innerFiles: this.files,     //文件内部变量
            }
        },
        created: function () {
        },
        mounted: function () {

        },
        watch: {
            filesId: {
                handler: function (val, oldVal) {
                    //如果指定了filesId，根据filesId获取文件
                    if (val != null && val.length > 0 && val != oldVal) {
                        this.queryFile(val);
                    }
                }, immediate: true
            }
        },
        methods: {
            //模拟表单下载文件
            downloadFile: function (item) {
                $.ajax({
                    type: 'GET',
                    url: '/api/file/verify/' + item.id,
                    success: function (data) {
                        var url = "/api/file/download/" + item.id;
                        var fileName = item.name;
                        var form = $("<form></form>").attr("action", url).attr("method", "POST");
                        form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
                        form.appendTo('body').submit().remove();
                    }
                });
            },
            downloadZip: function () {
                var url = "/api/file/download-zip";
                var form = $("<form></form>").attr("action", url).attr("method", "POST");
                form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", "批量下载"));
                form.append($("<input></input>").attr("type", "hidden").attr("name", "ids").attr("value", this.filesId.join(',')));
                form.appendTo('body').submit().remove();
            },
            //根据文件大小自动选择单位显示
            autoUnitSize: function (size) {
                if (size < 1024)
                    return size + ' B';

                if (size >= 1024 && size < 1024 * 1024)
                    return (size / 1024).toFixed(2) + ' KB';

                if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024)
                    return (size / (1024 * 1024)).toFixed(2) + ' MB';

                return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                //1024 * 1024 * 1024 > int.MaxValue
            },
            queryFile: function (filesId) {
                var that = this;
                $.ajax({
                    type: 'GET',
                    url: '/api/file/query-by-ids',
                    data: {ids: filesId},
                    success: function (data) {
                        if (!data.isSuccess) return;
                        that.innerFiles = data.data;
                    }
                });
            },
        }
    });
});
