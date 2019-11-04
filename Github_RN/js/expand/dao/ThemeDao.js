import AsyncStorage from '@react-native-community/async-storage'
import ThemeFactory,{ThemeFlags}  from '../../res/styles/ThemeFactory'
const ThemeKey = 'theme_key'
export default class ThemeDao {

    getTheme(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(ThemeKey,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                if(!result){
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                    resolve(result);
                }
                resolve(ThemeFactory.createTheme(result));
            })
        })
    }
    
    save(objectData){
        AsyncStorage.setItem(ThemeKey,objectData,(e)=>{
            console.log(e);
        });
    }
}