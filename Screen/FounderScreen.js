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
  AsyncStorage,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            target:0,
            title:'',
            slug:'',
            link:'',
            token:'',
            alert:false,
        }
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }

    componentWillMount(){
      AsyncStorage.getItem('token').then((res) =>{
        if(res != 'true'){
          this.setState({token:res})
        }
      })
      
    }

    

    submit= async ()=>{
        console.log(this.state)
        fetch('https://sharinghappiness.org/api/v1/program/fundraise/'+this.props.id, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: this.state.token,
          token_email:'wandhizakari@gmail.com',
          title: this.state.title,
          slug:this.props.slug,
          highlight:this.props.link,
          target:this.state.target,
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            // if(responseJson.status ==30){
            //   this.setState({message:responseJson.message,alert:true})
            // }
          
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
   
    
    render() {
        let items =0

        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                {this.state.alert?<View style={{justifyContent:'flex-start',alignItems:'center',width:widthScreen,height:heightScreen,backgroundColor:'#00000061',position:'absolute',zIndex:99999}}>
                  <View style={{padding:20,borderRadius:5, marginTop:heightScreen/4,justifyContent:'center',alignItems:'center', width:widthScreen/1.5,backgroundColor:'white',position:'absolute',zIndex:99999}}>
                  <Text style={{fontSize:14,fontWeight:'bold',textAlign:"center",color:'orange'}}>{this.state.message} </Text>
                  <TouchableOpacity onPress={()=>this.setState({alert:false,message:''})}  style={{flexDirection:'row', width:widthScreen/1.7,marginTop:20,height:40,backgroundColor:'orange',borderRadius:5,justifyContent:'center',alignItems:'center'}}>

                      <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,color:'white'}}>Oke</Text>
                    </TouchableOpacity>
                  </View>
                </View>:null}
                
                <View style={{flexDirection:'column',marginTop:50,paddingLeft:20,paddingRight:20}}>
                    <Text style={{fontSize:24,fontWeight:'bold',textAlign:"center"}}>Galang Dana sebagai Fundraiser</Text>
                    <Text style={{fontSize:14,marginTop:20}}>Anda akan menjadi Fundraiser dari campaign   <Text style={{fontSize:14,fontWeight:'bold',textAlign:"center",color:'orange'}}>{this.props.desc} </Text>
Semua donasi yang anda kumpulkan akan disalurkan {this.props.user}</Text>

                    <Text style={{fontSize:14,marginTop:20}}>Target Donasi</Text>
                    <TextInput autoCapitalize = 'none' onChangeText={text => this.setState({target:text})} value={this.state.target} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingLeft:25,marginTop:10}} placeholder="Your Name"/>
                    <Text style={{fontSize:14,marginTop:20}}>Title Campaign</Text>
                    <TextInput autoCapitalize = 'none' onChangeText={text => this.setState({title:text})} value={this.state.title} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingLeft:25,marginTop:10}} placeholder="Your Name"/>
                    <Text style={{fontSize:14,marginTop:20}}>Link Campaign</Text>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Text style={{marginRight:10,fontSize:11}}>https://sharinghappiness.org/</Text><TextInput autoCapitalize = 'none' onChangeText={text => this.setState({link:text})} value={this.state.link} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:140,paddingLeft:25,marginTop:10}} placeholder="Your Name"/></View>
                    <TouchableOpacity onPress={()=>this.submit()}  style={{flexDirection:'row', width:widthScreen/1.1,marginTop:20,height:40,backgroundColor:'orange',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                      <Image resizeMode="contain" source={require('../Images/heart.png')} style={{width:20,height:20,marginRight:10, flexDirection:'column',borderColor:'#0000000d',borderWidth:0,tintColor:'white',borderStyle:'solid',borderRadius:5}} />

                      <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,color:'white'}}>Jadi Fundraiser</Text>
                    </TouchableOpacity>
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









