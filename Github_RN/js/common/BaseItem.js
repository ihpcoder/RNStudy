import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
}from 'react-native'
import PropTypes from 'prop-types'


import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends React.Component{
    static propsTypes = {
        projectModel :PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func,
    }
    constructor(props){
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
        }
        
    }
    static getDerivedStateFromProps(nextProps,presState){//代替componentWillReceiveProps
        const isFavorite = nextProps.projectModel.isFavorite;
        if(presState.isFavorite!==isFavorite){
            return {
                isFavorite: isFavorite,
            }
        }
        return null;
    }
    setFavoriteState(isFavorite){
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
        });
    }
    onItemClick(){
        this.props.onSelect(isFavorite=>{
            this.setFavoriteState(isFavorite);
        });
    }
    onPressFavorite(){
        const isFavorite = !this.state.isFavorite;
        this.setFavoriteState(isFavorite);
        this.props.onFavorite(this.props.projectModel.item, isFavorite);
    }
    _favoriteIcon(){
        return <TouchableOpacity
            style={{padding: 6}}
            underlayColor={'transparent'}
            onPress={()=>this.onPressFavorite()}>
            <FontAwesome
                name={this.state.isFavorite? 'star': 'star-o'}
                size={26}
                style={{color:this.props.theme.themeColor}}
            />
        </TouchableOpacity>
    }
}
