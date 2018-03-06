$(function () {
    // 列表渲染以及分页
    var page = 1;
    var pageSize = 5;
    var result = []; //数组用于储存上传成功的图片的地址
    var render = function () {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('productTpl', info));
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    // 这个回调函数每个按钮都执行一次,返回值就是每个按钮的内容
                    // type：每个按钮的类型 首页对应的type值是first，上一页是prev, 页码对应的就是page，下一页next，最后一页last
                    // page对应页码值
                    // current当前页
                    itemTexts: function (type, page, current) {
                        // console.log(type,page,current);
                        switch (type) {
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            default:
                                return page;
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            default:
                                return page;
                        }
                    },
                    useBootstrapTooltip: true,
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();

                    }
                });
            }
        })
    };
    render();

    // 添加商品模态框功能
    $('.btn_add').on('click', function () {
        $('#productModal').modal('show');
        // 发送ajax，渲染数据二级分类
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                // console.log(info);
                $('.dropdown-menu').html(template('tpl2', info));
            }
        })
    });

    // 给dropdown-menu下的a注册事件
    $('.dropdown-menu').on('click', 'a', function () {
        // 1、设置按钮的内容
        $('.dropdown_text').text($(this).text());
        // 2、id设置brandId
        $('[name="brandId"]').val($(this).data('id'));
        // 让 brandID校验成功
        $form.data('bootstrapValidator').updateStatus('brandId', 'VALID');
    });

    // 初始化图片上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(data.result);
            // 获取到上传的图片的地址，展示出来往img_box里面添加图片
            var pic = data.result.picAddr;
            console.log(pic);
            $('<img width="100" src="' + pic + '" alt="">').appendTo('.img_box');
            // 把返回的数据存在数组中
            result.push(data.result);
            // 根据数组的长度判断上传了多少张图片
            // console.log(result);
            if (result.length == 3) {
                // 让某个字段校验成功
                $form.data('bootstrapValidator').updateStatus('productLogo', 'VALID');
            } else {
                // 让某个字段校验失败
                $form.data('bootstrapValidator').updateStatus('productLogo', 'INVALID');
            }
        }
    });

    // 表单校验
    var $form = $('form');
    $form.bootstrapValidator({
        // 让隐藏域也校验
        excluded: [],
        // 小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置校验规则
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择品牌'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请选择商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    // 必须是非零开头的数字
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入一个有效的商品库存'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入一个合法的尺码{32-44}'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            }
        }
    });

    // 给表单注册校验成功事件
    $form.on('success.form.bv', function (e) {
        // e.preventDefault();
        // console.log(1);
        var param = $form.serialize();
        // console.log(param);
        param += '&picName1=' + result[0].picName + '&picAddr1=' + result[0].picAddr;
        param += '&picName2=' + result[1].picName + '&picAddr2=' + result[1].picAddr;
        param += '&picName3=' + result[2].picName + '&picAddr3=' + result[2].picAddr;

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: param,
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#productModal').modal('hide');
                    // 重新渲染第一页
                    page = 1;
                    render();
                    // 重置表单样式
                    $form.data('bootstrapValidator').resetForm(true);
                    $('.dropdown_text').text('请选择二级分类');
                    $('.img_box img').remove();
                    result = [];
                }
            }
        })
    })

});