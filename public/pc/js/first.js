$(function () {
    // 渲染列表和分页
    var page = 1;
    var pageSize = 4;
    var render = function () {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var html = template('firstTpl', info);
                $('tbody').html(html);
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
    $('.btn_add').on('click', function () {
        $('#firstModal').modal('show');
    })

    // 初始化表单校验
    var $form = $('form');
    $form.bootstrapValidator({
        // 小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验规则
        fields: {
            categoryName: {
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '一级分类的名称不能为空'
                    }
                }
            }
        }
    });


    // 给表单注册校验成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $form.serialize(),
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    $('#firstModal').modal('hide');
                    // 重置表单的内容和样式
                    $form.data('bootstrapValidator').resetForm(true);
                    // 重新渲染第一页
                    page=1;
                    render();
                }
            }
        })
    })
});