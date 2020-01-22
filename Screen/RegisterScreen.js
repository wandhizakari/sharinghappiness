
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

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
        fetch('http://devel.sharinghappiness.org/api/v1/user/register', {
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
                this.setState({error:true,message:responseJson.message})
            }
            if(responseJson.result){
                alert('Register Success Please confirm your email for login')
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
                
                <View style={{height:46,flexDirection:'row',marginTop:100}}>
                    <View style={{width:180,height:46,justifyContent:'center',alignItems:'center', borderColor:'gray',borderWidth:1,borderStyle:'solid'}}>
                        <Text>LOGIN BY GOOGLE</Text>
                    </View> 
                    <View style={{width:180,height:46,backgroundColor:'#3b5998',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white'}}>LOGIN BY GOOGLE</Text>
                    </View>
                </View>
                <View style={{flexDirection:'column',position:'absolute'}}>
                    <Text style={{color:'red',fontFamily:'arial',fontSize:15,marginTop:-120}}> {this.state.message}</Text>
                </View>
                <View style={{flexDirection:'column',marginTop:50}}>
                    <TextInput onChangeText={text => this.onChangeText({type:'email',value:text})} value={this.state.email} style={{height:46,borderColor:'gray',borderWidth:1,width:360,paddingLeft:25}} placeholder="Email"/>
                    <TextInput onChangeText={text => this.onChangeText({type:'name',value:text})} value={this.state.name} style={{height:46,borderColor:'gray',borderWidth:1,width:360,paddingLeft:25,marginTop:30}} placeholder="Nama Lengkap"/>
                    <TextInput onChangeText={text => this.onChangeText({type:'phone',value:text})} value={this.state.phone} style={{height:46,borderColor:'gray',borderWidth:1,width:360,paddingLeft:25,marginTop:30}} placeholder="No. HP"/>
                    <TextInput onChangeText={text => this.onChangeText({type:'password',value:text})} value={this.state.password} style={{height:46,borderColor:'gray',borderWidth:1,width:360,paddingLeft:25,marginTop:30}} placeholder="Password"/>
                </View>
                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={()=>this.register()} style={{width:360,height:46,backgroundColor:'#eb6623',justifyContent:'center',alignItems:'center',marginTop:30}}>
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

