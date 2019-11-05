export default class Utils {
    static checkFavorite(item, items = []) {
        if (!item) return false;
        let id = item.id ? item.id : item.fullName;
        id = id+'';
        for (let i=0;i<items.length;i++){
            let element = items[i];
            // if(typeof id !=='string'){
            //     id = id;
            // }
            if(id===element){
                return true;
            }
        }
        return false;
    }
    static checkKeysIsExist(keys,key){
        for (let i=0,l=keys.length; i<l; i++){
            if (key.toLowerCase() === keys[i].nama.toLowerCase()) {
                return true;
            }
            return false;
        }
    }

}