import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:'',
            data:[1,2,3,4,5,6],
            data1:[1,2,4,4]
        }
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
    render() {
        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                <View style={{flex: 1,flexDirection:'row',padding:20,}}>
                  <Image source={require('../Images/rumah1.png')} resizeMode="contain" style={{flex:2,height:150,marginRight:20,borderRadius:5,borderWidth:1,borderStyle:'solid',borderColor:'gray',justifyContent:'center',alignItems:'center'}}>
                  </Image>
                  <Image source={require('../Images/rumah2.png')} resizeMode="contain" style={{flex:2,height:150,marginRight:5,borderRadius:5,justifyContent:'center',borderWidth:1,borderStyle:'solid',borderColor:'gray',alignItems:'center'}}>
                  </Image>                  
                </View>
                <View style={{flex: 1,flexDirection:'row',padding:20,paddingTop:0}}>
                  <Image source={require('../Images/baznas.png')} resizeMode="contain" style={{flex:2,height:150,marginRight:20,borderRadius:5,borderWidth:1,borderStyle:'solid',borderColor:'gray',justifyContent:'center',alignItems:'center'}}>
                  </Image>
                  <Image source={require('../Images/nucare.jpg')} resizeMode="contain" style={{flex:2,height:150,marginRight:5,borderRadius:5,justifyContent:'center',borderWidth:1,borderStyle:'solid',borderColor:'gray',alignItems:'center'}}>
                  </Image>                  
                </View>
                <View style={{flex: 1,flexDirection:'row',padding:20,paddingTop:0}}>
                <Image source={require('../Images/dompet.png')} resizeMode="contain" style={{flex:2,height:150,marginRight:20,borderRadius:5,borderWidth:1,borderStyle:'solid',borderColor:'gray',justifyContent:'center',alignItems:'center'}}>
                  </Image>
                  <Image  resizeMode="contain" style={{flex:2,height:150,marginRight:5,borderRadius:5,justifyContent:'center',borderWidth:1,borderStyle:'solid',borderColor:'gray',alignItems:'center'}}>
                  </Image>                    
                </View>
                
                
               
                
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









