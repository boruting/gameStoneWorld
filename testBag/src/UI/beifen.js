  // var itemForm = [
        //     {
        //         id: 1001,
        //         name: "生肉",
        //         icon: "rou_0.png",
        //         weight: 1
        //     },
        //     {
        //         id: 1002,
        //         name: "熟肉",
        //         icon: "rou_1.png",
        //         weight: 1
        //     }
        //     ,
        //     {
        //         id: 1003,
        //         name: "金矿石",
        //         icon: "jinkuangshi.png",
        //         weight: 1
        //     }
        // ];
        export default class bag extends Laya.Script {

            constructor() {
                super();
        
            }
        
            onEnable() {
        
                let item_add = this.owner.getChildByName("item_add");//添加道具按钮
        
                let bagLlist = this.owner.getChildByName("bagLlist");
                let item = bagLlist.cells[0];
        
                //let bagItem = this.bagItemList;
                item_add.on(Laya.Event.CLICK, this, this.onclickObj);
        
                //var json:JSON=Laya.loader.getRes("unpack.json");
                // Laya.loader.load("json/daoju.json", Laya.Handler.create(), null, Laya.Loader.JSON);
                Laya.loader.load("json/daoju.json", null, null, Laya.Loader.JSON);
        
                //assets.push({ url: "json/daoju.json", type: Laya.Loader.JSON });
                //Laya.loader.load(this.assets,Laya.Handler.create(this,this.onResourceLoadingComplete));
                // console.log(item.getChildByName("icon").skin);
                // console.log(item.getChildByName("itemNum").text);
                // console.log(item.getChildByName("itemName").text);
        
            }
            onclickObj() {
        
                let itemForm = Laya.loader.getRes("json/daoju.json");// 获取到道具表JSON文件
                //console.log(itemForm);
        
                let textInput = this.owner.getChildByName("textInput");
        
                var quantity = textInput.text;//当前对象掉落道具的数量 数量需要做概率处理
                let id = "SW1001";
                this.slotData(this.getItemForm(itemForm, id), quantity);
        
        
            }
            slotData(itemDate, quantity) {
        
                let bagLlist = this.owner.getChildByName("bagLlist");
        
                //let item = bagLlist.cells[0];
                //console.log(bagLlist.cells.length);
                //list数量
        
                for (let i = 0; i < bagLlist.cells.length; i++) {
                    //console.log("B");
                    let item = bagLlist.cells[i];
                    let slot = {};
                    slot.icon = item.getChildByName("icon");
                    slot.quantity = quantity;
                    let itemNum = item.getChildByName("itemNum");
                    //let icon = item.getChildByName("icon");
                    let itemName = item.getChildByName("itemName");
                    let itemID = itemDate.id;
                    Number(itemNum.text);
                    Number(quantity);
                    //大于99个才分成2个item
        
                    if (itemName.text == "" && itemNum.text == "" && icon.skin == undefined) {
                        //console.log("A");
                        itemName.text = itemDate.name;//道具名字
                        icon.skin = "ui/icon/" + itemDate.res_name + ".png";//道具图标
                        if (itemNum.text != "") {
        
                            itemNum.text = Number(itemNum.text) + Number(quantity);
        
                            return;
                        }
                        itemNum.text = Number(quantity);//道具数量
                        return;
                    }
                    if (itemName.text == itemDate.name && (itemNum.text + Number(quantity)) < 99) {
        
                        itemNum.text = Number(itemNum.text) + Number(quantity);
        
                        return;
                    }
        
        
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
            test() {
        
        
                var mJson = $.ajax({ url: "api.json", async: false });
                var temp = JSON.parse(mJson.responseText);
            }
        }