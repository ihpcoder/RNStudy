export default class Utils {
    static checkFavorite(item, items = []) {
        if (!item) return false;
        let id = item.id ? item.id.toString() : item.fullName;
        items.forEach((element, index) => {
            if(id===element){
                return true;
            }
        });
        return false;
    }
}