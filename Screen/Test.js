import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';


export default class RegisterScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            value:0
        }
    }
    componentDidMount(){
        const value = AsyncStorage.getItem('token')
        
        AsyncStorage.getItem('token').then((res) =>{
        console.log('7987897987987987987')
          console.log(res)
          
      })
        
      
    }

    onChangeText=(e)=>{
        console.log(e)
        if(e.type == 'email'){
            this.setState({email:e.value})
        }else{
            this.setState({password:e.value})
        }
        
    }

    login = async (email=this.state.email, password=this.state.password) => {
        this.setState({loading:true})
        fetch('https://sharinghappiness.org/api/v1/user/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        }).then((response) => response.json())
        .then( async (responseJson) => {
          console.log({responseJson})
            this.setState({loading:false})
            if(responseJson.message){
                this.setState({error:true,message:responseJson.message})
            }
            if(responseJson.status == 20){
                try {
                    await AsyncStorage.setItem('logined', 'true');
                    const value = await AsyncStorage.getItem('logined')
                    console.log(value)
                    
                    if(value){
                        console.log(responseJson)
                        Actions.home({title: 'Home'})

                        if(responseJson.result){
                          console.log('simpan semuaaa', responseJson.result)
                            await AsyncStorage.setItem('token', responseJson.result.token); 
                            await AsyncStorage.setItem('username', responseJson.result.name);
                            await AsyncStorage.setItem('email', email); 
                            await AsyncStorage.setItem('password', password); 
                            await AsyncStorage.setItem('dataSession', JSON.stringify(responseJson.result)); 
                        }
                    }else{
                        console.log('false')
                    }
                  } catch (error) {
                    // Error saving data
                  }
                // Actions.home({title: 'Home'})

            }
          console.log(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });
    }

    handleFacebookLogin = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
          (result) => {
            if (result.isCancelled) {
              console.log('Login cancelled')
            } else {

              console.log(result)
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  this.initUser(data.accessToken.toString())
                }
              )
             
            }
          })
          .catch((error) => {
            console.log('Login fail with error: ' + error)
          }
        )
      }

    tambah = () =>{
      this.setState({value:this.state.value+1})
    }

    kurang = () =>{
      if(this.state.value>0){
        this.setState({value:this.state.value-1})
      }else{
        alert('value tidak boleh kurang dari 0')
      }
    }

    render(){
      return(
        <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',padding:20}}>
          <TouchableOpacity onPress={this.tambah}>
            <Text style={{fontSize:34}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize:34}}>{this.state.value}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.kurang}>
            <Text style={{fontSize:34}}>-</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection:'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});









