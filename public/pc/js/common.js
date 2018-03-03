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
    })


});