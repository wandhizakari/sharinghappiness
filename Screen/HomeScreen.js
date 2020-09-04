import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  Image
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Masonry from 'react-native-masonry-layout';
import FastImage from 'react-native-fast-image'


import { Actions } from 'react-native-router-flux'; // New code
const screenWidth = Math.round(Dimensions.get('window').width); 
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').width
export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:'',
            data:[1,2,3,4,5,6],
            data1:[1,2,4,4],
            program:0,
            donation:0,
            member:0,
            imageData:[]
          
        }
    }

  onChangeText=(e)=>{
        this.setState({email:e.value})
        
  }

  componentDidMount(){
    this.HomeBanner()
    this.getDetail()
    this.load();
  }

  renderItem(item) {
      return (
          <TouchableOpacity  
                   style={{flex:1, //here you can use flex:1 also
                   }}>
                  <Image style={{width:screenWidth,height:200}} resizeMode='contain' source={{ uri:  item.image_small_banner}}></Image>
          </TouchableOpacity>
      )
  }
  renderItem1(item) {
    return (
        <TouchableOpacity  
                 style={{height:30,width:100,backgroundColor:'black', //here you can use flex:1 also
                 }}>
        </TouchableOpacity>
    )
}
onScrollEnd( event ) {
  const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
  const height = Math.floor( event.nativeEvent.contentSize.height );
  if ( scrollHeight >= height ) {
    this.load();
  }
}

    login   = async ()=>{
        console.log(this.state)
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
    getDetail= async ()=>{
      console.log(this.state)
      fetch('https://sharinghappiness.org/api/v1/home', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({program:responseJson.result.programCount,donation:responseJson.result.donationSum,member:responseJson.result.memberCount})
        

      //   let img = []
      //   if(responseJson.result.galleries){
      //   responseJson.result.galleries.map( item => {
      //       img.push(item.image) 

      //   })
      // }
      //   console.warn(img)
        this.setState({content:responseJson.result,width:((widthScreen*responseJson.result.collected)/responseJson.result.target)})
        
       
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
    HomeBanner = async ()=>{
      let arr =[];
      console.log(this.state)
      fetch('https://sharinghappiness.org/api/v1/banner', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
          if(responseJson.result && responseJson.result.length>0){
            console.log('baner ada')
            for(var i=0;i<responseJson.result.length;i++){
              console.log('****')
              arr.push(responseJson.result[i].image_medium_cover)
            }
            this.setState({data:arr,imageData:responseJson.result})
            console.log(arr)
          }
          
       
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(arr)
     

  }
  load() {
    this.setState( { loading: true ,index:this.state.index+1} );
    


    fetch('https://sharinghappiness.org/api/v1/sdgs', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState( { loading: false } );
        if(responseJson.result){
        data = responseJson.result.map( item => {
          
          return {
            image: item.icon,
            title:item.title,
            id:item.id
           
          }
        } );
        }
        if ( this.state.withHeight ) {
          this.refs.list.addItemsWithHeight( data );
        } else {
          this.refs.list.addItems( data );
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
   
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
    render() {
        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
            <View style={styles.container}>
                
                
                <ScrollView horizontal={true} style={{}}>

                {/* <FlatList
                  style={{width:'100%'}}
                  numColumns={9}
                  data={this.state.data}
                  renderItem={({ item }) => this.renderItem(item)}
                /> */}

                <View style={{flexDirection:'column'}}>
                   <SliderBox
                    data={this.state.imageData}
                    images={this.state.data}
                    
                    />
                </View>

                </ScrollView>
                <ScrollView horizontal={true} contentContainerStyle={{justifyContent:'flex-start',alignContent:'flex-start',padding:0,backgroundColor:'white',marginTop:10}}>
                  <View style={{width:120,height:50,backgroundColor:'black',marginRight:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontWeight:'bold',fontFamily:'arial',color:'orange'}}>{this.rupiah(this.state.program)}</Text>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>Programs</Text>
                  </View>
                  <View style={{width:120,height:50,backgroundColor:'black',marginRight:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'orange'}}>{this.rupiah(this.state.donation)}</Text>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>Donations</Text>
                  </View>
                  <View style={{width:120,height:50,backgroundColor:'black',marginRight:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'orange'}}>{this.rupiah(this.state.member)}</Text>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>Members</Text>
                  </View>
                  
                </ScrollView>
                </View>
                <View style={{flex: 1,flexDirection:'row',padding:10}}>
                  <TouchableOpacity 
                    activeOpacity={.6}
                    style={{flex: 2, backgroundColor: '#eb6623',height:50,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}
                    onPress={()=>{ Actions.createCampaign({ title: 'Create Campaign' }) }}
                  >
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>CREATE CAMPAIGN</Text>
                  </TouchableOpacity>
    
                </View>
                <Masonry onMomentumScrollEnd={this.onScrollEnd.bind( this )}
               style={{ flex: 1, borderWidth: 0, borderColor: "red",backgroundColor:'white' }}
               columns={2} ref="list"
               containerStyle={{ padding: 5 }}
               refreshControl={<RefreshControl
                 refreshing={this.state.isRefreshing}
                 onRefresh={this.onRefresh}
                 tintColor="#ff0000"
                 title="Loading..."
                 titleColor="#00ff00"
                 colors={[ '#ff0000', '#00ff00', '#0000ff' ]}
                 progressBackgroundColor="#ffff00"
               />}
               renderItem={item => <TouchableOpacity
                  onPress={()=>{Actions.allprogram({title:item.title,id:item.id})}} 
                 style={{
                   margin: 5,
                   backgroundColor: "#fff",
                   borderRadius: 5,
                   overflow: "hidden",
                   borderWidth: 0,
                   borderColor: "#dedede"
                 }}>
                 
                <FastImage
                  style={{width:widthScreen /2.2, backgroundColor: '',height:178,marginRight:5,borderRadius:5}}
                  source={{
                      uri: item.image !== null?item.image:'https://4.bp.blogspot.com/-5CJNywQX_n8/XOOOo4bN6jI/AAAAAAAADrI/gucSk8GJDiQ6lba5obk9vaR97wo9Us7mgCLcBGAs/s1600/SH3.PNG',
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
              />
               </TouchableOpacity>}/>
    
          {this.state.loading && <View style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            height:heightScreen,
            width:widthScreen,
            backgroundColor: "rgba(0,0,0,0)"
          }}>
            <Text style={{
              backgroundColor: "#fff",
              paddingVertical: 20,
              paddingHorizontal: 30,
              borderRadius: 10
            }}>Loading..</Text>
          </View>}
                
                
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









