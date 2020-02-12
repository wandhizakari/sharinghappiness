import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:'',
            data:[1,2,3,4,5,6],
            data1:[1,2,4,4],
            username:''
        }
    }
    componentDidMount = () =>{
      AsyncStorage.getItem('logined').then((res) =>{
          if(res != 'true'){
              Actions.refresh({key: 'Login', hideNavBar: true});
          }else{
          }
      })
      const user = AsyncStorage.getItem('username')
        AsyncStorage.getItem('username').then((res) =>{
           this.setState({username:res})
        })
    }
   

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }

    renderItem(item) {
      return (
          <TouchableOpacity  
                   style={{flex:1, //here you can use flex:1 also
                   flexDirection:'column',marginRight:10}}>
                  <Image style={{width:150,height:100}} resizeMode='cover' source={{ uri:  'https://www.lyfemarketing.com/blog/wp-content/uploads/2018/01/smm-company.jpg'}}></Image>
                  <Text style={{fontSize:12,width:150}}>Tree Planting: Gears up to Break World Record</Text>
                  <View style={{flex: 2,flexDirection:'row'}}>
                    <View style={{width:70,height:50,marginRight:5,borderRadius:5}}>
                      <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#9da2b3',fontSize:11}}>Bandung, Indonesia</Text>
                    </View>
                    <View style={{width:70,height:50,marginLeft:5,borderRadius:5}} >
                        <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#9da2b3',fontSize:11}}>Bandung, Indonesia</Text>
                    </View>
                  </View>
          
          </TouchableOpacity>
      )
  }
  renderItem1(item) { 
    return (
      <TouchableOpacity  
      style={{flex:1, //here you can use flex:1 also
      flexDirection:'column',marginRight:10}}>
     <Image style={{width:150,height:100}} resizeMode='cover' source={{ uri:  'https://www.lyfemarketing.com/blog/wp-content/uploads/2018/01/smm-company.jpg'}}></Image>
     <Text style={{fontSize:12,width:150}}>Tree Planting: Gears up to Break World Record</Text>
     <View style={{flex: 2,flexDirection:'row'}}>
       <View style={{width:100,height:5,marginRight:5,borderRadius:5,backgroundColor:'#e3e6e8',marginTop:10}}>
        <View style={{width:70,height:5,marginRight:5,borderRadius:5,backgroundColor:'#eb6623'}}>
        </View>
       </View>
     </View>
     <View style={{flex: 2,flexDirection:'row',justifyContent:'flex-end',marginTop:10}}>
          <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#9da2b3',fontSize:11}}>156,890,0000 Funded</Text>
      </View>

    </TouchableOpacity>
    )
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

    logout = async () =>{
      try {
        await AsyncStorage.setItem('logined', 'false');
        await AsyncStorage.removeItem('token'); 
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('email'); 
        await AsyncStorage.removeItem('password'); 
        await AsyncStorage.removeItem('dataSession'); 
        Actions.reset('Login');
      }
      catch(exception) {
          return false;
      }
    }

    render() {
      
        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                <View style={{flex: 1,flexDirection:'row',height:142,padding:30,backgroundColor:'#eb6623'}}>
                <View style={{width:100,height:100,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:50,backgroundColor:'gold'}}></View>
                <View style={{marginLeft:20}}>
                  <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white',fontSize:20}}>{this.state.username}</Text>
                  <TouchableOpacity 
                    activeOpacity={.6}
                    style={{height:40,backgroundColor:'white',justifyContent:'center',alignItems:'center', borderRadius:5,marginTop:15}}
                    onPress={ () => Actions.profileSetting({ title: 'Profile Setting' }) }
                  >
                    <Text style={{fontFamily:'arial',color:'#eb6623',fontSize:12}}>EDIT PROFILE </Text>
                  </TouchableOpacity>
                </View>
                  
                  
                </View>
                <View style={{borderBottomColor:'#d8d9d8',borderBottomWidth:1,flex:1,height:50}} ></View>
                <TouchableOpacity 
                  activeOpacity={.6}
                  style={{borderBottomColor:'#d8d9d8',borderBottomWidth:1,flex:1,height:50,justifyContent:'center',paddingLeft:20,paddingRight:20}}
                  onPress={ () => Actions.myCampaign({ title: 'My Campaign' }) }
                >
                  <Text style={{fontFamily:'arial',color:'black',fontSize:14}}>My Campaign</Text>
                </TouchableOpacity>
                <View style={{borderBottomColor:'#d8d9d8',borderBottomWidth:1,flex:1,height:50,justifyContent:'center',paddingLeft:20,paddingRight:20}} >
                  <Text style={{fontFamily:'arial',color:'black',fontSize:14}}>Account Setting </Text>
                </View>
                <View style={{borderBottomColor:'#d8d9d8',borderBottomWidth:1,flex:1,height:50,justifyContent:'center',paddingLeft:20,paddingRight:20}} >
                  <Text style={{fontFamily:'arial',color:'black',fontSize:14}}>General Setting </Text>
                </View>
                <View style={{borderBottomColor:'#d8d9d8',borderBottomWidth:1,flex:1,height:50,justifyContent:'center',paddingLeft:20,paddingRight:20}} >
                  <Text style={{fontFamily:'arial',color:'black',fontSize:14}}>About Us </Text>
                </View>
                <TouchableOpacity onPress={()=>{this.logout()}} style={{borderBottomColor:'#d8d9d8',borderBottomWidth:1,flex:1,height:50,justifyContent:'center',paddingLeft:20,paddingRight:20}} >
                  <Text style={{fontFamily:'arial',color:'black',fontSize:14}}>Logout</Text>
                </TouchableOpacity>
              </ScrollView> 
                
                

                
          
            
        );
    }
    }
const styles = StyleSheet.create({
  container: {
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









