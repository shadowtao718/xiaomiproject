// 轮播图片
let slider = document.querySelector(".slider");
let pages = document.querySelectorAll(".page");
let num = 1;

function goNext() {
    num++;
    if (num == 6) {
        num = 1;
    }
    slider.src = `img/banner${num}.jpg`;
    document.querySelector(".page.active").classList.remove("active");
    pages[num - 1].classList.add("active");
}

let timer = setInterval(goNext, 2000);
let prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    num--;
    if (num == 0) {
        num = 5;
    }
    slider.src = `img/banner${num}.jpg`;
    document.querySelector(".page.active").classList.remove("active");
    pages[num - 1].classList.add("active");
});

let nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", function (e) {
    e.preventDefault();

    goNext();
});

pages.forEach(function (item, index) {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        num = index + 1;
        slider.src = `img/banner${num}.jpg`;
        document.querySelector(".page.active").classList.remove("active");
        item.classList.add("active");

    });
    item.addEventListener("mouseover", function () {
        clearInterval(timer);
    });
    item.addEventListener("mouseout", function () {
        timer = setInterval(goNext, 2000);
    });
});

//小米闪购
//到计时
function showTime() {
    let nowDate = new Date();
    let endDate = new Date("2020-8-5 00:00:00");

    let endTime = endDate.getTime();
    let nowTime = nowDate.getTime();

    let timeMinus = Math.abs(endTime - nowTime);

    let day = parseInt(timeMinus / 1000 / 3600 / 24); //剩余天数
    let hour = parseInt(timeMinus / 1000 / 3600); //剩余小时
    if (hour < 10) {
        hour = "0" + hour;
    }
    let min = parseInt(timeMinus / 1000 / 60) % 60; //剩余多少分钟
    if (min < 10) {
        min = "0" + min;
    }
    let sec = parseInt(timeMinus / 1000) % 60; //剩余秒数
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (sec >= 0) {
        document.querySelector(".hour").innerHTML = hour;
        document.querySelector(".min").innerHTML = min;
        document.querySelector(".sec").innerHTML = sec;
    }
    setTimeout(showTime, 1000);
}
showTime();

//  小米闪购轮播图
//  自动轮播
let box4 = document.querySelector(".footer>.box4");
let box5 = document.querySelector(".footer>.box4>.box5");
let box = document.querySelectorAll(".footer>.box4>.box5>li")
let timer1;
let len = box.length / 4; //跳转的次数
let itemIndex = 0; //从0开始计算
let start2 = function () {
    timer1 = setInterval(function (e) {
        let movelen = 0;
        itemIndex++;
        if (itemIndex == len) {
            movelen = 0;
            itemIndex = 0;
        } else {
            movelen = itemIndex * 1000;
        }
        box5.style.left = -movelen + "px";
    }, 3000)
}
window.addEventListener("load", function () {
    start2();
});
box4.addEventListener("mouseenter", function () {
    clearInterval(timer1);
});
box4.addEventListener("mouseleave", function () {
    start2();
})
//按钮前后翻页
let pre2 = document.querySelector(".pre1");
let next2 = document.querySelector(".next1");
pre2.addEventListener("click", function () {
    clearInterval(timer1);
    if (itemIndex >= 1) {
        itemIndex--;
        movelen = itemIndex * 1000;
    }
    box5.style.left = -movelen + "px";
    start2();
});
next2.addEventListener("click", function () {
    clearInterval(timer1);
    if (itemIndex == len - 1) {
        itemIndex = 0;
    } else {
        itemIndex++;
        movelen = itemIndex * 1000;
    }
    box5.style.left = -movelen + "px";
    start2();
})


//  tab切换
let tabActive = document.querySelectorAll(".pages");
console.log(tabActive);
tabActive.forEach(function (item, index) {
    item.addEventListener("mouseover", function (e) {
        e.preventDefault();
        if (!item.classList.contains("active")) {
            // debugger;
            let curIndex = item.dataset.id; //当前的索引

            let parent = item.parentElement.parentElement.parentElement.parentElement.parentElement;

            let btn = parent.querySelectorAll(".btn");
            parent.querySelector(".pages.active").classList.remove("active");
            item.classList.add("active");
            // 让所有的box隐藏，只显示对应的一个
            btn.forEach(function (item) {
                item.style.display = "none";
            });
            parent.querySelector(".btn" + curIndex).style.display = "flex";
        }
    });
});