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
  Share,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Actions } from 'react-native-router-flux'; // New code
import { SliderBox } from "react-native-image-slider-box";
import Snackbar from 'react-native-snackbar';
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            content:[],
            images: []
        }
    }

    async componentDidMount() {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      await this.setState({ token, email })
      this.getProgram()
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }

    


    componentWillMount(){
      const value = AsyncStorage.getItem('logined')
        AsyncStorage.getItem('token').then((res) =>{
            if(res ){
               this.setState({token:res})
            }else{
            }
        })
      this.getDetail()
    //   this.getProgram1()
    //   console.log('dsadewr444r4t4t')
    //   console.log(this.props.item)
    }

    rupiah = (bilangan) =>{
      var	number_string = bilangan.toString(),
        sisa 	= number_string.length % 3,
        rupiah 	= number_string.substr(0, sisa),
        ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
          
      if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }
      return rupiah
    }
    
    getDetail= async ()=>{
        console.log('http://sharinghappiness.org/api/v1/program/'+this.props.slug)
        fetch('http://sharinghappiness.org/api/v1/program/'+this.props.slug, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.status == 30) {
            Snackbar.show({
              text: responseJson.message,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: '#bb0000',
            })
            Actions.pop()
          } else {
            let img = []
            if(responseJson.result.galleries !=null){
              responseJson.result.galleries.map( item => {
                  img.push({image:item.image})
    
              })
            }
            this.setState({images: img,content:responseJson.result,width:((widthScreen*responseJson.result.collected)/responseJson.result.target)})
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  addWishlist= async ()=>{
      let { token, email } = this.state
      let url =`https://sharinghappiness.org/api/v1/program/`+this.props.slug+`/wishlist?token=${token}&token_email=${email}`

      fetch(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status == 20) {
          Snackbar.show({
            text: responseJson.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'green',
          })
          this.checkWishlist()
          // Actions.pop()
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
  unWishlist= async ()=>{
    let { token, email } = this.state
    let url =`https://sharinghappiness.org/api/v1/program/`+this.props.slug+`/remove-wishlist?token=${token}&token_email=${email}`

    fetch(url, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      if (responseJson.status == 20) {
        Snackbar.show({
          text: responseJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'green',
        })
        this.checkWishlist()
        // Actions.pop()
      }
      
    })
    .catch((error) => {
      console.error(error);
    });
}
  checkWishlist= async ()=>{
    let { token, email } = this.state
    let url =`https://sharinghappiness.org/api/v1/program/`+this.props.slug+`/wishlist-status?token=${token}&token_email=${email}`

    fetch(url, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      if (responseJson.status == 20) {
        this.setState({wishlist:responseJson.result})
        // Actions.pop()
      }
      
    })
    .catch((error) => {
      console.error(error);
    });
}
    renderDonatur = (item) =>{
       
                return <View style={{marginTop:10, flexDirection:'row',padding:20,borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5}}>
                        <Image resizeMode="contain" source={{uri:item.user.picture_small_cover != null?item.user.picture_small_cover:'https://cdn2.iconfinder.com/data/icons/gaming-and-beyond-part-2-1/80/User_gray-512.png'}} style={{width:50,height:50, flexDirection:'column',padding:20,borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5}} />

                        <View style={{marginLeft:10, flexDirection:'column',borderColor:'#0000000d',borderWidth:0,borderStyle:'solid',borderRadius:5}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14,lineHeight:20}}>{item.user.name}</Text>
                                {item.user.profile && item.user.profile.is_verified?<Image resizeMode="contain" source={{uri:'https://cdn4.iconfinder.com/data/icons/colicon/24/checkmark_done_complete-512.png'}} style={{alignSelf:'center', width:15,height:15, flexDirection:'column',borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5,marginLeft:10}} />:null}
                            </View>
                        </View>
                    </View>
       
    }
    deleteProgram = (id) => {
      this.setState({ loading: true })
      let { token, email } = this.state
  
      fetch(`https://sharinghappiness.org/api/v1/user/program/delete/${id}?token=${token}&token_email=${email}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ loading: false })
          if (responseJson.status != 20) {
            Snackbar.show({
              text: responseJson.message,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: '#bb0000',
            })
          } else {
            Actions.home()
            Snackbar.show({
              text: responseJson.message,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: '#4BB543'
            })
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    onShare = async () => {
      let  text = 'Want more buzz around your photos on Insta, Facebook, Twitter, Whatsapp posts?\n\nLet\'s make your stories get more eyeballs..\nDownload TagWag App '
       

        Share.share({
          
            url:this.state.content.share?this.state.content.share:'https://sharinghappiness.org/',
            
        }, {
            // Android only:
            dialogTitle: 'Share TagWag App',
            // iOS only:
            excludedActivityTypes: []
        })
    };

    renderButtonLike = () =>{
      if(!this.state.content.is_like){
      return (
        <View style={{marginTop:10,flexDirection:'row',borderRadius:25,width:40,height:40,borderColor:'#ff7f50',borderWidth:1,borderStyle:'solid',justifyContent:'center',alignItems:'center'}}>
                          <Image resizeMode="contain" source={require('../Images/heart.png')} style={{width:20,height:20, flexDirection:'column',borderColor:'#ff7f50',borderRadius:5}} />

                        </View>
                       
      )
      }else{
        return (
         
                          <View style={{marginTop:10,flexDirection:'row',borderRadius:25,width:40,height:40,borderColor:'#ff7f50',borderWidth:1,borderStyle:'solid',justifyContent:'center',alignItems:'center'}}>
                            <Image resizeMode="contain" source={require('../Images/full.png')} style={{width:20,height:20, flexDirection:'column',borderColor:'#ff7f50',borderRadius:5}} />
  
                          </View>
        )

      }
    }
   
    render() {
        let items =0
      
        
        return (
          <View style={{backgroundColor:'white'}}>
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                <View style={{flexDirection:'column'}}>
                   <SliderBox
                    hideText={true}
                    images={this.state.images}
                    onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                    />
                </View>
                <View style={{flexDirection:'column',padding:20,paddingBottom:100}}>
                    <Text style={{fontSize:14,fontWeight:'bold',lineHeight:20}}>{this.state.content?this.state.content.title:''}</Text>
                    <Text style={{fontSize:12,lineHeight:20,marginTop:10}}>{this.state.content?this.state.content.title:''}</Text>
                    <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,marginTop:10}}>Rp .{this.state.content.collected?this.rupiah(this.state.content.collected):0}</Text>
                    <View style={{flexDirection:'row'}}><Text style={{fontSize:14,lineHeight:20}}>Terkumpul dari target </Text><Text style={{fontSize:14,fontWeight:'bold', lineHeight:20}}>Rp .{this.state.content.collected?this.rupiah(this.state.content.target):0}</Text></View>
                    <View style={{marginTop:10,width:this.state.width?this.state.width:0,height:5,backgroundColor:'#ff7f50'}}></View>
                    <View style={{flexDirection:'row'}}><Text style={{fontSize:14,lineHeight:20,marginTop:10}}>End date : {this.state.content.end_date?this.state.content.end_date.slice(0,10):null} </Text></View>

                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.onShare}  style={{flexDirection:'row',marginTop:20}}>
                        <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row',borderRadius:25,width:140,height:40,borderColor:'#ff7f50',borderWidth:2,borderStyle:'solid'}}>
                        <Text style={{color:'#ff7f50',marginLeft:10,fontWeight:'bold'}}>Bagikan</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.state.wishlist?this.unWishlist:this.addWishlist}  style={{flexDirection:'row',marginTop:20,marginLeft:10}}>
                        <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row',borderRadius:25,width:140,height:40,borderColor:'#ff7f50',borderWidth:2,borderStyle:'solid'}}>
                        <Text style={{color:'#ff7f50',marginLeft:10,fontWeight:'bold'}}>{this.state.wishlist?'Unwishlist' : 'Add to wishlist'}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    
                    <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,marginTop:20}}>User </Text>
                   <TouchableOpacity onPress={()=>Actions.profileUser({profileUpdated:this.state.content.user.updated_at, profileName:this.state.content.user.name,profileCreated:this.state.content.user.created_at,profilePicture:this.state.content.user.picture,profileId:this.state.content.user.id})}  style={{marginTop:10, flexDirection:'row',padding:20,borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5}}>
                        <Image resizeMode="contain" source={{uri:this.state.content.user&&this.state.content.user.picture != null?this.state.content.user.picture:''}} style={{width:50,height:50, flexDirection:'column',padding:20,borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5}} />

                        <View style={{marginLeft:10, flexDirection:'column',borderColor:'#0000000d',borderWidth:0,borderStyle:'solid',borderRadius:5}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14,lineHeight:20}}>{this.state.content.user?this.state.content.user.name:''}</Text>
                                {this.state.content.user && this.state.content.user.profile.is_verified?<Image resizeMode="contain" source={{uri:'https://cdn4.iconfinder.com/data/icons/colicon/24/checkmark_done_complete-512.png'}} style={{alignSelf:'center', width:15,height:15, flexDirection:'column',borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5,marginLeft:10}} />:null}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,marginTop:20}}>Detail</Text>

                    <WebView
                    style={{marginTop:10,width:widthScreen/1.12,height:300,borderColor:'#0000000d',borderWidth:1,borderStyle:'solid',borderRadius:5}}
                    source={{ html: `
                          <!DOCTYPE html>
                          <html>
                          <head>
                          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">

                            <style type="text/css">
                              body {
                                font-size:34px;
                                font-family: 'Open Sans', sans-serif;
                                color: black;
                                padding: 10px;
                              }

                              p {
                                text-align: justify;
                                font-size:34px;
                                font-family: 'Open Sans', sans-serif;
                              }
                              span {
                                text-align: justify;
                                font-size:34px;
                                font-family: 'Open Sans', sans-serif;
                              }

                              h3{
                                font-size:40px;
                              }
                              img{
                                width:100% !important;
                              }
                            </style>
                          </head>
                          <body>
                            <div style='width:100%'>${this.state.content&&this.state.content.description?this.state.content.description:''}</div>
                          </body>
                          </html>
                        `
                     }}
                  />
                    <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                      <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,marginTop:20,marginBottom:20}}>Donatur ({this.state.content.donatur_count}) </Text>
                      <TouchableOpacity onPress={()=>Actions.all({title:'Donatur',slug:this.state.content.slug,typePage:1,noScroll:this.state.content.donatur_count>=10?false:true})}><Text style={{color:'orange',fontSize:14,fontWeight:'bold',marginTop:20,marginBottom:20, lineHeight:20}}>View All </Text></TouchableOpacity>
                     </View>
                    <FlatList
                    style={{width:'100%'}}
                    numRow={9}
                    data={this.state.content.donatur}
                    renderItem={({ item}) => this.renderDonatur(item)}
                    />
                   <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                      <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,marginTop:20,marginBottom:20}}>Founder ({this.state.content.fundraiser_count}) </Text>
                      <TouchableOpacity onPress={()=>Actions.all({title:'Donatur',slug:this.state.content.slug,typePage:2,noScroll:this.state.content.fundraiser_count>=10?false:true})}><Text style={{color:'orange',fontSize:14,fontWeight:'bold',marginTop:20,marginBottom:20, lineHeight:20}}>View All </Text></TouchableOpacity>
                    </View>
                    <FlatList
                    style={{width:'100%'}}
                    numRow={9}
                    data={this.state.content.fundraiser}
                    renderItem={({ item}) => this.renderDonatur(item)}
                    />

                </View>
                
                
              </ScrollView> 
              <View  style={{padding:20,position:'absolute',top:heightScreen/1.4,flexDirection:'row',justifyContent:'space-between'}}>
             {this.props.creator?<TouchableOpacity onPress={()=>Actions.donasi({title:'Donasi Sekarang',slug:this.state.content.slug})}  style={{flexDirection:'row', width:widthScreen/2.3,height:40,backgroundColor:'orange',borderRadius:5,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,color:'white'}}>Edit</Text>
              </TouchableOpacity>:<TouchableOpacity onPress={()=>Actions.donasi({title:'Donasi Sekarang',slug:this.state.content.slug})}  style={{flexDirection:'row', width:widthScreen/2.3,height:40,backgroundColor:'orange',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                <Image resizeMode="contain" source={require('../Images/heart.png')} style={{width:20,height:20,marginRight:10, flexDirection:'column',borderColor:'#0000000d',borderWidth:0,tintColor:'white',borderStyle:'solid',borderRadius:5}} />

                <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,color:'white'}}> {this.props.zakat?"Zakat Sekarang":"Donasi Sekarang"}</Text>
              </TouchableOpacity>}
              {this.props.creator?<TouchableOpacity onPress={()=>Alert.alert(
          'Are you sure want to delete this program?',
          '',
          [
            
            {text: 'Delete', onPress: () => this.deleteProgram(this.state.content.id) },
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
          ],
          {cancelable: false},
        )} style={{marginLeft:10,width:widthScreen/2.3,height:40,borderColor:'orange',backgroundColor:'white', borderStyle:'solid',borderWidth:2,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
              
              <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,color:'black'}}>Delete</Text>
              </TouchableOpacity>:<TouchableOpacity onPress={()=>Actions.founder({desc:this.state.content.title,title:this.state.content.title.slice(0,25),user:this.state.content.user.name,slug:this.props.slug,id:this.state.content.id})} style={{marginLeft:10,width:widthScreen/2.3,height:40,borderColor:'orange',backgroundColor:'white', borderStyle:'solid',borderWidth:2,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
              
              <Text style={{fontSize:14,fontWeight:'bold', lineHeight:20,color:'black'}}>Jadi fouder</Text>
              </TouchableOpacity>}
            </View>
            </View>
                
                

          
            
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









