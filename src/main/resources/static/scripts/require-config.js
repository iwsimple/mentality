//require.js配置
require.config({
    urlArgs: "bust=1591776391",
    baseUrl: '../../scripts',
    paths: {
        //'domReady': ['../../libs/require-domReady-2.0.1/domReady'],
        'jquery': ['../../libs/jquery-1.12.4/jquery-1.12.4.min'],
        'jquery-ui': ['../../libs/jquery-ui-1.11.4/jquery-ui.min'],
        'vue': ['../../libs/vue-2.6.10/vue'],   //开发环境
        // 'vue': ['../../libs/vue-2.6.10/vue.min'],   //生产环境
        'layer': ['../../libs/layer-v3.1.1/layer'],
        'freeze-table': ['../../libs/jquery-freeze-table-1.3.0/freeze-table.min'],
        'My97DatePicker': ['../../libs/My97DatePicker-4.8/WdatePicker'],
        'jquery-ztree': ['../../libs/jquery.ztree-3.5.40/js/jquery.ztree.all'],
        'jquery-serializejson': ['../../libs/jquery.serializeJSON-2.9.0/jquery.serializejson.min'],
        'webuploader': ['../../libs/webuploader-0.1.5/js/webuploader.min'],
        'CKEditor': ['../../libs/ckeditor-4.11.4/ckeditor'],
        'jquery-qtip': ['../../libs/jquery.qtip-3.0.3/jquery.qtip.min'],
        'echarts': ['../../libs/echarts-4.2.1/echarts.min'],
        'moment': ['../../libs/moment-2.24.0/moment'],
        //流程引擎组件
        'process-engine-toolbar': ['../../pages/process-engine/component-process-engine-toolbar'],
        'process-engine-toolbar-backend': ['../../pages/process-engine/component-process-engine-toolbar-backend'],
        'peac-history': ['../../pages/process-engine/component-peac-history'],
        'peac-history-tree': ['../../pages/process-engine/component-peac-history-tree'],
        'process-engine-history-extend': ['../../pages/process-engine/process-engine-history-extend'],
        'peac-show-history': ['../../pages/process-engine/component-peac-show-history'],
        'peac-test': ['../../pages/process-engine/component-peac-test'],
        'peac-user': ['../../pages/process-engine/component-peac-user'],
        'peac-p1all-without-manager': ['../../pages/process-engine/component-peac-p1all-without-manager'],
        'peac-p1all-without-managers': ['../../pages/process-engine/component-peac-p1all-without-managers'],
        'peac-user-tree': ['../../pages/process-engine/component-peac-user-tree'],
        'peac-users-tree': ['../../pages/process-engine/component-peac-users-tree'],

        'peac-base-user': ['../../pages/process-engine/component-peac-base-user'],
        'peac-base-users': ['../../pages/process-engine/component-peac-base-users'],
        'peac-p1all-user': ['../../pages/process-engine/component-peac-p1all-user'],
        'peac-p1all-users': ['../../pages/process-engine/component-peac-p1all-users'],
        'peac-p2all-user': ['../../pages/process-engine/component-peac-p2all-user'],
        'peac-p2all-without-manager-user':['../../pages/process-engine/component-peac-p2all-without-manager-user'],
        'peac-p2all-users': ['../../pages/process-engine/component-peac-p2all-users'],
        'peac-p2subgm-user': ['../../pages/process-engine/component-peac-p2subgm-user'],
        'peac-p2subgm-users': ['../../pages/process-engine/component-peac-p2subgm-users'],
        'peac-p2leader-user': ['../../pages/process-engine/component-peac-p2leader-user'],
        'peac-p2subleader-user': ['../../pages/process-engine/component-peac-p2subleader-user'],
        'peac-p2leader-users': ['../../pages/process-engine/component-peac-p2leader-users'],
        'peac-p2manager-user': ['../../pages/process-engine/component-peac-p2manager-user'],
        'peac-p2groupleader-user': ['../../pages/process-engine/component-peac-p2groupleader-user'],
        'peac-p1subgm-user': ['../../pages/process-engine/component-peac-p1subgm-user'],
        'peac-p1subgm-users': ['../../pages/process-engine/component-peac-p1subgm-users'],
        'peac-p1leader-user': ['../../pages/process-engine/component-peac-p1leader-user'],
        'peac-p1leader-users': ['../../pages/process-engine/component-peac-p1leader-users'],
        'peac-p1permission-user': ['../../pages/process-engine/component-peac-p1permission-user'],
        'peac-p1permission-users': ['../../pages/process-engine/component-peac-p1permission-users'],
        'peac-p2permission-user': ['../../pages/process-engine/component-peac-p2permission-user'],
        'peac-p2permission-users': ['../../pages/process-engine/component-peac-p2permission-users'],
        'peac-p1subcgbleader-user': ['../../pages/process-engine/component-peac-p1subcgbleader-user'],
        'peac-p1subcgbleader-users': ['../../pages/process-engine/component-peac-p1subcgbleader-users'],
        'peac-leaderuptop2-user': ['../../pages/process-engine/component-peac-leaderuptop2-user'],
        'peac-leaderuptop2-users': ['../../pages/process-engine/component-peac-leaderuptop2-users'],
        'peac-p3all-user': ['../../pages/process-engine/component-peac-p3all-user'],
        'peac-p3all-users': ['../../pages/process-engine/component-peac-p3all-users'],
        'peac-p3permission-user': ['../../pages/process-engine/component-peac-p3permission-user'],
        'peac-p3permission-users': ['../../pages/process-engine/component-peac-p3permission-users'],
        //选择采购物流组组长角色
        'peac-scm-purchase-grouper': ['../../pages/process-engine/component-peac-scm-purchase-grouper'],
        //选择采购经理角色
        'peac-purchase-manager': ['../../pages/process-engine/component-peac-purchase-manager'],
        //指定部门Id
        'peac-p2organization-user': ['../../pages/process-engine/component-peac-p2organization-user'],
        'peac-p2organization-users': ['../../pages/process-engine/component-peac-p2organization-users'],
        //根据表达式取处理人
        'peac-script-user': ['../../pages/process-engine/component-peac-script-user'],
        'peac-script-user-picker': ['../../pages/process-engine/component-peac-script-user-picker'],
        'peac-url-user-picker': ['../../pages/process-engine/component-peac-url-user-picker'],
        //选择供应商
        'peac-all-employee': ['../../pages/process-engine/component-peac-all-employee'],
        'peac-all-employees': ['../../pages/process-engine/component-peac-all-employees'],
        'peac-all-suppliers': ['../../pages/process-engine/component-peac-all-suppliers'],
        'peac-all-supplier': ['../../pages/process-engine/component-peac-all-supplier'],
        //工作流拓展组件
        'extends-result-group': ['../../pages/process-engine/component-extends-result-group'],
        'extends-result-leader': ['../../pages/process-engine/component-extends-result-leader'],
        'extends-result-countersign': ['../../pages/process-engine/component-extends-result-countersign'],

        'jsPDF': ['../../libs/jsPDF-1.5.3/jspdf.debug'],
        'html2canvas': ['../../libs/jsPDF-1.5.3/html2canvas'],
        'Base64': ['../../libs/jsPDF-1.5.3/base64'],
        // ie兼容es6语法
        'polyfill': ['../../libs/jsPDF-1.5.3/polyfill'],
        'Popper': ['../../libs/popper-2.0.6/popper-1.16.1']
        //
        // 'suyan': ['./suyan'],
        //'lodop': ['lodopfuncs']
    },
    shim: {
        'jquery-ui': {
            deps: ['jquery', 'css!../../libs/jquery-ui-1.11.4/jquery-ui.min.css']
        },
        'freeze-table': {
            deps: ['jquery']
        },
        'layer': {
            deps: ['jquery', 'css!../../libs/layer-v3.1.1/theme/default/layer.css']
            //, exports: 'layer'
        },
        'My97DatePicker': {
            exports: 'WdatePicker'
        },
        'jquery-ztree': {
            deps: ['jquery'
                //, 'css!../../libs/jquery.ztree-3.5.40/css/awesomeStyle/awesome.css'
                //, 'css!../../libs/jquery.ztree-3.5.40/css/metroStyle/metroStyle.css'
                , 'css!../../libs/jquery.ztree-3.5.40/css/zTreeStyle/zTreeStyle.css'
            ]
        },
        'jquery-serializejson': {
            deps: ['jquery']
        },
        'webuploader': {
            deps: ['jquery', 'css!../../libs/webuploader-0.1.5/css/webuploader.css']
        },
        'component-connection-box': {
            deps: ['css!../../styles/connection-box.css']
        },
        'jquery-qtip': {
            deps: ['jquery', 'css!../../libs/jquery.qtip-3.0.3/jquery.qtip.min.css']
        },
        'peac-user-tree': {
            deps: ['css!../../pages/process-engine/component-peac.css']
        },
        'peac-users-tree': {
            deps: ['css!../../pages/process-engine/component-peac.css']
        },
        'jsPDF': {
            deps: ['html2canvas', 'Base64', 'polyfill']
        },
        'Popper': {
            deps: ['polyfill']
        }
        /*,
        'lodop':{
            deps: ['jquery']
        }*/
    },
    map: {
        '*': {
            'css': '../../libs/require-css-0.1.10/css.min'
        }
    },
    waitSeconds: 0  //修复Load timeout for modules错误
});

