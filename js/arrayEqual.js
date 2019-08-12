/**
 * 转换到JSON字符串
 * @param {*} value 对象内容
 */
function copy(value) {
    return JSON.parse(JSON.stringify(value));
}
/**
 * 
 * 比对2个数组是否相同（包含位子不同）
 * @param {*} value1 数组1
 * @param {*} value2 数组2
 */
function isArrayEqual(value1 = [], value2 = []) {
    //var hash = JSON.parse(JSON.stringify(value2));
    var hash = copy(value2);
    if (value1.length === value2.length) {
        for (var i = 0; i < value1.length; i++) {
            const index = hash.indexOf(value1[i]);
            if (index > -1) {
                hash.splice(index, 1);
            } else {
                return false;
            }
        }

        return true;
    }

    return false;
}
// export {
//     isArrayEqual
//    }
module.exports = {
    isArrayEqual
     }