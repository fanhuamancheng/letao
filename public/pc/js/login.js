// 等待页面加载完成，防止全局变量污染
$(function () {
    // 表单验证
    $("form").bootstrapValidator({
        // 要求：用户名不为空 密码不为空 密码的长度6到12位
        // 配置字段
        fields: {
            // 配置form中的name属性
            username: {
                // 配置校验器的校验规则
                validators: {
                    // 非空规则
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '长度应该在2到6位'
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '长度应该在6到12位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        },
        // 配置小图标:成功 失败 校验中
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }

    });
    // 表单验证成功事件,阻止表单的默认提交，使用ajax进行提交
    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        // console.log(1);
        // 发送ajax请求
        // console.log($('form').serialize());
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.error == 1000) {
                    // alert('用户名错误')
                    $('form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                }
                if (info.error == 1001) {
                    // alert('密码错误')
                    $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if (info.success) {
                    location.href = 'index.html';
                }
            }
        })
    });
    $('[type="reset"]').on('click', function () {
        $('form').data('bootstrapValidator').resetForm();
    })
});