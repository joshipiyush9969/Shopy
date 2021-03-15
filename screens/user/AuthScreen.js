import React,{useState,useEffect,useCallback} from 'react'
import {Text,View,StyleSheet,Image, TextInput, Button, Dimensions, Alert,ActivityIndicator} from 'react-native'
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';
import{LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';


const AuthScreen=props=>{
    const[isSignUp,setIsSignUp] =useState(false);
    const[isLoading,setIsLoading] =useState(false);
    const[error,setError] = useState();
    const[title,setTitle]=useState('SignUp/Login');

    const[userEmail,setuserEmail] = useState('');
    const[password,setPassword] = useState('')

    const dispatch = useDispatch();

    const emailHandler = inputTextEmail =>{
        setuserEmail(inputTextEmail);
    }

    const passwordHandler = inputTextPassword =>{
        setPassword(inputTextPassword);
    }

    useEffect(()=>{
        props.navigation.setParams({titleToBe:title})
        if(error){
            Alert.alert('An Error Occured',error,[{text:'Okay'}]);
        }
    },[error,title])

   const titleHandler = () =>{
        if(isSignUp){
            setTitle('Login')
        }else{
            setTitle('Sign Up')
        }
    }



    const authHandler = async(email,password) =>{
        let action;
        if(isSignUp){
            action= authActions.signup(email,password);
        }
        else{
            action=authActions.login(email,password);
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
            props.navigation.navigate('Shop')
        }
        catch(err){
            setError(err.message);
            setIsLoading(false);
        }
        
        
        console.log('coorect!');
    }

    const validate = (email,password) =>{
        console.log(email);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(reg.test(email) === false){
            Alert.alert('Wrong Input','Please enter a valid email',[{text:'Okay'}])
        }
        else{
            authHandler(email,password)
        }
    }
    
    return (
        <LinearGradient colors={['white','#b5d5ff']} style={styles.gradient}>
        <View style={styles.mainscreen} >
            <Text style={styles.icon} >Bolt Cart  </Text>
            
            <Card styles={{margin:50,backgroundColor:'white'}}>     
            <View style={{padding:10}} >
                <View style={styles.input} >
                <TextInput keyboardType='email-address' placeholder='Email' keyboardType='default' style = {{ height:60, width:'90%', alignSelf:'center',borderWidth:1,padding:10,borderRadius:20,margin:10}}
                onChangeText={emailHandler} value={userEmail}
                 />
                <TextInput secureTextEntry={true} placeholder='Password (Must be at least 6 characters)' keyboardType='default' style = {{height:60, width:'90%', alignSelf:'center',borderWidth:1,padding:10,borderRadius:20,margin:10}} 
                 onChangeText={passwordHandler} value={password}/>
                </View>
                <View style={{width:'50%',alignSelf:'center'}}>
                <View style={{marginVertical:20}}> 
                {isLoading ? <ActivityIndicator size='large' color={Colors.accent}/> : <Button title={isSignUp?'Sign Up':'Login'} color={Colors.accent} onPress={validate.bind(this,userEmail,password)} />}
                </View>
                <View style={{marginBottom:20}}>
                <Button title={`Switch To ${isSignUp?'Login':'Sign Up'}`} color={Colors.primary} onPress={()=>{setIsSignUp(prevState => !prevState); titleHandler();}} />
                </View>
                </View>
            </View>
            </Card>

        </View>
        </LinearGradient>
    );
};

AuthScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('titleToBe')
    
   return{ //headerTitle:title
    header:() =>{
        return false
    }
        }
}

const styles=StyleSheet.create({
    mainscreen:{
        height : '100%',
        width : '100%',
        justifyContent:'flex-start',
        paddingTop:55
    },
    icon:{
        fontSize : 95,
        color:Colors.accent,
        alignSelf:'center',
        fontFamily:'crayon',
        padding:20,
        // textShadowColor: 'rgba(0, 0, 0, 0.45)',
        // textShadowOffset: {width: 0.5, height: 5},
        // textShadowRadius: 10
    },
    input:{
        marginVertical : 30,
        alignContent :'center',
        
    },
    gradient:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    }
});

export default AuthScreen;