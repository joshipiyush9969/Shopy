import React,{useState} from 'react';
import{StyleSheet,View,Text,Button} from 'react-native';
import Colors from '../constants/Colors';
import CartItem from './CartItem';

const OrderItem = props =>{
    const[showDetails,setShowDetials] = useState(false);
return(
    <View style={styles.order}>
        <View style={styles.summary}>
            <Text style ={styles.amount_style}>₹{props.amount.toFixed(2)}</Text>
            <Text style={styles.date_style}>{props.date}</Text>
        </View>
        <Button color={Colors.primary} 
        title = {showDetails? 'Hide Details' : 'Show Details'} 
        onPress={()=>{setShowDetials(prevState => !prevState)}}/>
        {showDetails && <View style={styles.detailItem}>
            {props.items.map(cartItem => <CartItem key={cartItem.productId} quantity={cartItem.quantity} amount={cartItem.sum} title={cartItem.productTitle}/>)}
            </View>}
    </View>
);
};

const styles = StyleSheet.create({
    order:{
        elevation:6,
        borderRadius:15,
        margin:10,
        marginBottom:10,
        padding:15,
        alignItems:'center',
        justifyContent:'space-between'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    amount_style:{
        fontWeight:'bold',
        fontSize:21
    },
    date_style:{
        fontSize:18,
        color:'#888'
    },
    detailItem:{
        width:'100%',
        flexDirection:'column'
        
    }
});

export default OrderItem;