import {createStackNavigator} from 'react-navigation-stack';
import Colors from '../constants/Colors';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/user/StartupScreen';
import {View,Button, SafeAreaView} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';



const defaultNavOptions={
    headerStyle:{
        backgroundColor:Colors.primary
    },
    headerTintColor:'white'
}

const ProductsNavigator = createStackNavigator({
    ProductsOverView :{screen: ProductOverviewScreen},
    ProductDetail:{screen:ProductDetailScreen},
    Cart:{screen:CartScreen}
},{ navigationOptions:{drawerIcon:drawerConfig =>(<FontAwesome5 name="box-open" size={18} color = {drawerConfig.tintColor}/>)},
    defaultNavigationOptions: defaultNavOptions
}
);

const OrdersNavigator = createStackNavigator({
    Order:{screen:OrderScreen}
},{navigationOptions:{drawerIcon:drawerConfig =>(<Ionicons name={'md-cart'} size ={23} color = {drawerConfig.tintColor}/>)},
    defaultNavigationOptions:defaultNavOptions
    
}
);

const AdminNavigator = createStackNavigator({
    UserProduct:{screen:UserProductScreen},
    EditProduct:{screen:EditProductScreen}
},{navigationOptions:{drawerIcon:drawerConfig =>(<Ionicons name={'md-create'} size ={23} color = {drawerConfig.tintColor}/>)},
    defaultNavigationOptions:defaultNavOptions
    
}
);

const ShopNavigator = createDrawerNavigator({
    Products:ProductsNavigator,
    Orders:OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:'white',
        activeBackgroundColor:Colors.primary,
        labelStyle:{
            fontWeight:'bold',
            fontSize:17
        }
    },
    contentComponent: props =>{
        const dispatch = useDispatch();
        return <View style={{flex:1,paddingTop:30}}>
            <SafeAreaView forceInsert ={{top:'always',horizontal:'never'}}>
                <DrawerItems {...props}/>
                <Button title='Logout' color='#808080' onPress={()=>{dispatch(authActions.logout());
                //props.navigation.navigate('Auth');
                }}/>
            </SafeAreaView>
        </View>
    }
}
)
const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
},{defaultNavigationOptions:defaultNavOptions})

const MainNavigator = createSwitchNavigator({
    Startup:StartupScreen,
    Auth:AuthNavigator,
    Shop:ShopNavigator
})

export default createAppContainer(MainNavigator);   