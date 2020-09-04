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
  Dimensions,
  AsyncStorage,
  Clipboard,
  Share
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Actions } from 'react-native-router-flux'; // New code
import { SliderBox } from "react-native-image-slider-box";
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            images: []
        }
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }


    componentWillMount(){
      alert(this.props.profilePicture)
      const value = AsyncStorage.getItem('logined')
        AsyncStorage.getItem('token').then((res) =>{
            if(res ){
               this.setState({token:res})
            }else{
            }
        })
      this.getProfile()
    //   this.getProgram1()
    //   console.log('dsadewr444r4t4t')
    //   console.log(this.props.item)
    }

    renderDonatur = (item) =>{
       
      return <TouchableOpacity onPress={()=>{Actions.Detail({title:'Detail',slug:item.slug})}}  style={{marginTop:10, flexDirection:'column',borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5}}>
              <Image resizeMode="contain" source={{uri:item.galleries[0].image != null?item.galleries[0].image:'https://cdn2.iconfinder.com/data/icons/gaming-and-beyond-part-2-1/80/User_gray-512.png'}} style={{height:200, flexDirection:'column',padding:20,borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5}} />

              <View style={{marginLeft:10, flexDirection:'column',borderColor:'#0000000d',borderWidth:0,borderStyle:'solid',borderRadius:5}}>
                  <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:14,lineHeight:20,fontWeight:'bold'}}>{item.title}</Text>
                  </View>
              </View>
          </TouchableOpacity>

    }

   
    
  

    getProfile= async ()=>{
        console.log(this.state)
        fetch('https://sharinghappiness.org/api/v1/profile/program/'+this.props.profileId, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({data:responseJson.result})

          
          
         
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
    

    
   
    render() {
        let items =0
      
        
        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                <Image resizeMode="cover" style={{position:'absolute', backgroundColor:'gold',height:200,width:widthScreen,padding:20}} source={{uri:'https://yt3.ggpht.com/a/AGF-l78B6vGq0wBIKoxepbD7zOddji4fhD9JLq6UBA=s900-c-k-c0xffffffff-no-rj-mo'}} />
                <View style={{height:200,justifyContent:'flex-end',padding:20,borderColor:'#F0F2F3',borderStyle:'solid',borderWidth:2}}>
                  <Image source={{uri:this.props.profilePicture}} style={{backgroundColor:'white',height:80,width:80,marginBottom:-50,borderRadius:10}} resizeMode="contain"/>
                </View>
              <View style={{padding:20}}>
                <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,marginTop:20}}>{this.props.profileName}</Text>
                <Text style={{fontSize:14, lineHeight:20,marginTop:20}}>Join since : {this.props.profileCreated.slice(0, 10)}</Text>
                <Text style={{fontSize:14, lineHeight:20,marginTop:10}}>Last seen : {this.props.profileUpdated.slice(0, 10)}</Text>
                <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,marginTop:20}}>Program ({this.state.data.length})</Text>
                <FlatList
                    style={{width:'100%'}}
                    numRow={9}
                    data={this.state.data}
                    renderItem={({ item}) => this.renderDonatur(item)}
                    />
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









