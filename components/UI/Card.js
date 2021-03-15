import React from 'react';
import{View,StyleSheet} from 'react-native';

const Card = props =>{
    return(
        <View style={{...styles.card,...props.styles}}>
            {props.children}
        </View>
    )
};
const styles= StyleSheet.create({
    card:{
        elevation:7,
    borderRadius:15
    }
})

export default Card;