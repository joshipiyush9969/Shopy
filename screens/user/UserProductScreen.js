import React from 'react';
import {View,StyleSheet,Button,Text,FlatList,Alert} from 'react-native';
import ProductItem from '../../components/ProductItem';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MenuHeaderButton from '../../components/UI/MenuHeaderButton';
import Colors from '../../constants/Colors';
import * as  productsAction from '../../store/actions/products';

const UserProductScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts);

    const dispatch = useDispatch();

    const editProductHandler = (id) =>{
        props.navigation.navigate({routeName:'EditProduct',params:{productId:id}})
    }


    const deleteHandler = (id) =>{
        Alert.alert('Are you sure','Do you really want to delete this item?',[
            {text:'No' ,style:'default'},
        {text:'Yes',style:'destructive', onPress:()=>{dispatch(productsAction.deleteProduct(id))}}
    ]);
    }

    if(userProducts.length === 0){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No products found, maybe start creating some?</Text>
        </View>
    }

    return (
        <FlatList data={userProducts} keyExtractor={item=>item.id} renderItem={itemData=>
        <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price}
        onSelect={()=>{editProductHandler(itemData.item.id)}}>
            
            <Button color={Colors.primary} title='Edit' onPress={()=>{editProductHandler(itemData.item.id)}}/>
             <Button color={Colors.accent}title='Delete' onPress={()=>deleteHandler(itemData.item.id)}/>
        
        </ProductItem>}
        />
    );
};

UserProductScreen.navigationOptions =navData=> {
    return{
    headerTitle:'Your Products',
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent={MenuHeaderButton}> 
        <Item title='Menu' iconName={'md-menu'} iconSize={23} color={'white'} onPress={()=>{navData.navigation.toggleDrawer()}}/>
    </HeaderButtons>),
    headerRight:()=>(<HeaderButtons HeaderButtonComponent={MenuHeaderButton}> 
        <Item title='Add' iconName={'md-create'} iconSize={23} color={'white'} onPress={()=>{navData.navigation.navigate('EditProduct')}}/>
    </HeaderButtons>)
    }
}

const styles = StyleSheet.create({});

export default UserProductScreen;