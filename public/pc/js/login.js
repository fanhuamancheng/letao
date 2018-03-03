// 等待页面加载完成，防止全局变量污染
$(function () {
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
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'长度应该在2到6位'
                    }
                }
            },
            password: {
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'长度应该在6到12位'
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

    })
});