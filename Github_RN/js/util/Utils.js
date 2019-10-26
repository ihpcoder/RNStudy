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
}