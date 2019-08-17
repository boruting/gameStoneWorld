/**
 * 
 * 表
 */

var biao = {}
//道具表
biao.item = [
    { "name": "麻绳", "weigth": 0.5, "id": 102001, "describe": "这是个麻绳" },
    { "name": "木棍", "weigth": 1, "id": 102002, "describe": "这是个木棍" },
    { "name": "野猪肉", "weigth": 2, "id": 101003, "describe": "这是个生到野猪肉" },
    { "name": "野猪肉(熟)", "weigth": 2, "id": 101006, "describe": "这是个熟到野猪肉" },
    { "name": "烤架", "weigth": 3.5, "id": 103005, "describe": "这是个可以烤食物到架子" },
    { "name": "火堆", "weigth": 6, "id": 103004, "describe": "这是个火堆，可以提供取暖·烧煮食物" }
];
//配方表
biao.formula = [
    { "key": "野猪肉(熟)", "value": ["野猪肉", "火堆", "烤架"], "id": 101006 },
    { "key": "火堆", "value": ["木棍", "火"], "id": 103004 },
    { "key": "烤架", "value": ["木棍", "麻绳"], "id": 103005 }
];
//生物
biao.animal = [];
//植物
biao.plant = [];
//人物
biao.people = [
    { name: "小聪明", hunger: 100, hp: 100, mood: 100, strength: 50, intelligence: 60, agility: 100 },
    { name: "小苦工", hunger: 100, hp: 100, mood: 100, strength: 110, intelligence: 80, agility: 60 },
    { name: "小武生", hunger: 100, hp: 100, mood: 100, strength: 90, intelligence: 80, agility: 90 }
];
module.exports = {
  biao
   }