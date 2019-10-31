import AsyncStorage from '@react-native-community/async-storage'
import langs from '../../res/data/langs'
import keys from '../../res/data/keys'
export const FLAG_LANGUAGE = { flag_language: 'language_dao_language', flag_key: 'flag_dao_key' }
export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }
    /**
     * 获取语言或标签
     */
    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    let data = this.flag === FLAG_LANGUAGE.flag_language ? langs : keys;
                    this.save(data);
                    resolve(data);
                }else{
                    try {
                        resolve(JSON.parse(result));
                    }catch(e){
                        reject(e);
                    }
                }
                
            })
        })
    }
    /**
     * 获取存储的语言和标签
     * @param {*} data 
     */
    save(data){
        let stringData = JSON.stringify(data);
        AsyncStorage.setItem(this.flag,stringData,(error,result)=>{

        })
    }
}