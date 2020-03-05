window.onload = function() {
    let num = 0;
    let n = 0;

    function remove() {
        if (num === 0) {
            $("main>div").css({ display: "none" });
            $("main").css({ paddingTop: "490px", background: "rgb(245, 245, 245) url(../images/cart_bg.png) center top no-repeat" });
            $("main>fieldset legend").text("为您推荐");
        } else {
            $("main>div").css({ display: "flex" });
            $("main").css({ paddingTop: 0, background: "rgb(245, 245, 245)" });
            $("main>fieldset legend").text("买购物车中商品的人还买了");
        }
    }
    remove();
    $("ul>li").attr({ flag: false });

    function hidden(obj, callback) {
        $(`${obj}`).click(function() {
            $(".del").css({ top: "-300px" });
            $(".cover").css({ display: "none" });
            if (callback) {
                callback();
            }
        })
    }
    hidden(".del>em");
    hidden(".cover", function() {
        $(".settle").css({ top: "-1000px" });
    });
    $.ajax({
        url: "../lib/cart.json",
        dataType: "json",
        success: function(res) {
            let list = res;
            let str = ``;
            for (let i = 0; i < list.name.length; i++) {
                str += `<li><img src="${list.imgSrc[i]}"><p>${list.name[i]}</p><span><span>${list.price[i]}</span>元</span><strong>${list.praise[i]}人好评</strong><i>加入购物车</i></li>`;
                $("main>fieldset>ul").html(str);
            }

        }
    })
    $("main>fieldset>ul").on("click", "i", function() {
        num += 1;
        $("main>ul").append($(`<li><input type="checkbox"><img src="${$(this).parent().children("img").attr("src")}"><span>${$(this).parent().children("p").text()}</span><strong><span><span>${$(this).parent().children("span").children("span").text()}</span>元</span></strong><p><b>-</b><span>1</span><em>+</em></p><span><span>${$(this).parent().children("span").children("span").text()}</span>元</span><i>X</i></li>`));
        $("main>ul li").last().prop({ newflag: false })
        remove();
        if (!$("main>div:nth-of-type(2)>p span:eq(0)").text()) {
            $("main>div:nth-of-type(2)>p span:eq(0)").text(1)
        } else {
            $("main>div:nth-of-type(2)>p span:eq(0)").text(Number($("main>div:nth-of-type(2)>p span:eq(0)").text()) + 1);
        }
        let m = 0;
        for (let i = 0; i < num; i++) {
            m += Number($("main>ul").children("li").eq(i).children("p").children("span").text());
            n = m;
        }
        m = 0;
        $("main>div:nth-of-type(2)>p span:eq(0)").text(n);
    })
    $("main>ul").on("click", "i", function() {
        $(this).parent().attr({ flag: true }).siblings("li").attr({ flag: false });
        $(".del").css({ top: "40px" });
        $(".cover").css({ display: "block" });

    })
    hidden(".del>p span:nth-of-type(1)");
    hidden(".del>p span:nth-of-type(2)", function() {
        num -= 1;
        $("li[flag=true]").remove();
        if (num === 0) {
            remove();
        }
        let m = 0;
        for (let i = 0; i < num; i++) {
            m += Number($("main>ul").children("li").eq(i).children("p").children("span").text());
            n = m;
        }
        m = 0;
        $("main>div:nth-of-type(2)>p span:eq(0)").text(n);
    });
    $("main>ul").on("click", "em", function() {
        if (Number($(this).prev("span").text()) >= 10) {
            $(this).prev("span").text(10);
            alert("您所购买的商品数量已达上限");
        } else {
            $(this).prev("span").text(Number($(this).prev("span").text()) + 1);
        }

        let m = 0;
        for (let i = 0; i < num; i++) {
            m += Number($(this).parents("ul").children("li").eq(i).children("p").children("span").text());
            n = m;
        }
        m = 0;
        $("main>div:nth-of-type(2)>p span:eq(0)").text(n);
        $(this).parents("li").children("span").eq(1).children("span").text((Number($(this).prev("span").text()) * $(this).parents("li").children("strong").children("span").children("span").text()).toFixed(2));
    })


    $("main>ul").on("click", "b", function() {
        if (Number($(this).next("span").text()) <= 1) {
            $(this).next("span").text(1);
        } else {
            $(this).next("span").text(Number($(this).next("span").text()) - 1)
        }
        let m = 0;
        for (let i = 0; i < num; i++) {
            m += Number($(this).parents("ul").children("li").eq(i).children("p").children("span").text());
            n = m;
        }
        m = 0;
        $("main>div:nth-of-type(2)>p span:eq(0)").text(n);
        $(this).parents("li").children("span").eq(1).text((Number($(this).next("span").text()) * $(this).parents("li").children("strong").children("span").children("span").text()).toFixed(2));
    })
    let x = 0;
    $("main>div:nth-of-type(1) span:eq(0)").click(function() {
        $(this).parents("main").children("ul").children().children("input").prop({ checked: true });
        let m = 0;
        for (let i = 0; i < num; i++) {
            m += Number($(this).parents("main").children("ul").children().eq(i).children("span").eq(1).children("span").text());
            x = m;
        }
        m = 0;
    })
    $("main>ul").on("click", "input", function() {
        if (!$(this).parent.prop("newFlag")) {
            $(this).parent.prop({ newflag: true });
        } else {
            $(this).parent.prop({ newflag: false });
        }


    })
    $("main>div:nth-of-type(2)>span:nth-of-type(1)").click(function() {
        $(".settle").css({ top: 0 }).children().text(x);
        $(".cover").css({ display: "block" });
    })


}