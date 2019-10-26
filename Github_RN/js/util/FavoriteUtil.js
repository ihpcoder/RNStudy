import {FLAG_STORAGE} from '../expand/dao/DataStore'
// import FavoriteDao from '../expand/dao/FavoriteDao';
export default class FavoriteUtil {
    static onFavorite(favoriteDao,item, isFavorite,flag){
        let key = flag===FLAG_STORAGE.flag_popular?item.id:item.fullName;
        key=key+'';
        if(!isFavorite){
            favoriteDao.saveFavoriteItem(key,JSON.stringify(item));
        }else{
            favoriteDao.removeItem(key);
        }
    }
}