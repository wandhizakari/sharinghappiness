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

export default class RegisterScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password: '',
            error:false,
            message:''
        }
    }

    
    componentDidMount = async()=>{
        const value = AsyncStorage.getItem('logined')
        if(value){
            Actions.home({title: 'Home'})
        }else{
            Actions.login({title: 'Login'})
        }

    }
    componentWillUpdate(){
      const value = AsyncStorage.getItem('logined')
      AsyncStorage.getItem('logined').then((res) =>{
          if(value){
              Actions.home({title: 'Home'})
          }else{
              Actions.login({title: 'Login'})
          }
      })
    }

    render() {
      const value = AsyncStorage.getItem('logined')
      AsyncStorage.getItem('logined').then((res) =>{
          if(value){
              Actions.home({title: 'Home'})
          }else{
              Actions.login({title: 'Login'})
          }
      })
      return null
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









