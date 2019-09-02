//var totalBiao = require('./biao');
itemForm = [
    {
        id: 1001,
        name: "铁矿石",
        icon: "tiekuangshi.png",
        weight: 1
    },
    {
        id: 1002,
        name: "铜矿石",
        icon: "tongkuangshi.png",
        weight: 1
    }
    ,
    {
        id: 1003,
        name: "金矿石",
        icon: "jinkuangshi.png",
        weight: 1
    }
];
// itemForm.item_1001 = {
//     id:1001,
//     name:"铁矿石",
//     icon:"tiekuangshi.png",
//     weight:1

// }
/**
 * 获得道具
 */
var bagItemList = [];
var getItem = function (itemID, quantity) {

    //var item = itemID;
    var bagItem = {};
    //console.log(bagItem);
    bagItem.name = itemID.name;
    //console.log(bagItem.name);
    bagItem.icon = itemID.icon;
    bagItem.quantity = quantity;
    //判断下 bagItemList 下有没有新获得到这个道具 有到话在 修改原来到数量
    if (bagItemList.length > 0) {
        for (var i = 0; i < bagItemList.length; i++) {
            if (bagItemList[i].name == bagItem.name) {
                console.log(bagItemList[i].name);
                bagItemList[i].quantity = bagItemList[i].quantity + bagItem.quantity;
                return bagItemList;
            }
        }
    }
    bagItemList.push(bagItem);

    return bagItemList;
    //console.log(bagItem);
    //return bagItem;
}
var id = 1001;
var getItemForm = function (itemForm, id) {
    for (var i = 0; i < itemForm.length; i++) {
        if (itemForm[i].id === id) {
            return itemForm[i];
        }

    }
    console.log("没找到ID为：" + id + "的道具");

}

//console.log(getItemForm(itemForm, 1003));
// console.log(getItem(getItemForm(itemForm, 1003), 3)[0]);
// console.log(getItem(getItemForm(itemForm, 1001), 3)[1]);
// console.log(getItem(getItemForm(itemForm, 1002), 2));
//处理道具数量
var itemUse = function(use){

    var item_0 = bagItemList[0];
    if(item_0.quantity>=use){

        item_0.quantity = item_0.quantity - use;

    }else{
        console.log("道具不足 失败");
        //return ; 
    }
    
    console.log(item_0);
}


var onclickObj = function(id){
    //var id = 1001;//当前对象掉落id 固定
    var quantity = 3;//当前对象掉落道具的数量 数量需要做概率处理
    getItem(getItemForm(itemForm, id), quantity);
    console.log(bagItemList[0].name);
    console.log(bagItemList[0].quantity);
}
onclickObj(1001);
onclickObj(1001);
//itemUse(4);
/**
 * 主程序
 * 暂时显示几个按钮就可以了 每次点击触发 test() 这个函数 
 * 每个按钮相当与一个有掉落的对象 
 * btn_1 onclickObj(1001);
 * btn_2 onclickObj(1002);
 * btn_3 onclickObj(1003);
 * 需要个html做显示
 */


/**
 * 背包或仓库
 */

/**
 * 人物携带
 */