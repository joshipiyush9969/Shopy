import React from 'react';
import{View,StyleSheet,Text,Image,ScrollView,Button} from 'react-native';
import Colors from '../../constants/Colors';
import {useSelector,useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod =>prod.id === productId));
        console.log(selectedProduct);

    const dispatch = useDispatch();

    return(
        <ScrollView>
            <Image style={styles.image}source={{uri:selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
            <Button color={Colors.accent} title="Add To Cart" onPress={()=>{dispatch(cartActions.addToCart(selectedProduct))}}/>
            </View>
            <Text style={styles.price}>₹{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData =>{
    return{
        headerTitle:navData.navigation.getParam('productTitle')
    };
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontSize:20,
        color:Colors.accent,
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontSize:15,
        textAlign:'center',
        marginHorizontal:30
    },
    actions:{
        marginVertical:10,
        alignItems:'center'
    }
});

export default ProductDetailScreen;