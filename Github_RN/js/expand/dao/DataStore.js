import AsyncStorage from '@react-native-community/async-storage'
import Trending from 'GitHubTrending/trending/GitHubTrending'



export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'}

export default class DataStore {

    /**
     * 缓存策略
     * @param {*} url 
     * @param flag 标示url来源 FLAG_STORAGE
     */
    fetchData(url,flag){
        return new Promise((resolve,reject)=>{
            this.fetchLocalData(url).then((wrapData)=>{
                const data = wrapData;
                if(data && DataStore.checkTimestampVaild(data.timestamp)){
                    resolve(data);
                }else {
                    this.fetchNetData(url,flag).then((data)=>{
                        resolve(this._wrapData(data));
                    }).catch((error)=>{
                        reject(error);
                    })
                }
            }).catch((error)=>{
                this.fetchNetData(url,flag).then((data)=>{
                    resolve(this._wrapData(data));
                }).catch((error)=>{
                    reject(error);
                })
            })
        })
    }


    /**
     * 保存数据
     */
    saveData(url, data, callback) {
        if(!data||!url) return;
        AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)));
    }
    /**
     * 获取本地数据
     * @param  url url
     */
    fetchLocalData(url){
        return new Promise((resolve, reject)=>{
            AsyncStorage.getItem(url, (error, result)=>{
                if(!error&&result){
                    try{
                        // if(result===null){
                        //     throw new Error('没有数据');
                        // }
                        resolve(JSON.parse(result));
                    } catch(e){
                        reject(e);
                        console.error(e);
                    }
                }else {
                    reject(error);
                    console.log(error);
                }
            })
        })
    }
    /**
     * 获取网络数据
     * @param {*} url 
     */
    fetchNetData(url,flag){
        return new Promise((resolve, reject)=>{
            if(flag===FLAG_STORAGE.flag_trending){
                new Trending().fetchTrending(url)
                    .then(items=>{
                        if(!items){
                            throw new Error('response is null')
                        }
                        this.saveData(url, items);
                        resolve(items);
                    }).catch((error)=>{
                        reject(error);
                    })
            }else{
                fetch(url)
                    .then((response)=>{
                        if(response.ok){
                            return response.json();
                        }else{
                            throw new Error('network response was not ok.')
                        }
                    })
                    .then((responseData)=>{
                        this.saveData(url,responseData);
                        resolve(responseData);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            }
        })
    }

    _wrapData(data){
        return {data:data,timestamp: new Date().getTime()};
    }

    static checkTimestampVaild(timestamp){
        const currentTimestamp = new Date().getTime();
        if(currentTimestamp-timestamp>1*60*1000) return false;
        return true;
    }
}