//定义公共模块，应用程序中引用后会自动引用对应依赖模块
define("global",
    [
        // 'css!../../styles/font_1520246_mi972oatnak/iconfont',
        'css!../../styles/font_1520246_hvzdthycpsm/iconfont',
        'jquery',
        'jquery-ui',
        'vue',
        'layer',
        'My97DatePicker',
        'jquery-ztree',
        'jquery-serializejson',
        'webuploader',
        'CKEditor',
        'moment',
        'jquery-qtip',
        //'lodop',
        //以上模块根据paths及shim配置加载

        //以下模块根据baseUrl配置自动加载
        'common',                       //公用脚本
        'ajax-global',                  //ajax全局配置
        'process-engine-config',        //流程引擎配置
        'new-id',                       //id生成工具
        'utils',                        //工具类

        'component-ckeditor',           //CKEditor富文本编辑器
        'component-uploader',           //上传组件
        'component-files',              //文件查看组件
        'component-files-detail',       //文件查看组件-a标签
        'component-datepicker',         //日期组件
        'component-datetimepicker',     //日期时间组件
        'component-pagination',         //分页组件
        'component-popup-input',        //通用PopupInput组件
        'component-input-number',       //数字选择组件
        'component-excel-import',       //导入组件

        'component-connection-box',     //多级关联选择框组件
        'component-popup-uploader',     //弹窗上传组件
        'component-uploader-files',     //弹窗上传组件-表格模式
        'directive-only-num',           //限制输入数字
        'directive-ellipsis',           //显示更多文字
        'directive-hide-more',          //展开显示更多
        'directive-hide-textarea',      //展开显示更多textarea输入框
        'directive-unite-paste',

        'component-upper-case',         //金额转大写
        'to-uppercase',                 //金额转大写
        'to-thousands',                 //金额转千分位
        // 'new-selectbox',             //换行下拉框
        'starred-review',               //星级评分
        'component-checkbox-list',      //Checkbox多选组件
        'component-checkbox-select',    //CheckboxSelect组件
        'component-select-tree',        //下拉树组件
        'component-tree-radio',
        'component-invoice-select',     //单据查询
        'component-fuzzy-query-select',  //模糊查询
        'component-fuzzy-query-select-simple',  //模糊查询
        'component-old-workflow', //老数据流程显示组件
        //流程引擎选人组件
        'process-engine-toolbar',
        'process-engine-toolbar-backend',
        'peac-history',
        'peac-history-tree',
        'process-engine-history-extend',
        'peac-show-history',
        'peac-test',
        'peac-user',
        'peac-p1all-without-manager',
        'peac-p1all-without-managers',
        'peac-user-tree',
        'peac-users-tree',
        'peac-p1all-user',
        'peac-p1all-users',
        'peac-p2all-user',
        'peac-p2all-without-manager-user',
        'peac-p2all-users',
        'peac-p2subgm-user',
        'peac-p2subgm-users',
        'peac-p2leader-user',
        'peac-p2subleader-user',
        'peac-p2leader-users',
        'peac-p2manager-user',
        'peac-p2groupleader-user',
        'peac-p1subgm-user',
        'peac-p1subgm-users',
        'peac-p1leader-user',
        'peac-p1leader-users',
        'peac-p1permission-user',
        'peac-p1permission-users',
        'peac-p2permission-user',
        'peac-p2permission-users',
        'peac-p1subcgbleader-user',
        'peac-p1subcgbleader-users',
        'peac-leaderuptop2-user',
        'peac-leaderuptop2-users',
        'peac-p3all-user',
        'peac-p3all-users',
        'peac-p3permission-user',
        'peac-p3permission-users',
        'peac-p2organization-user',
        'peac-p2organization-users',
        'peac-scm-purchase-grouper',
        'peac-purchase-manager',
        //根据表达式取处理人
        'peac-script-user',
        'peac-script-user-picker',
        'peac-url-user-picker',
        //流程引擎选择供应商员工
        'peac-all-employee',
        'peac-all-employees',
        //流程引擎选择供应商，返回供应商的所有员工
        'peac-all-suppliers',
        'peac-all-supplier',
        //工作流拓展组件
        'extends-result-group',
        'extends-result-leader',
        'extends-result-countersign'
    ]);

