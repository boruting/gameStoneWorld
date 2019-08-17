var totalBiao = require('./biao');
var biao = totalBiao.biao;

var timeTotal = biao.formula[2].time;//time可以是小数不能数零
/**
 * 计时器
 * @param {*} m 多少秒结束
 */
var miao = function (m) {
    var bb = 0;
    var vv = setInterval(tt, 1000);

    function tt() {
        if (bb >= m) {
            clearInterval(vv);
        }
        else {
            bb++
            console.log(bb);
        }
    }
}

/**
 * 
 * 道具制作时间进度
 * @param {*} num 当前进度
 * @param {*} timeTotal 总时长秒单位
 * 
 */
var jindu = function (timeTotal) {
    var num = 0;
    console.log(num + "%");
    var newMS = Math.round((timeTotal * 1000) / 100);// 毫秒单位
    var id = setInterval(frame, newMS);
    function frame() {

        if (num >= 100) {
            clearInterval(id);
        } else {
            num++;

            console.log(num + "%");
        }
    }
}
/**
 * 道具时间判断
 * @param {*} timeTotal 总时长秒单位
 */

var itemTime = function (timeTotal) {
    if ((timeTotal - 1) > 1) {

        timeTotal = timeTotal - 1;
        jindu(timeTotal);

    } else if (timeTotal > 0 && timeTotal <= 0.5) {//小于等于1且不等于0
        //console.log("小于等于 timeTotal= " + (timeTotal))

        jindu(timeTotal);

    } else if (timeTotal > 0.5 && timeTotal <= 1) {

        timeTotal = 0.5;
        jindu(timeTotal);

    } else {
        console.log("err:timeTotal= " + (timeTotal - 1))
        return;
    }
}


itemTime(timeTotal);