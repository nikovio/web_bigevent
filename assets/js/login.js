$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })


    var form=layui.form
    var layer=layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          repwd:function(value){
              var pwd=$('.reg-box [name=password]').val()
              if(pwd!==value){
                  return'两次密码不一致'
              }
          }
    })

    var data = { username:$('#form_reg [name=username]').val(),
    password:$('#form_reg [name=password]').val() }
    $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.post('/user/register',
    {username:$('#form_reg [name=username]').val(),
    password:$('#form_reg [name=password]').val()},
    function(res){
        if(res.code!==200){
            return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        
    })

})    



 $('#form_login').submit(function(e){
     e.preventDefault()
     $.ajax({
         url:'/user/login',
         method:'POST',
         //快速获取表单中的数据
         data:{ username:$('#form_login [name=username]').val(),
         password:$('#form_login [name=password]').val()},
         success:function(res){
             if(res.code==-200){
                return layer.msg('登录失败')
             }
             layer.msg('登录成功')
            console.log(res.token);
            localStorage.setItem('token',res.token)
        
           
            //  location.href='./index.html'
         }
     })
 })




})