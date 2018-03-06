$(function () {
    // 禁用进度环
    NProgress.configure({
        showSpinner: false
    });
    // 进度条
    // NProgress.start();
    // setTimeout(function () {
    //     NProgress.done();
    // }, 500);
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        NProgress.done();
    });

    // 发送请求检查是否登录,前提是当前页面不是登录页
    if (location.href.indexOf('login.html') == -1) {
        $.ajax({
            type: 'get',
            url: '/employee/checkRootLogin',
            success: function (info) {
                // console.log(info);
                if (info.error == 400) {
                    location.href = 'login.html';
                }
            }
        });
    }


    // 二级菜单切换显示与隐藏
    $('.second').prev().on('click', function () {
        $(this).next().slideToggle();
    });

    $('.icon_menu').on('click', function () {
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
        $('.main_header').toggleClass('now');
    });
    // 退出功能
    $('.icon_logout').on('click', function () {
        // console.log(1);
        $('#Modal').modal('toggle');
    });
    $('.btn_logout').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    location.href = 'login.html';
                }
            }
        })
    })

});