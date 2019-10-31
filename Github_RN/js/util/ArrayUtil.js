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
            if(array.toString()!==otherArray.toString()){
                return false;
            }
        }
        return true;
    }
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
}