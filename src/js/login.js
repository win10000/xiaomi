window.onload = function () {
    $(".box>p span").click(function () {
        $(this).css({ color: "#f56600" }).siblings("span").css({ color: "#666" })
        $(".box>div").eq($(this).index()).css({ display: "flex" }).siblings("div").css({ display: "none" });
    });
    $(".box div:nth-of-type(1) input").focus(function () {
        $(this).css({ borderColor: "#ff6700" });
    });
    $(".box div:nth-of-type(1) input").blur(function () {
        $(this).css({ borderColor: "#e0e0e0" });
    });


    function returnDefault(e) {
        var e = e || event;
        return e.preventDefault();
    }

    function setCookie(key, value, expires) {
        if (expires) {
            let d = new Date();
            let t = d.setTime(d.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires);
            document.cookie = `${key}=${value};expires=${t}`;
        } else {
            document.cookie = `${key}=${value}`;
        }
    }

    function getCookie(key) {
        let str = document.cookie;
        let arr = str.split("; ");
        for (let i = 0; i < arr.length; i++) {
            let newArr = arr[i].split("=");
            if (key === newArr[0]) {
                return newArr[1];
            }
        }
    }

    let uReg = /^\w{1,6}$/;
    let pReg = /^\w{1,12}$/;
    let flag = false;
    let newFlag = false;
    $("input[name=name]").blur(() => {
        if (pReg.test($("input[name=name]").val())) {
            flag = true;
        } else {
            $(".box div:nth-of-type(1) i").text("您输入的用户名不合法");
            flag = false;
        }
    });
    $("input[name=pwd]").blur(() => {
        if (pReg.test($("input[name=pwd]").val())) {
            newFlag = true;
        } else {
            $(".box div:nth-of-type(1) i").text("您输入的用户名不合法");
            newFlag = false;
        }
    });
    $("button:eq(1)").click((e) => {
        returnDefault(e);
        if (flag && newFlag) {
            $.ajax({
                url: "/gx",
                dataType: "text",
                data: {
                    username: `${$("input[name=name]").val()}`,
                    password: `${$("input[name=pwd]").val()}`
                },
                success: function (res) {
                    alert(res);
                }
            })
        } else {
            alert("请输入合法用户名和密码");
        }
        window.location.href = './index.html'
    });
    $("button:eq(0)").click((e) => {
        returnDefault(e);
        if (flag && newFlag) {
            $.ajax({
                url: "/gx2",
                dataType: "text",
                data: {
                    username: `${$("input[name=name]").val()}`,
                    password: `${$("input[name=pwd]").val()}`
                },
                success: function (res) {
                    alert(res);
                }
            })
        } else {
            alert("用户名和密码不能为空");
        }
        window.location.href = './index.html'
    });




    // 4. 发送请求
    //   把用户名和密码发送到后端
    // 4-1. 创建 ajax 对象
    var xhr = new XMLHttpRequest()

    // 4-2. 配置本次请求的信息
    xhr.open('POST', './login.php')

    // 4-3. 接受响应
    xhr.onload = function () {
        var res = JSON.parse(xhr.responseText)

        if (res.code === 0) {
            // 提示错误
            // alert('用户名或密码错误')
            // 让这个 span 标签显示出来就可以了
            errorInfo.style.display = 'block'
        } else {
            window.location.href = './cart.html'
        }

    }

    // 4-4. 设置请求头
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

    // 4-5. 发送请求
    //      在 () 里面携带参数
    // xhr.send('username=' + uname + '&password=' + upass)
    xhr.send(`username=${uname}&password=${upass}`)






}