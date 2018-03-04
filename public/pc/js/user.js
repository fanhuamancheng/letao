$(function () {
    // 发送AJAX请求
    var page = 1;
    var pageSize = 5;

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


});