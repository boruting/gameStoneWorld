(function () {
    'use strict';

    class bag extends Laya.Script {

        constructor() {
            super();

        }
        // onUpdate(){

        //     console.log(listt);
        // }

        onEnable() {

            let item_add = this.owner.getChildByName("bag_0").getChildByName("item_add");//添加道具按钮
            let bagLlist = this.owner.getChildByName("bag_0").getChildByName("bagLlist");
            let bag_0 = this.owner.getChildByName("bag_0");
            //bagLlist.selectEnable = true;

            //列表数据
            var arr = [];
            for (let i = 0; i < 16; i++) {
                arr.push({});
            }
            bagLlist.array = arr;

            //显示列表
            bag_0.addChild(bagLlist);

            //默认选中状态为第一个格子
            bagLlist.cells[0].getChildByName("slot_sel").visible = true;


            //回调鼠标点击事件
            bagLlist.mouseHandler = new Laya.Handler(this, this.solt_CLICK, [bagLlist]);

            //点击按钮 获得道具
            item_add.on(Laya.Event.CLICK, this, this.onclickObj);

            //点击按钮重置列表


            //加载道具表
            Laya.loader.load("json/daoju.json", null, null, Laya.Loader.JSON);


            //测试区============================================Start
            let btn_test = this.owner.getChildByName("btn_test");
            btn_test.on(Laya.Event.CLICK, this, this.testBtn);



            //测试区============================================END
        }
        testBtn() {



        }

        /**
         * 
         * @param {*} bagLlist 格子列表
         * @param {*} e 事件
         * @param {*} index cell(格子) 索引 
         */
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

                let slot = bagLlist.cells[index];

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


                let slot = bagLlist.cells[index];

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
            //console.log(itemForm);
            //let itemNum = this.owner.getChildByName("itemNum");
            let textInput = this.owner.getChildByName("bag_0").getChildByName("itemNum").getChildByName("input");
            let textID = this.owner.getChildByName("bag_0").getChildByName("itemID").getChildByName("input");
            var quantity = textInput.text;//当前对象掉落道具的数量 数量需要做概率处理
            let id = textID.text;
            // console.log(id);
            this.slotData(this.getItemForm(itemForm, id), quantity);


        }
        /**
         * 道具放置到格子中
         * @param {*} itemDate 获得的道具数据
         * @param {*} quantity 获得的道具数量
         */
        slotData(itemDate, quantity) {
            let bagLlist = this.owner.getChildByName("bag_0").getChildByName("bagLlist");

            //console.log(bagLlist.cells.length);

            for (let i = 0; i < bagLlist.cells.length; i++) {

                //console.log("length:  " + i);

                let slot = bagLlist.cells[i];//当前格子
                let itemIcon = slot.getChildByName("icon");//格子道具图标
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


                //bagLlist.cells[i].itemDate=slot.itemDate;

            }

        }


        getItemForm(itemForm, id) {

            //     for (var i = 0; i < itemForm.length; i++) {
            //         if (itemForm[i].id === id) {
            //             try {
            //             return itemForm[i];
            //         }
            //         catch{
            //             console.error("配置表中无：" + id + "的道具 请查看道具表 json/daoju.json");
            //         }
            //         }



            // }
            for (var i = 0; i < itemForm.length; i++) {
                if (itemForm[i].id === id) {

                    return itemForm[i];

                }
                
            }
            console.error("配置表中无：" + id + "的道具 请查看道具表 json/daoju.json"); 
            //console.log("没找到ID为：" + id + "的道具");

        }

    }

    class makeUI extends Laya.Script {

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

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("UI/bag.js",bag);
    		reg("UI/makeUI.js",makeUI);
        }
    }
    GameConfig.width = 2208;
    GameConfig.height = 1242;
    GameConfig.scaleMode ="fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "makeUI.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;

    GameConfig.init();

    class Main {
    	constructor() {
    		//根据IDE设置初始化引擎		
    		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    		Laya["Physics"] && Laya["Physics"].enable();
    		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    		Laya.stage.scaleMode = GameConfig.scaleMode;
    		Laya.stage.screenMode = GameConfig.screenMode;
    		Laya.stage.alignV = GameConfig.alignV;
    		Laya.stage.alignH = GameConfig.alignH;
    		//兼容微信不支持加载scene后缀场景
    		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    		if (GameConfig.stat) Laya.Stat.show();
    		Laya.alertGlobalError = true;

    		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    	}

    	onVersionLoaded() {
    		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    	}

    	onConfigLoaded() {
    		//加载IDE指定的场景
    		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    	}
    }
    //激活启动类
    new Main();

}());
