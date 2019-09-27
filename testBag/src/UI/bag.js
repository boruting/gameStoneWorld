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



        console.log(item.getChildByName("icon").skin);
        console.log(item.getChildByName("itemNum").text);
        console.log(item.getChildByName("itemName").text);

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
        let textInput = this.owner.getChildByName("textInput");

        var quantity = textInput.text;//当前对象掉落道具的数量 数量需要做概率处理
        let id = 1001;
        this.itemData(this.getItemForm(itemForm, id), quantity);


    }
    itemData(itemID, quantity) {

        let bagLlist = this.owner.getChildByName("bagLlist");

        //let item = bagLlist.cells[0];
        console.log(bagLlist.cells.length);
        //list数量

        for (let i = 0; i < bagLlist.cells.length; i++) {
            //console.log("B");
            let item = bagLlist.cells[i];
            let itemNum = item.getChildByName("itemNum");
            let icon = item.getChildByName("icon");
            let itemName = item.getChildByName("itemName");
            Number(itemNum.text);
            Number(quantity);
            //大于99个才分成2个item
            
            if (itemName.text == "" && itemNum.text == "" && icon.skin == undefined) {
                //console.log("A");
                itemName.text = itemID.name;//道具名字
                icon.skin = "ui/icon/" + itemID.icon;//道具图标
                if (itemNum.text != "") {
    
                    itemNum.text = Number(itemNum.text) + Number(quantity);
    
                    return;
                }
                itemNum.text = Number(quantity);//道具数量
                return;
            }
            if(itemName.text==itemID.name&&(itemNum.text+Number(quantity))<99){
                
               
                
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
}