import React from 'react';
import {View,StyleSheet,Text,Image, Button,TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import{useSelector} from 'react-redux';

const PorductItem = props =>{
   
    return(
        <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.product}>
            <Image style={styles.image}source={{uri: props.image}}/>
            <View style = {styles.details}>
            <Text style = {styles.title}>{props.title}</Text>
            <Text style = {styles.price}>₹{props.price}</Text>
            
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    product:{
        elevation:7,
        borderRadius:15,
        height:300,
        margin:20
    },
    image:{
        width:'97.5%',
        height:'60%',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5
    },
    title:{
        fontWeight:'bold',
        fontSize:19,
        marginVertical:3,
        marginHorizontal:10
    },
    price:{
        fontSize:17,
        color:Colors.accent,
        marginHorizontal:10
    },
    actions:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:10,
        padding:10
    },
    details:{
        alignItems:'center',
        height:'15%',
        padding:10
    }
});

export default PorductItem;