import AsyncStorage from '@react-native-community/async-storage'

export default class DataStore {

    /**
     * 缓存策略
     * @param {*} url 
     */
    fetchData(url){
        return new Promise((resolve,reject)=>{
            this.fetchLocalData(url).then((wrapData)=>{
                const data = wrapData;

                if(data && DataStore.checkTimestampVaild(data.timestamp)){
                    resolve(data);
                }else {
                    this.fetchNetData(url).then((data)=>{
                        resolve(this._wrapData(data));
                    }).catch((error)=>{
                        reject(error);
                    })
                }
            }).catch((error)=>{
                this.fetchNetData(url).then((data)=>{
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
    fetchNetData(url){
        return new Promise((resolve, reject)=>{
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
        })
    }

    _wrapData(data){
        return {data:data,timestamp: new Date().getTime()};
    }

    static checkTimestampVaild(timestamp){
        const currentTimestamp = new Date().getTime();
        if(currentTimestamp-timestamp>1*60*60*1000) return false;
        return true;
    }
}