import {FLAG_STORAGE} from '../expand/dao/DataStore'
// import FavoriteDao from '../expand/dao/FavoriteDao';
export default class FavoriteUtil {
    static onFavorite(favoriteDao,item, isFavorite,flag){
        const key = flag===FLAG_STORAGE.flag_popular?item.id:item.fullName;
        if(!isFavorite){
            favoriteDao.saveFavoriteItem(key,JSON.stringify(item));
        }else{
            favoriteDao.removeItem(key);
        }
    }
}