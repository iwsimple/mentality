//工具
define(['jquery'], function ($) {

        //获取url参数
        function getUrlParams(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        }

        function stopDefault(e) {
            //如果提供了事件对象，则这是一个非IE浏览器
            if (e && e.preventDefault)
                //阻止默认浏览器动作(W3C)
                e.preventDefault();
            else
                //IE中阻止函数器默认动作的方式
                window.event.returnValue = false;
            return false;
        }

        /*var getUrlParams = function (name) {
            var url = window.location.search.substring(1);
            var variables = url.split('&');
            for (var i = 0; i < variables.length; i++) {
                var params = variables[i].split('=');
                if (params[0] == name) {
                    return params[1];
                }
            }
        };*/

        /**
         *  iframe 弹出层
         *  弹出页面的 Veu 实例名 必须为 iFrameModal
         * @param item
         * @param rowIndex
         * @param url
         * @param title
         * @param btnText 弹出层宽度（缺省默认值 确定）
         * @param width   弹出层宽度（缺省默认值 800px）
         * @param height  弹出层宽度（缺省默认值 500px）
         */
        function openIFrameModal(item, rowIndex, url, title, btnText, width, height) {
            btnText = (btnText == undefined) ? "确定" : btnText;
            width = (width == undefined) ? "800px" : width;
            height = (height == undefined) ? "600px" : height;
            var contentWindow;
            layer.open({
                title: title,
                type: 2,
                fix: false,
                shadeClose: false,
                maxmin: true,
                move: false,
                content: url,
                area: [width, height],
                btn: [btnText],
                success: function (layero) {
                    contentWindow = layero.find("iframe")[0].contentWindow;
                    contentWindow.iFrameModal.isNew = true;
                    if (!!item) {
                        contentWindow.iFrameModal.item = item;
                        contentWindow.iFrameModal.isNew = false;
                    }
                },
                yes: function (index, layero) {
                    var listItem = contentWindow.iFrameModal.item;
                    if (!item) {
                        vm.list.splice(0, 0, listItem);
                    }
                    layer.closeAll();
                }
            });
        }

        /**
         * 获取时间
         * @param pattern 时间格式，默认yyyy-MM-dd hh:mm:ss
         * @param times 时间，默认当前时间
         */
        function getTime(pattern, times) {
            // 获取当前时间
            Date.prototype.Format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1,                 //月份
                    "d+": this.getDate(),                    //日
                    "h+": this.getHours(),                   //小时
                    "m+": this.getMinutes(),                 //分
                    "s+": this.getSeconds(),                 //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            return new Date((null == times) ? new Date().getTime() : times)
                .Format((null == pattern) ? "yyyy-MM-dd hh:mm:ss" : pattern).toLocaleString();
        }

        /**
         * 重置qtip在数据刷新后不触发事件
         * 在ajax success里面使用该方法 that.$nextTick
         */
        function clearQtip() {
            $('*[title]').each(function () {
                $(this).attr('title', $(this).text());
            });

            $(document).on('mouseover', '.tooltip', function (event) {
                $(this).qtip('destroy', true).qtip({
                    overwrite: false,
                    show: {
                        event: event.type,
                        ready: true
                    },
                    position: {
                        //viewport: $(window),
                        my: 'bottom left',
                        at: 'top left'
                    },
                    style: {
                        classes: 'qtip-bootstrap'
                    }
                }, event);
            });
        }

        /**
         * 获取 localStorage
         */
        function getLocalStorageItem(item) {
            var value;
            if (hasLocalSotrage()) {
                try {
                    value = localStorage.getItem(item);
                } catch (error) {
                    console.error('localStorage.getItem报错， ', error.message)
                } finally {
                    return value;
                }
            } else {
                return getCookie(item);
            }
        }

        /**
         * 删除localStorage
         * @param item
         */
        function removeLocalStorageItem(item) {
            if (hasLocalSotrage()) {
                try {
                    localStorage.removeItem(item);
                } catch (error) {
                    console.error('localStorage.getItem报错， ', error.message)
                }
            } else {
                return removeCookie(item);
            }
        }

        /**
         * 获取 sessionStorage
         */
        function getSessionStorageItem(item) {
            var value;
            if (hasLocalSotrage()) {
                try {
                    value = sessionStorage.getItem(item);
                } catch (error) {
                    console.error('sessionStorage.getItem报错， ', error.message)
                } finally {
                    return value;
                }
            } else {
                return getCookie(item);
            }
        }

        /**
         * 设置 localStorage
         * @param key
         * @param value
         * @param day
         */
        function setLocalStorageItem(key, value, day) {
            if (hasLocalSotrage()) {
                try {
                    localStorage.setItem(key, value);
                } catch (error) {
                    console.error('localStorage.setItem报错， ', error.message)
                }
            } else {
                setCookie(key, value, day);
            }
        }

        /**
         * 设置 sessionStorage
         * @param key
         * @param value
         * @param day
         */
        function setSessionStorageItem(key, value, day) {
            if (hasLocalSotrage()) {
                try {
                    sessionStorage.setItem(key, value);
                } catch (error) {
                    console.error('sessionStorage.setItem报错， ', error.message)
                }
            } else {
                setCookie(key, value, day);
            }
        }

        /**
         * 删除sessionStorage
         * @param item
         */
        function removeSessionStorageItem(item) {
            if (hasLocalSotrage()) {
                try {
                    sessionStorage.removeItem(item);
                } catch (error) {
                    console.error('sessionStorage.getItem报错， ', error.message)
                }
            } else {
                return removeCookie(item);
            }
        }

        /**
         * 判断浏览器是否支持 hasLocalSotrage
         * @returns {*|module:zrender/Storage|Storage|{prototype: Storage; new(): Storage}|Storage|boolean}
         */
        function hasLocalSotrage() {
            return window.Storage && window.localStorage && window.localStorage instanceof Storage
        }

        /**
         * 设置cookie
         * @param key
         * @param value
         * @param day
         */
        function setCookie(key, value, day) {
            var t = day || 30;
            var d = new Date();
            d.setTime(d.getTime() + (t * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = key + "=" + value + "; " + expires;
        }

        /**
         * 获取cookie
         * @param name
         * @returns {string|null}
         */
        function getCookie(name) {
            var arr, reg = new RegExp("(^|)" + name + "=([^]*)(|$)");
            if (arr = document.cookie.match(reg)) {
                return arr[2];
            } else {
                return null;
            }
        }

        /**
         * 删除cookies
         */
        function removeCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }

        /**
         * 获取当前登录用户
         * @returns {null|any}
         */
        function currentUser() {
            var userKey = "USER_INFO";
            var jsonStr = '';
            if (localStorage.hasOwnProperty(userKey)) {
                jsonStr = getLocalStorageItem(userKey)
                if (jsonStr != '')
                    return JSON.parse(jsonStr);
            } else {
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: '/api-coop/auth/current-actor',
                    success: function (res) {
                        var userInfo = {
                            id: res.data.id,
                            username: res.data.username,
                            name: res.data.name
                        };
                        setLocalStorageItem(userKey, JSON.stringify(userInfo));
                    }
                });
                if (localStorage.hasOwnProperty(userKey)) {
                    jsonStr = getLocalStorageItem(userKey)
                    if (jsonStr != '')
                        return JSON.parse(jsonStr);
                }
            }
        }

        /**
         * 加法
         * @param arg1
         * @param arg2
         * @returns {number}
         */
        function accAdd(arg1, arg2) {
            if (typeof arg1 == 'undefined' || arg1 == null || typeof arg2 == 'undefined' || arg2 == null) {
                return null;
            }

            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2))
            return (arg1 * m + arg2 * m) / m
        }

        /**
         * 减法
         * @param arg1 被减数
         * @param arg2 减数
         * @returns {number}
         */
        function accSubtr(arg1, arg2) {
            if (typeof arg1 == 'undefined' || arg1 == null || typeof arg2 == 'undefined' || arg2 == null) {
                return null;
            }

            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2));
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
        }

        /**
         * 乘法
         */
        function accMul(arg1, arg2) {
            if (typeof arg1 == 'undefined' || arg1 == null || typeof arg2 == 'undefined' || arg2 == null) {
                return null;
            }

            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length
            } catch (e) {
            }
            try {
                m += s2.split(".")[1].length
            } catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        }

        /**
         * 浮点数除法运算
         * @param arg1 被除数
         * @param arg2 除数
         * @returns {number}
         */
        function accDiv(arg1, arg2) {
            if (typeof arg1 == 'undefined' || arg1 == null || typeof arg2 == 'undefined' || arg2 == null) {
                return null;
            }

            var r1 = 0, r2 = 0, m, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                if (s1.split(".")[1] != undefined)
                    r1 = s1.split(".")[1].length;
            } catch (e) {
            }
            try {
                if (s2.split(".")[1] != undefined)
                    r2 = s2.split(".")[1].length;
            } catch (e) {
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (accMul(arg1, m)) / (accMul(arg2, m));
        }

        /**
         * 获取割接时间
         * @returns {Date}
         */
        function getCutoverTime() {
            var myDate = new Date();
            myDate.setFullYear(2020, 0, 1);
            return myDate;
        }

        /**
         * 表单时间与割接时间比较
         *
         * @param date 表单时间
         * @returns {boolean}
         * 为了兼容IE,火狐,故将时间格式中的“-” ，替换成“/”
         */
        function compareCutoverDate(date) {
            var cutoverDate = new Date('2020/3/7');
            var result = false;
            if (date != null && date != "") {
                result = Date.parse(date.toString().replace(/-/g, "/")) > Date.parse(cutoverDate.toString().replace(/-/g, "/"));
            }
            return result;
        }

        return {
            getUrlParams: getUrlParams,
            stopDefault: stopDefault,
            openIFrameModal: openIFrameModal,
            getTime: getTime,
            clearQtip: clearQtip,
            getLocalStorageItem: getLocalStorageItem,
            setLocalStorageItem: setLocalStorageItem,
            removeLocalStorageItem: removeLocalStorageItem,
            getSessionStorageItem: getSessionStorageItem,
            setSessionStorageItem: setSessionStorageItem,
            removeSessionStorageItem: removeSessionStorageItem,
            currentUser: currentUser,
            accAdd: accAdd,
            accSubtr: accSubtr,
            accMul: accMul,
            accDiv: accDiv,
            getCutoverTime: getCutoverTime,
            compareCutoverDate: compareCutoverDate,
        }
    }
);


