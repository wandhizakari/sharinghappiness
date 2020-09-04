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

export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:''
        }
    }

    reset= async ()=>{
        fetch('https://sharinghappiness.org/api/v1/user/forgot-password', {
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
          console.log(responseJson)
          if(responseJson.status == 20){
            Snackbar.show({
                text: 'Link Success to send Please check  your email',
                duration: Snackbar.LENGTH_INDEFINITE,
                backgroundColor: 'green',
                action: {
                    text: 'CLOSE',
                    textColor: '#fff',
                    onPress: () => Snackbar.dismiss(),
                  },
    
              });
            Actions.login({registerSuccess:true})
          }

          if(responseJson.status ==30){
            //   this.setState({message:responseJson.message})
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
        })
        .catch((error) => {
          console.error(error);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width:'80%',alignSelf:'center', height:120,left:'10%',top:'10%',position:'absolute'}} resizeMode='contain' source={{uri:"https://lh3.googleusercontent.com/proxy/edSrCEFLL72Z1dLpwyrF77WuJJ82_TYt05sUaHcT86Jxubqm_90JGpKKVaAly3Lm3TGEnz07k8wVU7tP-7ZIdmGklUs5oa24fZarl4I"}}/>
                
                <View style={{flexDirection:'column',position:'absolute'}}>
                    <Text style={{color:'red',fontFamily:'arial',fontSize:15,marginTop:-65}}> {this.state.message}</Text>
                </View>
                <TouchableOpacity onPress={()=>Actions.register({title: 'Register'})}><Text style={{color:'black',width:350,fontFamily:'arial',fontSize:15}}>Silahkan masukan email yang telah terdaftar di sharing happiness</Text></TouchableOpacity>
                <View style={{flexDirection:'column',marginTop:30}}>
                    <TextInput onChangeText={text => this.setState({email:text})} value={this.state.email} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:300,paddingLeft:25}} placeholder="Email"/>
                </View>
                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={()=>this.reset()} style={{width:300,height:46,borderRadius:3, backgroundColor:'#eb6623',justifyContent:'center',alignItems:'center',marginTop:30}}>
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









