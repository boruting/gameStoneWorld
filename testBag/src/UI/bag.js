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

        //for (let i = 0; i < bagLlist.cells.length; i++) {
            //console.log("B");
            let slotItem = {};
            console.log(bagLlist);
            let slot = bagLlist.cells[0];
            console.log(slot);
            
            slotItem.itemIcon = slot.getChildByName("icon");//格子道具图标
            slotItem.itemNum = slot.getChildByName("itemNum");//格子道具数量
            slotItem.itemName = slot.getChildByName("itemName");//格子道具名字

            slotItem.id=itemDate.id;//格子道具id
            slotItem.itemName.text = itemDate.name;//填入名字
            slotItem.itemNum.text = quantity;
            slotItem.itemIcon.icon = itemDate.res_name;

            console.log(slotItem);
            console.log(slot.getChildByName("itemName"));
            //slotItem.name =   
            //let icon = item.getChildByName("icon");
            
            
            // Number(itemNum.text);
            // Number(quantity);
        


        //}
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