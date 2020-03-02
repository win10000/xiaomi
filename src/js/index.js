var sInfo = ["小米9", "Redmi K20 Pro", "Redmi K20", "Redmi Note7 Pro", "Redmi Note7", "小米电视4c", "电视32英寸", "笔记本pro", "小爱音响", "净水器"];

    // $(".header-search form input").focus(function() {
    //     for (var i = 0; i < sInfo.length; i++) {
    //         $(".header-search form search-hot-words a").eq(i).text(sInfo[i]);
    //     }
    //     $(".header-search form").css({ border: "1px solid #ff6700" }).children("search-btn").css({ borderLeft: "1px solid #ff6700" }).siblings("a").fadeOut(100, "linear").siblings("search-hot-words").css({ display: "flex" });

    // })
    // $(".header-search form input").blur(function() {
    //     $(".header-search form").css({ border: "1px solid #e0e0e0" }).children("search-btn").css({ borderLeft: "1px solid #e0e0e0" }).siblings("a").fadeIn(100, "linear").siblings("search-hot-words").css({ display: "none" });
    // })

    getList()

    function getList() {
      $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
          console.log(res)

          // 4-1. 准备一个空字符串
          let str = ''

          // 4-2. 渲染一级的 li
          res.forEach(item => {
            str += `<li>${ item.name }</li>`
          })

          // 4-3. 填充到 nav_top 里面的 ul 里面
          $('.header-nav > ul')
            .html(str)
            .on({
              mouseenter: () => $('.nav_box').stop().slideDown(),
              mouseleave: () => $('.nav_box').stop().slideUp()
            })
            .children('li') // 找到所有的一级菜单下的 li
            .on('mouseover', function () {
              // 5-1. 知道自己移入的时哪一个 li
              const index = $(this).index()
              // 5-2. 找到要渲染的数组
              const list = res[index].list
              // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
              let str = ''

              // 5-4. 进行组装
              list.forEach(item => {
                str += `
                  <li>
                    <div>
                      <img src="${ item.list_url }" alt="">
                    </div>
                    <p class="title">${ item.list_name }</p>
                    <span class="price">${ item.list_price }</span>
                  </li>
                `
              })

              // 5-5. 填充到页面里面
              $('.nav_box > ul').html(str)
            })

          // 4-4. 给 nav_box 添加一个移入移出事件
          $('.nav_box')
            .on({
              mouseover: function () { $(this).finish().show() },
              mouseout: function () { $(this).finish().slideUp() }
            })
        }
      })
    }