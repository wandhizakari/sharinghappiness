
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import Snackbar from 'react-native-snackbar';

export default class LoginScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password: '',
            name:'',
            phone:'',
            error:false,
            message:''
        }
    }

    onChangeText=(e)=>{
        console.log(e)
        if(e.type == 'email'){
            this.setState({email:e.value})
        }else if(e.type == 'password'){
            this.setState({password:e.value})
        }else if(e.type == 'name'){
            this.setState({name:e.value})
        }else{
            this.setState({phone:e.value})
        }
        
    }

    register= async ()=>{
        console.log(this.state)
        fetch('https://sharinghappiness.org/api/v1/user/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            phone_number: this.state.phone
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message){
                // this.setState({error:true,message:responseJson.message})
                Snackbar.show({
                    text: responseJson.message,
                    duration: Snackbar.LENGTH_INDEFINITE,
                    backgroundColor: '#bb0000',
                    action: {
                        text: 'RETRY',
                        textColor: '#fff',
                        onPress: () => Snackbar.dismiss(),
                      },
                  });
            }
            if(responseJson.result){
                Snackbar.show({
                    text: 'Register Success Please confirm your email for login',
                    duration: Snackbar.LENGTH_INDEFINITE,
                    backgroundColor: 'green',
        
                  });
                Actions.Login({registerSuccess:true})
            }
          console.log(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                
                <Image style={{width:200,alignSelf:'center', height:120,top:'10%' }} resizeMode='contain' source={{uri:"https://sharinghappiness.org/files/contentimages/a05b1d7b47ab2b13c4c5c0679d3b1684-20180416142358-tentang-kami_thumbnail_x480.png"}}/>

                <View style={{flexDirection:'column',position:'absolute'}}>
                    <Text style={{color:'red',fontFamily:'arial',fontSize:15,marginTop:-120}}> {this.state.message}</Text>
                </View>
                <View style={{flexDirection:'column',marginTop:50,padding:20,justifyContent:'center',alignItems:'center'}}>
                    <TextInput onChangeText={text => this.onChangeText({type:'email',value:text})} value={this.state.email} style={{height:46,borderRadius:5,borderColor:'gray',borderWidth:1,width:300,paddingLeft:25}} placeholder="Email"/>
                    <TextInput onChangeText={text => this.onChangeText({type:'name',value:text})} value={this.state.name} style={{height:46,borderRadius:5,borderColor:'gray',borderWidth:1,width:300,paddingLeft:25,marginTop:30}} placeholder="Nama Lengkap"/>
                    <TextInput onChangeText={text => this.onChangeText({type:'phone',value:text})} value={this.state.phone} style={{height:46,borderRadius:5,borderColor:'gray',borderWidth:1,width:300,paddingLeft:25,marginTop:30}} placeholder="No. HP"/>
                    <TextInput secureTextEntry={true} onChangeText={text => this.onChangeText({type:'password',value:text})} value={this.state.password} style={{height:46,borderRadius:5,borderColor:'gray',borderWidth:1,width:300,paddingLeft:25,marginTop:30}} placeholder="Password"/>
                </View>
                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={()=>this.register()} style={{width:360,height:46,backgroundColor:'#eb6623',justifyContent:'center',alignItems:'center',marginTop:30,borderRadius:5      }}>
                        <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>REGISTER</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>LOGIN</Text>

                </View>
                <View style={{flexDirection:'column'}}>
                    
                <TouchableOpacity onPress={()=>Actions.register({title: 'Register'})}><Text style={{color:'black',fontFamily:'arial',fontSize:15}}>Already have an account?<Text style={{color:'#eb6623',fontFamily:'arial',fontSize:15}}> Sign in now.</Text></Text></TouchableOpacity>
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

