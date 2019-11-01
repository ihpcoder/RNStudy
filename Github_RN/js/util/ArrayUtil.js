export default class ArrayUtil{
    /**
     * 判断两个数组是否相等
     * @param {*} array 
     * @param {*} otherArray 
     */
    static isEquArray(array=[],otherArray){
        if(!(array&&otherArray)){
            return false;
        }else if(array.length!==otherArray.length){
            return false;
        }else{
            if(JSON.stringify(array)!==JSON.stringify(otherArray)){
                return false;
            }
        }
        return true;
    }
    /**
     * 存在就移除不存在就添加(适用于可多次选中)
     * @param {*} array 
     * @param {*} item 
     */
    static updateArray(array, item){
        for(let i=0; i<array.length;i++){
            let temp = array[i];
            if(item===temp){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }
    /**
     * 将数组中的制定元素移除
     * @param {*} array 
     * @param {*} item 要移除的item
     * @param {*} id 要对比的属性 缺省则比较地址
     */
    static remove(array, item, id){
        if(!array) return;
        for (let i=0, l=array.length; i<l ; i++){
            const val = array [i];
            if (item === val || val && val[id] && val[id]===item[id]){
                array.splice(i,1);
            }
        }
        return array;
    }
    /**
     * clone数组
     * @param {*} from 
     */
    static clone(from) {
        if(!from) return [];
        let newArray = [];
        for(let i=0 ; i<from.length; i++){
            newArray[i] = from[i];
        }
        return newArray;
    }
}