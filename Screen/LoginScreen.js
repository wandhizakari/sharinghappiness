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
            // email:'wandhizakari@gmail.com',
            // password: 'Password',
            email:'',
            password: '',
            error:false,
            message:'',
            loading:false
        }
    }
    componentDidMount(){
        const value = AsyncStorage.getItem('token')
        
        AsyncStorage.getItem('token').then((res) =>{
        console.log('7987897987987987987')
          console.log(res)
          
      })
        AsyncStorage.getItem('logined').then( async (res) =>{
            console.log(res)
            if(res == 'true'){
              let email = await AsyncStorage.getItem('email')
              let password = await AsyncStorage.getItem('password')
              console.log({email, password})
              this.login(email, password)
            }else{
            }
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
        fetch('http://devel.sharinghappiness.org/api/v1/user/login', {
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

      initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=picture.type(large),email,gender,name,birthday,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            this.loginFB(json.id,token,json.email,'wandho',json.picture.data.url)
          // Some user object has been set up somewhere, build that user here
        //   user.name = json.name
        //   user.id = json.id
        //   user.user_friends = json.friends
        //   user.email = json.email
        //   user.username = json.name
        //   user.loading = false
        //   user.loggedIn = true
        //   user.avatar = setAvatar(json.id)      
        })
        .catch((error) => {
         console.log(error)
        })
      }

      loginFB= async (id,token,email,name,picture)=>{
          console.log(id)
        this.setState({loading:true})
        fetch('http://devel.sharinghappiness.org/api/v1/user/login/facebook', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            facebook_id: id,
            facebook_token: token,
            name:name,
            email: email,
            picture:picture
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({loading:false})
            if(responseJson.message){
                this.setState({error:true,message:responseJson.message})
            }
            if(responseJson.status == 20){
                try {
                    AsyncStorage.setItem('logined', 'true');
                    const value = AsyncStorage.getItem('logined')
                    console.log(value)
                    
                    if(value){
                        console.log(responseJson)
                        Actions.home({title: 'Home'})

                        if(responseJson.result){
                            AsyncStorage.setItem('username', responseJson.result.name);
                            AsyncStorage.setItem('token', value.result.token); 
                            AsyncStorage.setItem('profile_picture', value.result.picture_thumbnail); 
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

    render () {
        
        return (
            <View style={styles.container}>
                
                <View style={{height:46,flexDirection:'row',marginTop:100}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between', borderTopLeftRadius:3,borderBottomLeftRadius:3,width:170,height:46,justifyContent:'center',alignItems:'center', borderColor:'gray',borderWidth:1,borderStyle:'solid'}}>
                        <Text style={{marginRight:5}}>LOGIN BY GOOGLE</Text>
                        <Image style={{width:14,height:14}} resizeMode='cover' source={require('../Images/google.png')}/>

                    </View> 
                    <TouchableOpacity onPress={()=>this.handleFacebookLogin()} style={{flexDirection:'row',width:170,height:46,backgroundColor:'#3b5998',borderTopRightRadius:3,borderBottomRightRadius:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',marginRight:5}}>LOGIN BY FACEBOOK</Text> 
                        <Image style={{width:14,height:14}} resizeMode='cover' source={require('../Images/facebook-logo.png')}/>
                    </TouchableOpacity>

                </View>
                <View style={{flexDirection:'column',position:'absolute'}}>
                    <Text style={{color:'red',fontFamily:'arial',fontSize:15,marginTop:-55}}> {this.state.message}</Text>
                </View>
                <View style={{flexDirection:'column',marginTop:50,paddingLeft:20,paddingRight:20}}>
                    <View style={{flexDirection:'row'}}>
                    <Image style={{width:20,height:20,left:10,top:13,position:'absolute'}} resizeMode='cover' source={require('../Images/email.png')}/>
                        <TextInput autoCapitalize = 'none' onChangeText={text => this.onChangeText({type:'email',value:text})} value={this.state.email} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingLeft:40}} placeholder="Email"/>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Image style={{width:20,height:20,left:10,top:45,position:'absolute'}} resizeMode='cover' source={require('../Images/lock.png')}/>
                    <TextInput type="password" autoCapitalize = 'none' onChangeText={text => this.onChangeText({type:'password',value:text})} value={this.state.password} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingLeft:40,marginTop:30}} placeholder="Password"/>
                    </View>
                    <TouchableOpacity style={{color:'#eb6623',position:'absolute',right:30,top:90}} onPress={()=>Actions.forgot({title: 'Forgot Password'})}><Text style={{color:'#eb6623'}}>Forgot?</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={()=>this.login()} style={{width:340,borderRadius:3,height:46,backgroundColor:'#eb6623',justifyContent:'center',alignItems:'center',marginTop:30}}>
                        <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>{this.state.loading?'Loading...':'LOGIN'}</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>{this.state.loading?'Loading...':'LOGIN'}</Text>

                </View>
                <View style={{flexDirection:'column'}}>

                <TouchableOpacity onPress={()=>Actions.register({title: 'Register'})}><Text style={{color:'black',fontFamily:'arial',fontSize:15}}>Don't have an account?<Text style={{color:'#eb6623',fontFamily:'arial',fontSize:15}}> Signup now.</Text></Text></TouchableOpacity>


                </View>
            </View>
        );
    }
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection:'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});









