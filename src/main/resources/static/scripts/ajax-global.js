//Ajax全局配置
require(['jquery', 'layer'], function ($, layer) {

    $.ajaxSetup({
        dataType: 'JSON',
        cache: false,       //禁止IE9缓存
        dataFilter: function (data, type) {
            //console.log(data);
            //console.log(type);

            //判断Ajax请求返回值
            var result = JSON.parse(data);
            if (!result.isSuccess) {
                if (result.code == 1) {
                    if (self != top) {
                        top.location.href = '/auth/login-oa';
                    } else {
                        location.href = '/auth/login-oa';
                    }
                }
                else if (result.code == 5){
                    if (self != top) {
                        top.location.href = '../../pages/auth/login-coop.html';
                    } else {
                        location.href = '../../pages/auth/login-coop.html';
                    }
                }
                else {
                    if (this.error) {
                        this.error(result);
                    } else if (result.code != 165003) {
                        failureMessage(result.message);
                    }
                    top.layer.closeAll('loading');
                    throw new Error('Ajax请求返回值失败。');
                }
            }
            return data;
        }
    });

    //全局Ajax错误处理
    $(document).ajaxError(function (event, xhr, settings, error) {
        //console.log(JSON.stringify(event));
        //console.log(JSON.stringify(xhr));
        //console.log(JSON.stringify(settings));
        //console.log(JSON.stringify(error));
        top.layer.msg('请求失败，请重试。');
        top.layer.closeAll('loading');
        throw new Error('Ajax请求时发生错误。' + settings.url);
    });

    //全局Ajax成功处理
    $(document).ajaxSuccess(function (event, xhr, options, data) {
        //console.log(JSON.stringify(event));
        //console.log(JSON.stringify(xhr));
        //console.log(JSON.stringify(options));
        //console.log(JSON.stringify(data));

        //如果返回值中包含错误，显示错误信息
        //if (!data.isSuccess) {
        //    failureMessage(data.message);
        //    throw new Error('Ajax请求返回值失败。' + options.url);
        //}
    });

    //失败信息处理方法
    function failureMessage(message) {
        top.layer.msg(message);
    }

    //第一个Ajax请求开始
    $(document).ajaxStart(function () {
        //console.log('ajaxStart');
        //top.layer.load(2, { shade: [0.3, '#3333333'] });
        top.layer.load(0);
    });

    //所有Ajax请求结束
    $(document).ajaxStop(function () {
        //console.log('ajaxStop');
        top.layer.closeAll('loading');
    });
});