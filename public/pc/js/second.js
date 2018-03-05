$(function () {
    // 渲染二级分类的数据
    var page = 1;
    var pageSize = 5;

    var render = function () {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var html = template('secondTpl', info);
                $('tbody').html(html);

                // 根据返回的数据渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();

                    }
                })
            }
        })
    };
    render();

    // 添加分类功能
    // 1.点击显示模态框,并且加载一级分类的数据渲染
    $('.btn_add').on('click', function () {
        $('#secondModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                // console.log(info);
                $('.dropdown-menu').html(template('tpl2', info))
            }
        })
    });
    // 设置内容
    $('.dropdown-menu').on('click', 'a', function () {
        var neiRong = $(this).text();
        $('.dropdown_text').text(neiRong);
        var id = $(this).parent().data('id');
        $('[name="categoryId"]').val(id);
        // 让categoryId的值通过校验
        $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    });

    // 初始化 图片上传
    // 1、引入js文件  2、准备input文本框 name属性 和data-url属性  3、初始化fileupload()
    $('#fileupload').fileupload({
        dataType: 'json',
        // 上传结束后的回调函数
        done: function (e, data) {
            console.log(data.result.picAddr);
            var pic = data.result.picAddr;
            $('.img_box img').attr('src', pic);
            // 给hiden设置一个value值 提交到后台去
            $('[name="brandLogo"]').val(pic);
            // 让brandLogo的值校验成功
            $form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });


    // 表单校验功能
    var $form = $('form');
    $form.bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请选择品牌的名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传品牌的图片'
                    }
                }
            }
        },
        excluded: []
    });

    // 表单校验成功后注册事件
    $form.on('success.form.bv', function (e) {
        // console.log(e);
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#secondModal').modal('hide');
                    // 重新渲染第一页
                    page = 1;
                    render();
                    // 重置表单样式
                    $form.data('bootstrapValidator').resetForm(true);
                    $('.dropdown_text').text('请选择一级分类');
                    $('.img_box img').attr('src','images/none.png');
                }
            }
        })

    })

});