$(function () {
    // 发送AJAX请求
    var page = 1;
    var pageSize = 5;
    var id;
    var isDelete;

    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // 获取到数据
                console.log(info);
                // 绑定模板和数据
                var html = template('userTpl', info);
                // console.log(html);
                $('tbody').html(html);
                // 根据返回的数据渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(info.total / info.size),
                    numberOfPages: 5,
                    currentPage: page,
                    // 页码被点击的时候触发
                    onPageClicked: function (a, b, c, p) {
                        console.log(p);
                        // 修改page的值，然后重新渲染
                        page = p;
                        render();
                    }
                });
            }
        });
    }

    render();

    // 启用禁用功能
    $('tbody').on('click', '.btn', function () {
        // console.log(1);
        // 显示模态框
        $('#userModal').modal('show');
        id = $(this).parent().data('id');
        // console.log(id);
        isDelete = $(this).hasClass('btn-success') ? '1' : '0';
        // console.log(isDelete);
    });
    $('.btn_confirm').on('click', function () {
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    $('#userModal').modal('hide');
                    render();
                }
            }
        });

    })


});