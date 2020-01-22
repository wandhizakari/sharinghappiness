import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:''
        }
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }

    login= async ()=>{
        console.log(this.state)
        fetch('http://devel.sharinghappiness.org/api/v1/user/forgot-password', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.email,
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log('hellor')
          console.log(responseJson)
          if(responseJson.status == 20){
            alert('Link Success to send Please check  your email')
            Actions.login({registerSuccess:true})
          }

          if(responseJson.status ==30){
              this.setState({message:responseJson.message})
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                
                
                <View style={{flexDirection:'column',position:'absolute'}}>
                    <Text style={{color:'red',fontFamily:'arial',fontSize:15,marginTop:-65}}> {this.state.message}</Text>
                </View>
                <TouchableOpacity onPress={()=>Actions.register({title: 'Register'})}><Text style={{color:'black',width:350,fontFamily:'arial',fontSize:15}}>Silahkan masukan email yang telah terdaftar di sharing happiness</Text></TouchableOpacity>
                <View style={{flexDirection:'column',marginTop:30}}>
                    <TextInput onChangeText={text => this.onChangeText({type:'email',value:text})} value={this.state.email} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:360,paddingLeft:25}} placeholder="Email"/>
                </View>
                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={()=>this.login()} style={{width:360,height:46,borderRadius:3, backgroundColor:'#eb6623',justifyContent:'center',alignItems:'center',marginTop:30}}>
                        <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>Reset Password</Text>

                </View>

                <View style={{flexDirection:'column'}}>



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









