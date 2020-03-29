export default class makeUI extends Laya.Script {

    constructor() {
        super();

    }
    onEnable() {
        let bagList = this.owner.getChildByName("bagList");
        let btn_make = this.owner.getChildByName("make").getChildByName("btn_make");
        let item_add = this.owner.getChildByName("item_add");
        var arr = [];
        for (let i = 0; i < 25; i++) {
            arr.push({});
        }
        bagList.array = arr;
        //this.addChild(bagList);
        bagList.cells[0].getChildByName("slot_sel").visible = true;

        //回调鼠标点击事件
        bagList.mouseHandler = new Laya.Handler(this, this.solt_CLICK, [bagList]);

        //点击按钮 获得道具
        item_add.on(Laya.Event.CLICK, this, this.onclickObj);
        //加载道具表
        Laya.loader.load("json/daoju.json", null, null, Laya.Loader.JSON);
    }
    /**
     * 
     * @param {*} bagList 格子列表
     * @param {*} e 事件
     * @param {*} index cell(格子) 索引 
     */
    solt_CLICK(bagList, e, index) {

        if (e.type == Laya.Event.CLICK) {

            let articleName = this.owner.getChildByName("bag_0").getChildByName("articleName");

            let slot = bagList.cells[index];
            for (let i = 0; i < bagList.cells.length; i++) {

                bagList.cells[i].getChildByName("slot_sel").visible = false;
                if (index == i) {
                    //console.log(index+"    "+ i)
                    bagList.cells[i].getChildByName("slot_sel").visible = true;
                }
            }
            if (slot.getChildByName("itemName").text != "") {

                articleName.text = slot.getChildByName("itemName").text;

            } else {
                articleName.text = "空空的格子";
            }

            console.log("--这个格子里的道具是:--" + articleName.text);

            if (slot.itemDate != undefined) {

                //console.log(slot.itemDate);

                // slot.itemDate.quantity = Number(slot.getChildByName("itemNum").text);

                //this.sel_soltDate(slot.itemDate);
            }
            //console.log(slot);
        }
        if (e.type == Laya.Event.MOUSE_OVER) {

            let tips = this.owner.getChildByName("tips");
            let tipsName = tips.getChildByName("tipsName");
            let tipsNum = tips.getChildByName("tipsNum");
            let tipsIcon = tips.getChildByName("icon");
            let tipsDescribe = tips.getChildByName("describe");
            let tipsDescribe_ = tips.getChildByName("describe_");

            let slot = bagList.cells[index];

            if (slot.itemDate != undefined) {

                //console.log(slot.itemDate);

                slot.itemDate.quantity = Number(slot.getChildByName("itemNum").text);

                //this.sel_soltDate(slot.itemDate);
                tipsIcon.skin = "ui/icon/" + slot.itemDate.res_name + ".png";//添加道具图标  
                tipsName.text = slot.itemDate.name;
                tipsNum.text = slot.itemDate.quantity;
                tipsDescribe.text = slot.itemDate.describe;
                tipsDescribe_.text = "描述";
                tips.visible = true;
                //console.log("::::::");
            }


        }
        if (e.type == Laya.Event.MOUSE_OUT) {

            let tips = this.owner.getChildByName("tips");
            let tipsName = tips.getChildByName("tipsName");
            let tipsNum = tips.getChildByName("tipsNum");
            let tipsIcon = tips.getChildByName("icon");
            let tipsDescribe = tips.getChildByName("describe");
            let tipsDescribe_ = tips.getChildByName("describe_");


            let slot = bagList.cells[index];

            if (slot.itemDate != undefined) {

                //console.log(slot.itemDate);

                slot.itemDate.quantity = Number(slot.getChildByName("itemNum").text);

                //this.sel_soltDate(slot.itemDate);
                tipsIcon.skin = "";//添加道具图标  
                tipsName.text = "";
                tipsNum.text = "";
                tipsDescribe.text = "";
                tipsDescribe_.text = "";
                tips.visible = false;
                //console.log("::::::");
            }


        }

    }
    /**
     * 获得道具
     * 通过道具ID生成道具数据
     */
    onclickObj() {

        let itemForm = Laya.loader.getRes("json/daoju.json");// 获取到道具表JSON文件
        let textInput = this.owner.getChildByName("itemNum").getChildByName("input");
        let textID = this.owner.getChildByName("itemID").getChildByName("input");
        var quantity = textInput.text;
        let id = textID.text;
        //console.log("aaaaa" + itemForm);
        this.slotData(this.getItemForm(itemForm, id), quantity);


    }
    slotData(itemDate, quantity) {
        let bagList = this.owner.getChildByName("bagList");

        //console.log(bagList.cells.length);

        for (let i = 0; i < bagList.cells.length; i++) {

            //console.log("length:  " + i);

            let slot = bagList.cells[i];//当前格子
            let itemIcon = slot.getChildByName("slot_icon");//格子道具图标
            let itemNum = slot.getChildByName("itemNum");//格子道具数量
            let itemName = slot.getChildByName("itemName");//格子道具名字


            //console.log(itemName+"======="+slot.itemDate.quantity);

            if (slot.itemDate == undefined) {

                slot.itemDate = itemDate;//给格子添加数据

                if (itemName.text == "" || itemName.text == itemDate.name) {



                    itemName.text = itemDate.name;//添加道具名字
                    itemIcon.skin = "ui/icon/" + itemDate.res_name + ".png";//添加道具图标               
                    slot.itemDate.quantity = Number(itemNum.text) + Number(quantity); //给格子数据添加 数量
                    if (slot.itemDate.quantity > 99) {

                        //console.log(slot.itemDate.quantity + ">>>>>>>>>>" + itemNum.text);
                        itemNum.text = 99;
                        quantity = slot.itemDate.quantity - 99;
                        //slot.itemDate.quantity = 0 ;
                        continue;
                    }

                    itemNum.text = slot.itemDate.quantity;

                    return;

                }

            }
            if (slot.itemDate.id == itemDate.id) {

                slot.itemDate.quantity = Number(itemNum.text) + Number(quantity); //给格子数据添加 数量
                if (slot.itemDate.quantity > 99) {


                    itemNum.text = 99;
                    quantity = slot.itemDate.quantity - 99;

                    continue;
                }
                itemNum.text = slot.itemDate.quantity;
                return;
            }


            //bagList.cells[i].itemDate=slot.itemDate;

        }

    }

    getItemForm(itemForm, id) {
        
        for (var i = 0; i < itemForm.length; i++) {
            if (itemForm[i].id === id) {

                return itemForm[i];

            }

        }
        console.error("配置表中无：" + id + "的道具 请查看道具表 json/daoju.json");
        //console.log("没找到ID为：" + id + "的道具");

    }

}
