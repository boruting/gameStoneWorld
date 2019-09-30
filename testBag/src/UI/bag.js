export default class bag extends Laya.Script {

    constructor() {
        super();

    }

    onEnable() {

        let item_add = this.owner.getChildByName("bag_0").getChildByName("item_add");//添加道具按钮
        let bagLlist = this.owner.getChildByName("bag_0").getChildByName("bagLlist");
        let bag_0 = this.owner.getChildByName("bag_0");
        //bagLlist.selectEnable = true;

        //bagLlist.renderHandler = new Laya.Handler(this, this.updateItem);
        //bagLlist.selectHandler = new Laya.Handler(this, this.onSelect);
        
       

        item_add.on(Laya.Event.CLICK, this, this.onclickObj);

        Laya.loader.load("json/daoju.json", null, null, Laya.Loader.JSON);
        bag_0.addChild(bagLlist);
    }
    updateItem(cell, index) {
        cell.setImg(cell.dataSource);
    }
   onSelect(index) {
        console.log("当前选择索引：" + index);
    }

    onclickObj() {

        let itemForm = Laya.loader.getRes("json/daoju.json");// 获取到道具表JSON文件
        //console.log(itemForm);
        //let itemNum = this.owner.getChildByName("itemNum");
        let textInput = this.owner.getChildByName("bag_0").getChildByName("itemNum").getChildByName("input");
        let textID = this.owner.getChildByName("bag_0").getChildByName("itemID").getChildByName("input");
        var quantity = textInput.text;//当前对象掉落道具的数量 数量需要做概率处理
        let id = textID.text;
        // console.log(id);
        this.slotData(this.getItemForm(itemForm, id), quantity);


    }
    getListData(){
        arr = [];
        for (var i  = 1; i <= 16; i++) {
            arr.push({listNumber: {text:i}});
           }
    }
    slotData(itemDate, quantity) {
        let bagLlist = this.owner.getChildByName("bag_0").getChildByName("bagLlist");
        let solt_itemDate = itemDate;
        for (let i = 0; i < bagLlist.cells.length; i++) {
            //处理道具数量
            if (a === undefined) {
                solt_itemDate.quantity = quantity;//添加获得的道具 数量
            } else {
                solt_itemDate.quantity = a;//添加道具大于上限的 数量
            }
            let slot = bagLlist.cells[i];//当前格子
            let itemIcon = slot.getChildByName("icon");//格子道具图标
            let itemNum = slot.getChildByName("itemNum");//格子道具数量
            //let itemName = slot.getChildByName("itemName");//格子道具名字
            let num = Number(itemNum.text) + Number(solt_itemDate.quantity);//新获得和原有的数量总
            //修改格子内容
            if (slot.solt_itemDate != undefined) {
                if (slot.solt_itemDate.id === solt_itemDate.id) {
                    console.log("格子内存在相同道具");
                    //存在相同道具只修改数量
                    //console.log(num);
                    if (num > 99) {
                        var a = num - 99;//大于上限的数量
                        itemNum.text = 99;//添加道具数量
                        continue;
                    }

                    itemNum.text = Number(itemNum.text) + Number(solt_itemDate.quantity);//添加道具数量

                    //console.log("B");
                    return;
                }
                console.log("格子内存在道具");
                continue;
            }
            itemIcon.skin = "ui/icon/" + solt_itemDate.res_name + ".png";//添加道具图标

            //itemName.text = solt_itemDate.name;//添加道具名字
            if (num > 99) {
                var a = num - 99;
                itemNum.text = 99;//添加道具数量
                slot.solt_itemDate = solt_itemDate;//添加道具数据
                continue;
            }
            itemNum.text = solt_itemDate.quantity;//添加道具数量

            slot.solt_itemDate = solt_itemDate;//添加道具数据
            return;

        }
    }
    getItemForm(itemForm, id) {
        for (var i = 0; i < itemForm.length; i++) {
            if (itemForm[i].id === id) {
                return itemForm[i];
            }

        }
        console.log("没找到ID为：" + id + "的道具");

    }
    onDisable() {
    }
}