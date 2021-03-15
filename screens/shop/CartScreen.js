import React,{useState} from 'react';
import {View,Text,StyleSheet,FlatList,Button,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../../constants/Colors'; 
import CartItem from '../../components/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';


const CartScreen = props =>{

    const[IsLoading,setIsLoading] = useState(false);
    

    const cartTotalAmount = useSelector(state =>state.cart.totalAmount);
    const cartItems = useSelector(state=>{
        const transformedCartItems = [];
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a,b) => a.productId>b.productId? 1: -1);
    });
    const dispatch = useDispatch()

    const sendOrderHandler = async() =>{
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))
        setIsLoading(false);
    }

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
            <Text style={styles.summaryText}>Total:<Text style={styles.amountText}> ₹{Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text> </Text>
            {IsLoading?<ActivityIndicator size='small' color='black'/>:
            <Button color={'black'} title='Order Now' disabled={cartItems.length===0} 
            onPress={sendOrderHandler}/>}
            
            </View>
            <FlatList data={cartItems} keyExtractor={item=>item.productId} 
            renderItem={itemData=><CartItem quantity={itemData.item.quantity} title={itemData.item.productTitle}
             amount={itemData.item.sum} deletable onRemove={()=>{dispatch(cartActions.removeFromCart(itemData.item.productId))}}/>}/>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle:'Your Cart'
};

const styles = StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:20,
        elevation:7,
        borderRadius:15,
        backgroundColor:'white'
    },
    summaryText:{
        fontWeight:'bold',
        fontSize:18
    },
    amountText:{
        color:Colors.accent
    }
});

export default CartScreen;