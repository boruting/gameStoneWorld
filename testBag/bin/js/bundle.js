(function () {
    'use strict';

    class bag extends Laya.Script {

        constructor() {
            super();

        }

        onEnable() {

            let item_add = this.owner.getChildByName("item_add");
            let bagLlist = this.owner.getChildByName("bagLlist");
            let item = bagLlist.cells[0];
            //let bagItem = this.bagItemList;
            item_add.on(Laya.Event.CLICK, this, this.onclickObj);
            item.getChildByName("itemName").text = "aaaaa";
            
            console.log(bagLlist.selectedIndex);
            console.log(item);
        }
        onclickObj() {
            var itemForm = [
                {
                    id: 1001,
                    name: "生肉",
                    icon: "rou_0.png",
                    weight: 1
                },
                {
                    id: 1002,
                    name: "熟肉",
                    icon: "rou_1.png",
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
            var quantity = 3;//当前对象掉落道具的数量 数量需要做概率处理
            let id = 1001;
            this.itemData(this.getItemForm(itemForm, id), quantity);

        }
        getItemForm(itemForm, id) {
            for (var i = 0; i < itemForm.length; i++) {
                if (itemForm[i].id === id) {
                    return itemForm[i];
                }

            }
            console.log("没找到ID为：" + id + "的道具");

        }
        itemData(itemID, quantity) {

            let bagLlist = this.owner.getChildByName("bagLlist");
            let item = bagLlist.cells[0];
            

            let itemNum = item.getChildByName("itemNum");
            let icon = item.getChildByName("icon");
            let itemName = item.getChildByName("itemName");

            itemNum.text = quantity;//道具数量

            itemName.text = itemID.name;//道具名字

            icon.skin = "ui/icon/" + itemID.icon;//道具图标


        }
        onDisable() {
        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("UI/bag.js",bag);
        }
    }
    GameConfig.width = 2208;
    GameConfig.height = 1242;
    GameConfig.scaleMode ="fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "bag.scene";
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