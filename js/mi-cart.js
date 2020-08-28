// 全选
let checkAll = document.querySelector(".select-all");
// 商品checkbox
let checkboxItems = document.querySelectorAll(".item-checkbox");

// 点击全选checkbox
checkAll.addEventListener("change", function (e) {


    if (checkAll.checked) {
        checkboxItems.forEach(function (item) {
            let parentBox = item.parentElement.parentElement.parentElement;
            item.checked = true;
            parentBox.classList.add("selected");
        });

        selGoodsCount();
    } else {
        checkboxItems.forEach(function (item) {
            item.checked = false;
            let parentBox = item.parentElement.parentElement.parentElement;
            parentBox.classList.remove("selected");
            document.querySelector("#selTotalNum").innerHTML = 0;
            document.querySelector("#cartTotalPrice").innerHTML = 0;
        });
    }
});

checkboxItems.forEach(function (item) {
    item.addEventListener("change", function () {
        let parentBox = item.parentElement.parentElement.parentElement;
        if (item.checked) {
            parentBox.classList.add("selected");
            let selectedLen = document.querySelectorAll(".item-box.selected").length;
            let boxLen = document.querySelectorAll(".item-box").length;
            if (selectedLen == boxLen) {
                checkAll.checked = true;
            }
        } else {
            checkAll.checked = false;
            parentBox.classList.remove("selected");
        }
        selGoodsCount();
    });
});

// 计算购物车已选择商品数量和订单金额
function selGoodsCount() {
    let selGoodsCount = 0;
    let cartTotalPrice = 0;
    document.querySelectorAll(".item-box.selected").forEach(function (item) {
        let goodsCount = parseInt(item.querySelector(".goods-num").value.trim());
        selGoodsCount += goodsCount;
        let goodsPrice = parseFloat(item.querySelector(".col-total span").innerText);
        cartTotalPrice += goodsPrice;
    });
    document.querySelector("#selTotalNum").innerHTML = selGoodsCount;
    document.querySelector("#cartTotalPrice").innerHTML = cartTotalPrice.toFixed(2);
}

// 购物车商品总数
function cartTotalCount() {
    let goodsTotalCount = 0;
    document.querySelectorAll(".item-box").forEach(function (item) {
        let goodsCount = parseInt(item.querySelector(".goods-num").value.trim());
        goodsTotalCount += goodsCount;
    });
    document.querySelector("#cartTotalNum").innerHTML = goodsTotalCount;
}


let numPlus = document.querySelectorAll(".num_plus");
numPlus.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        let numEle = item.previousElementSibling;
        let num = parseInt(numEle.value.trim());
        num++;
        if (numEle.dataset.max != null) {
            let numMax = parseInt(numEle.dataset.max);
            if (num > numMax) {
                alert("当前商品最多可以添加" + numMax + "件");
                num = numMax;
            }
        }

        numEle.value = num;
        let parentRow = item.parentElement.parentElement.parentElement;
        let price = parseFloat(parentRow.querySelector(".col-price span").innerHTML);
        let xiaoji = price * num;
        xiaoji = xiaoji.toFixed(2);
        parentRow.querySelector(".col-total span").innerHTML = xiaoji;
        cartTotalCount();
        let checkItem = parentRow.querySelector(".item-checkbox");
        if (checkItem.checked) {
            selGoodsCount();
        }
    });
});

let numMinus = document.querySelectorAll(".num_minus");
numMinus.forEach(function (item) {
    item.addEventListener("click", function (e) {
        let parentRow = item.parentElement.parentElement.parentElement;
        e.preventDefault();
        let numEle = parentRow.querySelector(".goods-num");
        let num = parseInt(numEle.value.trim());
        num--;
        if (num == 0) {
            alert("亲，商品数量不能为0哦");
            num = 1;
        }
        numEle.value = num;
        // 计算小计

        // 获取商品的单价
        let price = parseFloat(parentRow.querySelector(".col-price span").innerHTML);
        let xiaoji = price * num;
        xiaoji = xiaoji.toFixed(2);
        parentRow.querySelector(".col-total span").innerHTML = xiaoji;
        cartTotalCount();
        let checkItem = parentRow.querySelector(".item-checkbox");
        if (checkItem.checked) {
            selGoodsCount();
        }
    });
});

// 直接修改商品数量
let goodsNumInput = document.querySelectorAll(".goods-num");
goodsNumInput.forEach(function (item) {
    item.addEventListener("blur", function (e) {
        let parentRow = item.parentElement.parentElement.parentElement;
        let num = item.value.trim();
        let reg = /^[1-9][0-9]*$/g;
        if (reg.test(num)) {
            num = parseInt(num);
            item.value = num;
        } else {
            alert("请输入合法的数字");
            item.value = 1;
            num = 1;
        }

        if (item.dataset.max != null) {
            let numMax = parseInt(item.dataset.max);
            if (num > numMax) {
                alert("当前商品最多可以添加" + numMax + "件");
                item.value = numMax;
            }
        }

        // 修改商品小计
        // 获取商品的单价
        let price = parseFloat(parentRow.querySelector(".col-price span").innerHTML);
        let xiaoji = price * num;
        xiaoji = xiaoji.toFixed(2);
        parentRow.querySelector(".col-total span").innerHTML = xiaoji;
        cartTotalCount();
        let checkItem = parentRow.querySelector(".item-checkbox");
        if (checkItem.checked) {
            selGoodsCount();
        }
    });
});

// 删除商品
let delGoods = document.querySelectorAll(".del-goods");
delGoods.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".mask").style.display = "block";


        let popupfalse = document.querySelector(".popup-false");
        popupfalse.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(".mask").style.display = "none";
        });


        let closepopup = document.querySelector(".close-popup");
        closepopup.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(".mask").style.display = "none";
        });


        let popuptrue = document.querySelector(".popup-true")
        popuptrue.addEventListener("click", function (e) {
            e.preventDefault();

            let parentBox = item.parentElement.parentElement.parentElement;
            let checkItem = parentBox.querySelector(".item-checkbox");
            parentBox.remove();
            if (checkItem.checked) {
                selGoodsCount();
            }
            cartTotalCount();
            document.querySelector(".mask").style.display = "none";
        });

    });

    window.addEventListener("load", function () {
        cartTotalCount();
    });
})