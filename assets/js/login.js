$(function(){
    $(".goto_reg").on("click",function(){
        $(".login").hide()
        $(".reg").show()
    })
    $(".goto_login").on("click",function(){
        $(".reg").hide()
        $(".login").show()
    })

    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            if (value != $("#pwd").val()) return "两次输入密码不一致"
        }
    })
        
    $(".reg").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {username:$(".reg [name=username]").val(),password:$(".reg [name=password]").val()},
            success: function (res) {
                if(res.status != 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                $(".goto_login").click()
            }
        });
    })

    $("#login_form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status != 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                localStorage.setItem("token",res.token)
                location.href = "/index.html"
            }
        });
    })
})