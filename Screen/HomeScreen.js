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
            member:0
          
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
      fetch('http://devel.sharinghappiness.org/api/v1/banner', {
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
              arr.push(responseJson.result[i].image)
            
            }
            this.setState({data:arr})
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
    


    fetch('http://devel.sharinghappiness.org/api/v1/sdgs', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState( { loading: false } );
        data = responseJson.result.map( item => {
          
          return {
            image: item.icon,
            title:item.title,
            id:item.id
           
          }
        } );
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
                    images={this.state.data}
                    onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                    />
                </View>

                </ScrollView>
                <ScrollView horizontal={true} contentContainerStyle={{justifyContent:'flex-start',alignContent:'flex-start',padding:0,backgroundColor:'white'}}>
                  <View style={{width:120,height:50,backgroundColor:'black',marginRight:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontWeight:'bold',fontFamily:'arial',color:'orange'}}>{this.state.program}</Text>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>Programs</Text>
                  </View>
                  <View style={{width:120,height:50,backgroundColor:'black',marginRight:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'orange'}}>{this.state.donation}</Text>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>Donations</Text>
                  </View>
                  <View style={{width:120,height:50,backgroundColor:'black',marginRight:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'orange'}}>{this.state.member}</Text>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>Members</Text>
                  </View>
                  
                </ScrollView>
                </View>
                <View style={{flex: 1,flexDirection:'row',padding:10}}>
                  <View style={{flex: 2, backgroundColor: '#65b4ce',height:50,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>CREATE CAMPAIGN</Text>
                  </View>
                  <View style={{flex: 2, backgroundColor: '#eb6623',height:50,marginLeft:5,borderRadius:5,justifyContent:'center',alignItems:'center'}} >
                      <Text style={{fontWeight:'bold',fontFamily:'arial',color:'white'}}>CREATE CAMPAIGN</Text>
                  </View>
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
                  <Image source={{uri:item.image}} style={{width:widthScreen /2.2, backgroundColor: 'powderblue',height:178,marginRight:5,borderRadius:5}} resizeMode="contain"/>
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









