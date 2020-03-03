

// 导航条
    getList()

    function getList() {
      $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
          // console.log(res)

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


    // 轮播图纵向导航条

    function getList2 () {

      $.ajax({
        // 获取数据：
        url: "../lib/nav.json",
        dataType: "json",
  
        // 渲染
        success: function (res) {
          // console.log(res)
          let str1 = "";
          res.forEach(ele => {
            str1 += `<li>${ele.name}</li>`
  
            $(".site-category")
              .html(str1)
              .children("li")
              .on({
                mouseenter: () => $(".ban_box").css("display", "block"),
                mouseleave: () => $(".ban_box").css("display", "none")
              })
              .on("mouseover", function () {
                let index = $(this).index()
                // console.log(index)
                let list = res[index].list
                let str2 = ""
                list.forEach(ele => {
                  str2 += `<li><img
                  src=${ele.list_src}
                  alt="">
                  <span>${ele.list_name}</span></li>`
                })
                $(".ban_box>ul").html(str2)
              })
          })
          $(".ban_box")
            .on({
              mouseenter: () => $(".ban_box").css("display", "block"),
              mouseleave: () => $(".ban_box").css("display", "none")
            })
        }
  
      })
  
    }
    getList2()
  

    // 小米闪购
    function shanggou () {
      $.ajax({
        url: "../lib/xiaomishanggou.json",
        dataType: "json",
        success: function (res) {
          let str = ""
          res.forEach(function (ele) {
            str += ` <div class="swiper-slide">
            <div class="img">
                <img src="${ele.src}" alt="">
            </div>
            <p class="name">${ele.name}</p>
            <p class="text">${ele.desc}</p>
            <p><mark>${ele.price}</mark><i>${ele.price}元</i></p>
        </div>`
          })
          $("main .page-main .container .swiper-wrapper").html(str)
  
        }
  
      })
    }
    shanggou()
 
     // 手机
     function phone () {
      $.ajax({
        url: "../lib/phone.json",
        dataType: "json",
        success: function (res) {
          let str = ""
          res.forEach(function (ele) {
            str += `<li><a href="#">
            <div class="figuer_img">
                <img src="${ele.src}"
                    alt="">
            </div>
            <h3 class="title">
            ${ele.name}
            </h3>
            <p class="desc">${ele.desc}</p>
            <p class="price"><span class="num">${ele.price}</span>元<span>起</span>
            </p>
        </a></li>`
          })
          // console.log(str)
          $(".span4>ul").html(str)
        }
      }).then(function () {
        // console.log($(".body>.shangou>section>.img>li"))
      })
    }
    phone()