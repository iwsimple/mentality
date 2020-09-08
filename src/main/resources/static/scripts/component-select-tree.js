define(['jquery', 'vue', '../libs/jquery.ztree-3.5.40/fuzzysearch', 'Popper'], function ($, Vue, fuzzySearch, Popper) {
    Vue.directive('clickoutside', {
        bind: function (el, binding, vnode) {
            function documentHandler(e) {
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    binding.value(e);
                }
            }

            el.__vueClickOutside__ = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        undind: function (el, binding) {
            document.removeEventListener('click', el__vueClickOutside__);
            delete el.__vueClickOutside__;
        }
    })
    return Vue.component('select-tree', {
        template: '<div  v-clickoutside="hideTree">\
                      <div class="select_container"  @click="showTree" :id="id+searchId" :style="{width: width}">\
                            <span class="select_tree_tags">\
                                <span class="select_tree_tag" v-for="(item,index) in selectedItems" v-if="index<maxTagCount">\
                                    {{getName(item)}}\
                                    <i v-if="multi==true&&isdelete==true"  class="iconfont tooltip icon-delete select_tree_remove" type="danger"  @click.stop="deleteItem(item)"></i>\
                                </span>\
                                <span class="select_tree_tag_num" v-if="showPlus!=null">{{showPlus}}</span>\
                            </span>\
                            <div class="input_group">\
                                <input type="text" class="form_control" :placeholder="placeholderText" readonly />\
                                <span class="input_group_addon"><i class="icon_zTree"></i></span>\
                            </div>\
                        </div>\
                        <div class="select_tree_content" v-show="show">\
                            <div class="input_group" style="margin: 10px 0;" v-show="searchShow">\
                                <input type="text" :id="searchId" class="form_control" placeholder="搜索，数据量大速度较慢..." />\
                                <span class="input_group_addon"><i class="icon_search"></i></span>\
                            </div>\
                            <ul :id="id" class="ztree" style="height: auto;overflow-y: scroll;height: 240px;"></ul>\
                        </div>\
                       </div>',
        props: {
            value: {
                default: function () {
                    return []
                }
            },
            multi: {default: true},
            placeholder: {default: '请选择'},
            dataUrl: {default: undefined},
            dataTree: {
                default: function () {
                    return []
                }
            },
            radioType: {default: 'all'},
            idKey: {default: "id"},
            pIdKey: {default: "pId"},
            rootPid: {default: null},
            nameKey: {default: "name"},
            maxTagCount: {default: 999},
            maxChooseNum: {default: -1},
            checkType: {default: 0},
            isdelete: {default: false},
            width: {default: "auto"},
            top: {default: false},
            searchShow:{default: true}
        },
        data: function () {
            return {
                atop: 'auto',
                aleft: 'auto',
                searchId: Math.random(24).toString(36).substr(2),
                id: Math.random().toString(36).substr(2),
                zTree: null,
                showPlus: null,
                show: false,
                selectedItems: [],
                setting: {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: this.idKey,
                            pIdKey: this.pIdKey,
                            rootPId: this.rootPid
                        },
                        key: {
                            name: this.nameKey
                        }
                    },
                    check: {
                        nocheckInherit: false,
                        enable: true,
                        chkStyle: this.multi == true ? "checkbox" : "radio",
                        radioType: this.radioType,
                        chkboxType: this.checkboxSettingArr()

                    },
                    callback: {
                        onCheck: this.zTreeOnCheck,
                        beforeClick: this.zTreeBeforeClick
                    }
                },
                nodes: [],
                popperInstance: null
            }
        },
        mounted: function () {
            var that = this;
            this.initTree();
        },
        methods: {
            checkboxSettingArr: function () {
                // 0：被勾选时,取消勾选时关联父
                // 1：被勾选时,取消勾选时关联子
                // 2：被勾选时,取消勾选时
                var arr = [{"Y": "p", "N": "p"}, {"Y": "s", "N": "s"}, {"Y": "ps", "N": "ps"}];
                return arr[this.checkType]
            },
            initTree: function () { // 初始值
                var that = this;
                if (that.dataUrl) {
                    $.ajax({
                        url: that.dataUrl,
                        type: 'get',
                        async: false,
                        success: function success(res) {
                            that.renderTree(res.data);
                        }
                    });
                } else { // 父页面传值
                    that.renderTree(that.dataTree);
                }
            },
            renderTree: function (data) { // 渲染zTree
                var that = this;
                if (typeof data == 'string') {
                    that.nodes = JSON.parse(data);
                } else {
                    that.nodes = data;
                }
                if (that.nodes != null && that.nodes.length > 0) {
                    that.zTree = $.fn.zTree.init($("#" + that.id), that.setting, that.nodes);
                    fuzzySearch.fuzzySearch(that.id, $("#" + that.searchId), false, true);

                    var treeNodes = that.zTree.getNodes();
                    var allNodes = that.zTree.transformToArray(treeNodes)
                    $.map(allNodes, function (item) {
                        if (that.multi == false) {
                            if (that.value == (that.getId(item))) {
                                that.zTree.expandNode(item.getParentNode(), true);
                                that.zTree.checkNode(item, true, true);
                            }
                        } else {
                            if (that.value != null && that.value.indexOf(that.getId(item)) > -1) {
                                that.zTree.expandNode(item.getParentNode(), true);
                                that.zTree.checkNode(item, true, true);
                            }
                        }
                    })
                    that.selectedItems = that.zTree.getCheckedNodes(true);

                    if (!that.value || that.value.length <= that.maxTagCount) {
                        that.showPlus = null;
                    } else {
                        var count = that.value.length - that.maxTagCount;
                        that.showPlus = "+" + count;
                    }
                }
            },
            showTree: function () {
                var that = this;
                this.show = !this.show;
                var $this = $('#' + that.id + that.searchId);
                var inputSelect = $this[0];
                var selectContent = $this.siblings('.select_tree_content')[0];
                if (this.show) {
                    this.popperInstance = null;
                    this.popperInstance = new Popper(inputSelect, selectContent, { // 创建popper实例
                        placement: 'bottom-start',
                        modifiers: {
                            offset: {
                                offset: '0, 0'
                            }
                        }
                    })
                } else {
                    if (this.popperInstance) { // 销毁popper实例
                        this.popperInstance.destroy();
                        this.popperInstance = null;
                    }
                }
            },
            hideTree: function () {
                this.show = false;
                if (this.popperInstance) { // 销毁popper实例
                    this.popperInstance.destroy();
                    this.popperInstance = null;
                }
            },
            zTreeBeforeClick: function (treeId, treeNode) {
                this.zTree.checkNode(treeNode, !treeNode.checked, true, true);
                return false;
            },
            zTreeOnCheck: function (event, treeId, treeNode) {
                var that = this;
                var items = that.zTree.getCheckedNodes(true);
                var value = $.map(items, function (item) {
                    return that.getId(item)
                })
                if (that.multi) {
                    that.$emit('input', value);
                    that.$emit('change', items);
                } else {
                    that.$emit('input', value[0]);
                    that.$emit('change', items[0]);
                    that.hideTree();
                }
            },
            deleteItem: function (node) {
                var that = this;
                that.zTree.checkNode(node, false, true);
                var Items = that.zTree.getCheckedNodes(true);
                var value = $.map(Items, function (item) {
                    return that.getId(item)
                })
                if (that.multi) {
                    that.$emit('input', value);
                    that.$emit('change', Items);
                } else {
                    that.$emit('input', value[0]);
                    that.$emit('change', Items[0]);
                }
            },
            otherDeleteItem: function () {
                var that = this;
                if (that.selectedItems.length > that.maxChooseNum) {
                    that.deleteItem(that.selectedItems[0])
                }
            },
            getName: function (item) {
                var key = this.nameKey;
                return item[key].replace(/<[^>]+>/g, "");
            },
            getId: function (item) {
                var key = this.idKey;
                return item[key];
            }
        },
        watch: {
            value: function (val) {
                var that = this;
                //取到根节点
                var treeNodes = that.zTree.getNodes();
                //取到所有节点
                var allNodes = that.zTree.transformToArray(treeNodes);
                that.zTree.checkAllNodes(false); // "checkbox" 时有效
                if (that.multi == false) { // "radio" 时有效
                    var radioSelectNodes = that.zTree.getCheckedNodes(true);
                    $.map(radioSelectNodes, function (item) {
                        that.zTree.checkNode(item, false, true);
                    })
                }
                $.map(allNodes, function (item) {
                    if (that.multi == false) {
                        if (val == (that.getId(item))) {
                            that.zTree.checkNode(item, true, true);
                        }
                    } else {
                        if (val.indexOf(that.getId(item)) > -1) {
                            that.zTree.checkNode(item, true, true);
                        }
                    }
                })
                that.selectedItems = that.zTree.getCheckedNodes(true);
                if (val != null) {
                    if (val.length <= that.maxTagCount) {
                        that.showPlus = null;
                    } else {
                        var count = val.length - that.maxTagCount;
                        that.showPlus = "+" + count;
                    }
                }
                if (that.maxChooseNum != -1) {
                    that.otherDeleteItem()
                }
            },
            dataUrl: function (val) {
                this.initTree();
            },
            dataTree: function (val) {
                this.initTree();
            }
        },
        computed: {
            placeholderText: function () {
                return this.selectedItems.length > 0 ? "" : this.placeholder;
            }
        }
    });
});