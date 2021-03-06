import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'
import BaseItem from './BaseItem'
export default class TrendingItem extends BaseItem {
    constructor(props) {
        super(props);
    }
    render() {
        const {projectModel} = this.props;
        const { item } = projectModel;
        if (!item) return null;
        let description = '<p>'+item.description+'</p>'
        return <TouchableOpacity
            onPress={() => this.onItemClick()}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>
                    {item.fullName}
                </Text>
                <HTMLView
                    value={description}
                    onLinkPress={(url)=>{

                    }}
                    stylesheet={{
                        p:styles.description,
                        a:styles.description
                    }}
                />
                <Text style={styles.description}>
                    {item.meta}
                </Text>
                <View style={styles.middle_container}>
                        <Text>Built by:</Text>
                        {item.contributors.map((result, i, arr) => {
                            return <Image style={{ height: 22, width: 22, margin: 5 }}
                                key={i}
                                source={{ uri: arr[i] }}
                            />
                        })}

                    </View>
                <View style={styles.bottom_container}>
                    
                    <View style={styles.bottom_container}>
                        <Text>Star:</Text>
                        <Text>{item.starCount}</Text>
                    </View>
                    {this._favoriteIcon()}
                </View>
            </View>
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    cell_container: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        backgroundColor:'white',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',//ios
        shadowOffset: { width: 0.5, height: 0.5 },//ios
        shadowOpacity: 0.4,//ios
        shadowRadius: 1,//ios
        elevation: 2,//android
    },
    bottom_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    middle_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        flexWrap:'wrap',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
});