export default class Utils {
    static checkFavorite(item, items = []) {
        if (!item) return false;
        let id = item.id ? item.id.toString() : item.fullName;

        for (let i=0;i<items.length;i++){
            let element = items[i];
            if(id===element){
                return true;
            }
        }
        return false;
    }
}