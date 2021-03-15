import React,{useState,useCallback,useEffect,useReducer} from 'react';
import {View,Text,StyleSheet,Alert,ActivityIndicator} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MenuHeaderButton from '../../components/UI/MenuHeaderButton';
import {useSelector,useDispatch} from 'react-redux';
import * as productsAction from '../../store/actions/products';

const FORM_INPUT_UPDATE ='UPDATE';

const formReducer = (state, action) =>{
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues ={
            ...state.inputValues,
            [action.input]:action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]:action.isValid
        }
        let updatedformIsValid =true;
        for(const key in updatedValidities){
            updatedformIsValid = updatedformIsValid && updatedValidities[key];
        }
        return{formIsValid:updatedformIsValid,
            inputValidities:updatedValidities,
        inputValues:updatedValues};
    }
    return state;
};

const EditProductScreen = props =>{
    const[isLoading,setIsLoading] = useState()
    const[error,setError] = useState()


    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state=>state.products.userProducts.find(prod => prod.id ==prodId));
    const dispatch = useDispatch()

    const[formState, dispatchFormState] = useReducer(formReducer,
        {inputValues:{
        title: editedProduct?editedProduct.title:'',
        imageUrl: editedProduct?editedProduct.imageUrl:'',
        description: editedProduct?editedProduct.description:'',
        price:''
    },inputValidities:{
        title:editedProduct? true : false,
        imageUrl:editedProduct? true : false,
        description:editedProduct? true : false,
        price:editedProduct? true : false 
    },
    formIsValid:editedProduct?true :false
    }
    )

    useEffect(()=>{
        if(error){
            Alert.alert('An Error Occured!',error,[{text:'Okay'}])
        }
    },[error])

 


    const submitHandler = useCallback(async() =>{
        if(!formState.formIsValid){
            Alert.alert('Wrong Input','Please check the errors in the form',[{text:'Okay'}])
            return; 
           
        }
        setIsLoading(true);
        setError(null);
       try{
        if(editedProduct){
            await dispatch(productsAction.updateProduct(prodId,formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl));
        }
        else{
            await dispatch(productsAction.createProduct(prodId,formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl,+formState.inputValues.price));
        }
        props.navigation.goBack();
       }catch(err){
           setError(err.message);
       } 
        setIsLoading(false);    
        
    },[dispatch,prodId,formState]);

    useEffect(()=>{
        props.navigation.setParams({submit: submitHandler})
    },[submitHandler])

    const textChangeHandler = (inputIdentifier,text) =>{
        let isValid=false
        if(text.trim().length >  0){
            isValid=true
        }
        dispatchFormState({type:FORM_INPUT_UPDATE, value: text,isValid:isValid,input:inputIdentifier});
    }

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color='black'/>
            </View>
        )
    }

   return( 
   <ScrollView>
       <View style={styles.form}>
    <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={formState.inputValues.title} onChangeText={textChangeHandler.bind(this,'title')} 
        autoCorrect
        keyboardType='default'
        autoCapitalize='sentences'
        returnKeyType='next'
        onEndEditing={()=>console.log('endEditing')} />
        {!formState.inputValidities.title && <Text>Please enter a valid title</Text>}
    </View>
    <View style={styles.formControl}>
        <Text style={styles.label}>Image Url</Text>
        <TextInput style={styles.input} value={formState.inputValues.imageUrl} onChangeText={textChangeHandler.bind(this,'imageUrl')}/>
    </View>
    {editedProduct?null:(<View style={styles.formControl}>
        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input} value={formState.inputValues.price} onChangeText={textChangeHandler.bind(this,'price')} keyboardType='decimal-pad'/>
    </View>)}
    <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={formState.inputValues.description} onChangeText={textChangeHandler.bind(this,'description')}/>
    </View>
    </View>
    </ScrollView>
    
   );
};

EditProductScreen.navigationOptions =navData=> {
    const submitFn = navData.navigation.getParam('submit')
    return{
    headerTitle:navData.navigation.getParam('productId')?'Edit Product':'Add Product' ,
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent={MenuHeaderButton}> 
        <Item title='Menu' iconName={'md-menu'} iconSize={23} color={'white'} onPress={()=>{navData.navigation.toggleDrawer()}}/>
    </HeaderButtons>),
    headerRight:()=>(<HeaderButtons HeaderButtonComponent={MenuHeaderButton}> 
        <Item title='Save' iconName={'md-checkmark'} iconSize={23} color={'white'} onPress={submitFn}/>
    </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    form:{
        margin:20
    },
    formControl:{
        width:'100%'
    },
    label:{
        fontWeight:'bold',
        marginVertical:10
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});


export default EditProductScreen;