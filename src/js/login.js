window.onload = function() {
    $(".box>p span").click(function() {
        $(this).css({ color: "#f56600" }).siblings("span").css({ color: "#666" })
        $(".box>div").eq($(this).index()).css({ display: "flex" }).siblings("div").css({ display: "none" });
    });
    $(".box div:nth-of-type(1) input").focus(function() {
        $(this).css({ borderColor: "#ff6700" });
    });
    $(".box div:nth-of-type(1) input").blur(function() {
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
                success: function(res) {
                    alert(res);
                }
            })
        } else {
            alert("请输入合法用户名和密码");
        }
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
                success: function(res) {
                    alert(res);
                }
            })
        } else {
            alert("用户名和密码不能为空");
        }
    });
}