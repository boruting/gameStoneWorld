// import { isArrayEqual } from './arrayEqual';
var totalBiao = require('./biao');
var arrayEqual = require('./arrayEqual');

var biao = totalBiao.biao;
var isArrayEqual = arrayEqual.isArrayEqual;
//================================================================================================================================================


var materialArr = ["野猪肉", "火堆", "烤架"];//材料数组


/**
 * 
 * @param {*} formula JSON配方
 * @param {*} materialArr 材料数组
 */

var getNewItem = function (formula, materialArr) {

    //需要循环配方
    for (var i = 0, len = formula.length; i < len; i++) {

        var formulaArr = formula[i].value;//配方数组
        var newItem = formula[i].key;//新道具
        var itemID = formula[i].id;//道具id
        var zhengjia = isArrayEqual(formulaArr, materialArr);
        if (zhengjia == true) {

            console.log("获得： " + newItem + " id: " + itemID);

            return newItem;
        } else {
            console.log("000000");
        }
    }



}
//getNewItem(biao.formula, materialArr);
//=================================================
/**
 * JSON 表
 */
// var mJson = $.ajax({ url: "api.json", async: false });
// var temp = JSON.parse(mJson.responseText);

// var scripts = document.getElementsByTagName("script"); 
// var file = scripts[scripts.length - 1].getAttribute("src");
