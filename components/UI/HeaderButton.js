import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';



const cartColorHandler = (cartItems)=> {
    if(cartItems.length===0)
    {return true}
    else{
        false
    }
};

const CustomHeaderButton = props =>{

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

    return(<HeaderButton {...props} IconComponent={Ionicons} iconSize={cartColorHandler(cartItems)?23 : 23}
    color={cartColorHandler(cartItems)?'white' : 'yellow'}/>)
};

export default CustomHeaderButton;