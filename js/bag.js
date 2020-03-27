export default class bag extends Laya.Script {

    constructor() {
        super();
        console.log(this.bg_0);
    }

    onEnable() {

        let item_add = this.owner.getChildByName("bag_0").getChildByName("item_add");//添加道具按钮
        let bagLlist = this.owner.getChildByName("bag_0").getChildByName("bagLlist");
        let bag_0 = this.owner.getChildByName("bag_0");
        //bagLlist.selectEnable = true;
        let shuaxin = this.owner.getChildByName("bag_0").getChildByName("shuaxin");
        //bagLlist.renderHandler = new Laya.Handler(this, this.updateItem);

        var arr = [];
        for (let i = 0; i < 16; i++) {
            arr.push({});
        }
        bagLlist.array = arr;

        bag_0.addChild(bagLlist);

        bagLlist.cells[0].getChildByName("slot_sel").visible = true;
        console.log(shuaxin);
        //bagLlist.selectHandler = new Laya.Handler(this, this.indexA);

        bagLlist.mouseHandler = new Laya.Handler(this, this.solt_CLICK, [bagLlist]);

        //bagLlist.cells[a].getChildByName("itemNum").visible=true

        //console.log(bagLlist.selectHandler = new Laya.Handler(this, this.indexA));
        item_add.on(Laya.Event.CLICK, this, this.onclickObj);

        //shuaxin.on(Laya.Event.CLICK,this,this.getListData(bagLlist));
        Laya.loader.load("json/daoju.json", null, null, Laya.Loader.JSON);




    }
    solt_CLICK(bagLlist, e, index) {

        if (e.type == Laya.Event.CLICK) {

            let articleName = this.owner.getChildByName("bag_0").getChildByName("articleName");

            let slot = bagLlist.cells[index];
            for (let i = 0; i < bagLlist.cells.length; i++) {

                bagLlist.cells[i].getChildByName("slot_sel").visible = false;
                if (index == i) {
                    //console.log(index+"    "+ i)
                    bagLlist.cells[i].getChildByName("slot_sel").visible = true;
                }
            }
            if (slot.getChildByName("itemName").text != "") {

                articleName.text = slot.getChildByName("itemName").text;

            } else {
                articleName.text = "空空的格子";
            }

            console.log("--这个格子里的道具是:--" + articleName.text);
        }

    }
    testA(index) {
        return index;
    }
    updateItem(cell, index) {
        //cell.setImg(cell.dataSource);
        console.log(cell);
    }
    indexA(index) {
        let bagLlist = this.owner.getChildByName("bag_0").getChildByName("bagLlist");
        let articleName = this.owner.getChildByName("bag_0").getChildByName("articleName");
        let slot = bagLlist.cells[index];
        console.log(index);
        for (let i = 0; i < bagLlist.cells.length; i++) {

            bagLlist.cells[i].getChildByName("slot_sel").visible = false;
            if (index == i) {
                //console.log(index+"    "+ i)
                bagLlist.cells[i].getChildByName("slot_sel").visible = true;
            }
        }
        if (slot.getChildByName("itemName").text != "") {
            console.log("q");
            articleName.text = slot.getChildByName("itemName").text;
        }
        articleName.text = "空空的格子";
        console.log("--这个格子里的道具是:--" + articleName.text);
        //bagLlist.selectedIndex = -1;
        //选中的格子 slot_sel 图 显示 其他格子的 slot_sel 图 隐藏
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
    getListData(bagLlist) {
        console.log("abc");
        var arr = [];
        for (let i = 0; i < 11; i++) {
            arr.push({});
        }
        bagLlist.array = arr;
        console.log("aaaaa");
    }
    slotData(itemDate, quantity) {
        let bagLlist = this.owner.getChildByName("bag_0").getChildByName("bagLlist");
        let solt_itemDate = itemDate;//多余写的变量
        for (let i = 0; i < bagLlist.cells.length; i++) {
            //处理道具数量
            console.log(a);
            if (a === undefined) {
                solt_itemDate.quantity = quantity;//添加获得的道具 数量
            } else {
                solt_itemDate.quantity = a;//添加道具大于上限的 数量
            }
            let slot = bagLlist.cells[i];//当前格子
            let itemIcon = slot.getChildByName("icon");//格子道具图标
            let itemNum = slot.getChildByName("itemNum");//格子道具数量
            let itemName = slot.getChildByName("itemName");//格子道具名字
            slot.solt_itemDate = solt_itemDate;//添加道具数据
            //let num = Number(slot.solt_itemDate.quantity) + Number(solt_itemDate.quantity);//新获得和原有的数量总
            //修改格子内容
            if (slot.solt_itemDate != undefined) {
                if (slot.solt_itemDate.id === solt_itemDate.id) {
                    console.log("格子内存在相同道具");
                    //存在相同道具只修改数量
                    //console.log(num);
                    if (num > 99) {
                        var a = num - 99;//大于上限的数量
                        slot.solt_itemDate.quantity = 99;//添加道具数量
                        continue;
                    }

                    // itemNum.text = Number(itemNum.text) + Number(solt_itemDate.quantity);//添加道具数量
                    itemNum.text = slot.solt_itemDate.quantity;//添加道具数量

                    //console.log("B");
                    //return;
                }
                console.log("格子内存在道具");
                continue;
            }

            itemIcon.skin = "ui/icon/" + solt_itemDate.res_name + ".png";//添加道具图标
            itemName.text = solt_itemDate.name;//添加道具名字

            if (num > 99) {
                var a = num - 99;
                slot.solt_itemDate.quantity = 99;//添加道具数量
               // slot.solt_itemDate = solt_itemDate;//添加道具数据
                //continue;
            }
            //itemNum.text = solt_itemDate.quantity;//添加道具数量

            //slot.solt_itemDate = solt_itemDate;//添加道具数据
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