
import React, { useCallback } from 'react';
import {FlatList,StyleSheet, View,Text,Button,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import MenuHeaderButton from '../../components/UI/MenuHeaderButton';
import Colors from '../../constants/Colors';
import { useEffect,useState } from 'react';
import * as productActions from '../../store/actions/products';

const ProductOverviewScreen = props =>{
    const[refreshing,setIsRefreshing] = useState(false);
    const[isLoading,setIsLoading] =useState(false);
    const[error,setError] = useState();

    const selectItemHandler = (id,title) =>{
        props.navigation.navigate({
            routeName:'ProductDetail',params:{productId:id,
                                             productTitle:title}
        })
    }

    const products = useSelector((state =>state.products.availableProducts));
    
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
        return transformedCartItems;
    });


    const dispatch = useDispatch();

    const loadProducts = useCallback( async () =>{
        setError(null);
        setIsRefreshing(true);
        
        try{
            await dispatch(productActions.fetchProducts())
        }catch(err){
            setError(err.messsage);
        }
        setIsRefreshing(false);
    },[dispatch,setIsLoading,setError]);

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadProducts);

        return () =>{
            willFocusSub.remove();
        }
    },[loadProducts])

    useEffect(()=>{
        setIsLoading(true);
        loadProducts().then(()=>{
            setIsLoading(false);
        })
    },[dispatch,loadProducts]);

    if(error){
        return(
            <View style={styles.centered}>
                <Text>An error occured</Text>
                <Button title="Try Again" onPress={loadProducts}/>
            </View>
        )
    }

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color='black'/>
            </View>
        )
    }

    if(!isLoading && products.length === 0){
        return(
            <View style={styles.centered}>
                <Text>No Products Found. Maybe Start Adding Some</Text>
            </View>
        )
    }

return(
        
    <FlatList onRefresh={loadProducts} refreshing={refreshing} 
    data = {products} keyExtractor = {item => item.id}
               renderItem={itemData => 
               <ProductItem image={itemData.item.imageUrl} 
               title={itemData.item.title}
               price={itemData.item.price}
               onSelect={()=>{selectItemHandler(itemData.item.id,itemData.item.title)}}
               >
                   
                   <Button color={Colors.primary} title='View Details' onPress={()=>{selectItemHandler(itemData.item.id,itemData.item.title)}}/>
                   <Button color={Colors.accent}title='Add To Cart' onPress={()=>{dispatch(cartActions.addToCart(itemData.item))}}/>

               </ProductItem>}/>
    );
};

ProductOverviewScreen.navigationOptions = navData => {
    return{
    headerTitle:'All Products',
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent={MenuHeaderButton}> 
        <Item title='Menu' iconName={'md-menu'} iconSize={23} color={'white'} onPress={()=>{navData.navigation.toggleDrawer()}}/>
    </HeaderButtons>),
    headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}> 
        <Item title='Cart' iconName={'md-cart'} onPress={()=>{navData.navigation.navigate('Cart')}}/>
    </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default ProductOverviewScreen;