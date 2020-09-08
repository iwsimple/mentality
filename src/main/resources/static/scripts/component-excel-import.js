define(['vue', 'jquery', 'webuploader'], function (Vue, $, WebUploader) {
    return Vue.component('excel-import', {
        template: '<span>\
        <button type="button" :class="btnClass" @click="showImportLayer"><i class="iconfont icon-shangchuan"></i>{{btnText}}</button>\
		<div :class="className" style="display: none;">\
                <div :class="btnClass" style="width: 100px; text-align: center;" :id="id" >选择文件</div>\
			    <table class="table_list table_striped table_hover text_center" style="color: #333;font-weight: normal;" v-if="importData.length>0">\
				<thead>\
					<tr>\
						<th v-for="(item, index) in columns" v-if="item">{{item.second}}</th>\
					</tr>\
				</thead>\
				<tbody v-if="importData!=null&&importData.length>0">\
					<tr v-for="(item, index) in importData" >\
						<td style="text-align:left" v-for="(column, index) in columns" v-if="column.second" \
						>{{item[column.first]}}</td>\
					</tr>\
				</tbody>\
				<tbody v-else><td :colspan="columnsLength">暂无数据</td></tbody>\
			</table>\
        </div>\
	</span>',
        props: {
            importUrl: {default: ''},                   //导入的接口
            btnText: {default: '导入'},                 //按钮文字
            title: {default: 'Excel导入'},              //弹窗标题
            btnClass: {default: 'btn btn_normal'},      //按钮样式
            para: {default: undefined},                 // 参数
        },
        data: function () {
            return {
                //弹窗的类名
                className: Math.random().toString(36).substr(2),
                uploader: undefined,        //WebUploader实例
                excelFile: '',//选择的文件
                importData: [],
                columns: [],
                hasError: true,
                firstLoad: false,
                id: ''
            }
        },
        created: function () {
            //生成guid，此id用于创建WebUploader实例时关联pick，以保证页面上有多个组件时互相隔离
            //采用layer前缀
            this.id = WebUploader.Base.guid("");
        },
        mounted: function () {

        },
        methods: {
            upload: function () {
                this.uploader = WebUploader.create({
                    swf: '../../libs/webuploader-0.1.5/js/Uploader.swf',
                    server: this.importUrl,
                    method: 'POST',
                    formData: this.para,            //参数
                    pick: {id: '#' + this.id, multiple: false},
                    resize: false,                  //不压缩image, 默认如果是jpeg，文件上传前会进行压缩
                    auto: true,                     //选择文件后自动上传
                    duplicate: true,               //允许选择重复文件
                });
                var that = this;
                if (that.uploader != null) {
                    that.uploader.on('uploadSuccess', function (file, res) {
                        if (!res.isSuccess) {
                            layer.msg(res.message);
                        } else {
                            that.importData = res.data.list;
                            that.columns = res.data.columns;
                            that.hasError = res.data.hasError;
                            that.firstLoad = false;
                        }
                    });
                    that.uploader.on("error", function (type) {
                        if (type == "Q_TYPE_DENIED") {
                            layer.msg("只允许导入“" + that.accept.extensions + "”格式文件。");//验证文件格式
                        } else {
                            layer.msg("导入文件时发生错误：" + type);
                        }
                    });
                    that.uploader.on('uploadError', function (file, reason) {
                        layer.msg('导入文件时发生错误：' + reason);
                    });
                }
            },
            showImportLayer: function () {
                var that = this;
                this.importData = [];
                var layerIndex = layer.open({
                    type: 1,
                    title: [that.title, 'text-align:left;'],
                    shadeClose: false,
                    btnAlign: 'c',
                    area: ['1000px', '500px'],
                    maxmin: true,
                    content: $('.' + that.className),
                    btn: ['提交', '关闭'],
                    yes: function (index) {
                        if (that.hasError) {
                            layer.msg("导入数据有异常。")
                            return false;
                        }
                        that.$emit('get-data', that.importData);
                        layer.close(layerIndex);
                    },
                    success: function (layero, index) {
                        that.upload();
                    }
                });
            },
        },
        computed: {
            columnsLength: function () {
                var i = 0;
                var that = this;
                for (var j = 0; j < that.columns.length; j++) {
                    var item = that.columns[j];
                    if (item.title)
                        i++;
                }
                return i + 1;
            },

        }
    });
});