import React from 'react';
import {View,StyleSheet,Text,Button,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons'; 
import Colors from '../constants/Colors';

const CartItem = props =>{
    
    return(
        <View style ={styles.cart}>
            <Text style={styles.itemData}>
                <Text style={styles.text}>{props.quantity}   </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.text}>₹{props.amount}</Text>
                {props.deletable && 
                (<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name='md-trash' size={23} color='red'/>
                </TouchableOpacity>)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cart:{
        padding: 10,
        backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
        },
    text:{
        color:Colors.accent,
        fontSize:17
    },
    mainText:{
        fontSize:18,
        fontWeight:'bold'
    },
    deleteButton:{
        marginLeft:20
    }
})

export default CartItem;