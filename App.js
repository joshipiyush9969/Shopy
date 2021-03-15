import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import {combineReducers,createStore,applyMiddleware} from 'redux';
import productReducer from './store/reducers/products';

import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import authReducer  from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer'

import ReduxThunk from 'redux-thunk';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';

const rootReducer = combineReducers({
  products:productReducer,
  cart:cartReducer,
  orders:ordersReducer,
  auth:authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));


const fetchFonts = async () => {
  await Font.loadAsync({
    'crayon':require('./assets/fonts/Peteroy Italic.ttf'),
    'valorant':require('./assets/fonts/Valorant_Font.ttf')
  })
}

export default function App() {

  const [fontLoaded,setFontLoaded] = useState(false);

  if(!fontLoaded)
  {
    return(<AppLoading startAsync ={fetchFonts} 
      onFinish={()=>setFontLoaded(true)} 
      onError={(err) =>console.log(err)} />);
  }

  return (<Provider store ={store}>
    <NavigationContainer/>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
