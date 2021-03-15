import React,{useEffect,useState,useCallback} from 'react';
import {View,FlatList,StyleSheet,Text,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/OrderItem';
import * as ordersActions from '../../store/actions/order';

const OrderScreen = props =>{
    const[isLoading,setIsLoading] = useState(false);
    const orders = useSelector(state=> state.orders.orders)
    const dispatch =useDispatch();

    const loadOrder = useCallback(async () =>{
        setIsLoading(true);
        await dispatch(ordersActions.fetchOrder());
        setIsLoading(false);
    },[dispatch,setIsLoading]);

    useEffect(()=>{
        loadOrder();
        
    },[dispatch,loadOrder])

    if(isLoading){
        return(<View style={styles.centered}>
            <ActivityIndicator size='large' color='black'/>
        </View>);
    }

    if(orders.length === 0){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No orders Found, maybe start ordering some?</Text>
        </View>
    }

    return(
        <View style={styles.size}>
        <FlatList data={orders} keyExtractor={item=>item.id} renderItem={itemData =>(
        <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate}
        items = {itemData.item.items}/>
        )}/>
        </View>
    );

};

const styles = StyleSheet.create({
    size:{
        height:'100%'
    },
    centered:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

OrderScreen.navigationOptions = navData =>{
    return {

    headerTitle:'Your Orders',
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}> 
        <Item title='Menu' iconName={'md-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}/>
    </HeaderButtons>)
    }
};

export default OrderScreen;