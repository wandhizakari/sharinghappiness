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
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
import Masonry from 'react-native-masonry-layout';
const { width } = Dimensions.get( "window" );
const columnWidth = ( width - 10 ) / 2 - 10;
export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:'',
            data:[1,2,3,4,5,6],
            data1:[],
            image:[],
            index:1
        }
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }


    componentWillMount(){
      this.getProgram()
      this.getProgram1()
      this.load()
    }

  getMeta = (url) => {   
    Image.getSize(url, (width, height) => {
      console.log(`The image dimensions are ${width}x${height}`);
      return width
    }, (error) => {
      console.error(`Couldn't get the image size: ${error.message}`);
      return 200
    });
  }
  getMeta2 = (url) => {  
    Image.getSize(url, (width, height) => {
      console.log(`The image dimensions are ${width}x${height}`);
      this.setState({imageWidthSize:width})
    }, (error) => {
      console.error(`Couldn't get the image size: ${error.message}`);
      return 200
    });
  }

    load() {
      this.setState( { loading: true ,index:this.state.index+1} );
      let url ='https://sharinghappiness.org/api/v1/program/sdgs/'
      


      fetch(url+this.props.id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log('------------')
            console.log(responseJson)
          // let img =[]
          // for(var a =0;a<responseJson.result.length;a++){
          //   img.push({image:responseJson.result[a].cover_picture.image,title:responseJson.result[a].title,location:responseJson.result[a].optional_location_name,date:responseJson.result[a].end_date,terkumpul:responseJson.result[a].collected,total:responseJson.result[a].target,user:responseJson.result[a].user.name})

          // }
          // this.setState({image:img})
          // console.log(img)
          // if(responseJson.result && responseJson.result.length>0){
          //   this.setState({data:responseJson.result})
          // }

          this.setState( { loading: false } );
            data = responseJson.result.data.map( item => {
              
              return {
                image: item.cover_picture != null?item.cover_picture.image:'http://devel.sharinghappiness.org/assets/img/logo.png',
                text: item.title,
                height: 150,
                slug:item.slug,
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
  
    onScrollEnd( event ) {
      const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
      const height = Math.floor( event.nativeEvent.contentSize.height );
      if ( scrollHeight >= height ) {
        this.load();
      }
    }

    renderItem(item,image) {

      var json = JSON.parse(JSON.stringify(item));
      console.log('loolo')
      console.log(image)
      // this.setState({index:this.state.index++})
      var width = (150*item.terkumpul)/item.total

      return (
          <TouchableOpacity  
                   style={{width:widthScreen/2, //here you can use flex:1 also
                   flexDirection:'row',marginRight:10,marginBottom:10}}>
                  <Image style={{width:150,height:100}} resizeMode='cover' source={{ uri:  item.image}}></Image>
                  
                  <View style={{flexDirection:'column',marginLeft:10}}>
                    <Text numberOfLines={2} style={{fontSize:14,width:150}}>{item.title
                    }</Text>
                    <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                    <Image style={{width:10,height:10}} resizeMode='cover' source={require('../Images/price-tag.png')}></Image>
                      <View style={{height:30,marginRight:5,borderRadius:5,marginLeft:10}}>
                        <Text numberOfLines={1} style={{fontWeight:'bold',fontFamily:'arial',color:'#9da2b3',fontSize:11}}>{item.user}</Text>
                      </View>
                    </View>
                    <View style={{height:5,width:150,backgroundColor:'#fcebd2',borderRadius:3}}><View style={{height:5,width:width?width:0,backgroundColor:'orange',borderRadius:3}}></View></View>
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

    getProgram= async ()=>{
        console.log(this.state)
        const url= ''
        if(this.props.title == 'Latest'){
          url='http://devel.sharinghappiness.org/api/v1/program'
        }
        
        fetch('http://devel.sharinghappiness.org/api/v1/program?order='+order, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
          let img =[]
          for(var a =0;a<responseJson.result.length;a++){
            img.push({image:responseJson.result[a].cover_picture.image,title:responseJson.result[a].title,location:responseJson.result[a].optional_location_name,date:responseJson.result[a].end_date,terkumpul:responseJson.result[a].collected,total:responseJson.result[a].target,user:responseJson.result[a].user.name})

          }
          this.setState({image:img})
          console.log(img)
          if(responseJson.result && responseJson.result.length>0){
            this.setState({data:responseJson.result})
          }
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getProgram1= async ()=>{
      console.log(this.state)
      fetch('http://devel.sharinghappiness.org/api/v1/program?order=popular', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
        let img =[]
        for(var a =0;a<responseJson.result.length;a++){
          img.push({image:responseJson.result[a].cover_picture.image,title:responseJson.result[a].title,location:responseJson.result[a].optional_location_name,date:responseJson.result[a].end_date,terkumpul:responseJson.result[a].collected,total:responseJson.result[a].target})

        }
        this.setState({data:img})
        console.log(img)
        
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onRefresh = () => {
    this.setState({isRefreshing:false,withHeight:false})
    // this.refs.list.addItemsWithHeight({});
    this.load()
    


  }
    render() {
        let items =0

        return (
          <View style={{ flex: 1, backgroundColor: "#EEE" }}>
          <Masonry onMomentumScrollEnd={this.onScrollEnd.bind( this )}
               style={{ flex: 1, borderWidth: 1, }}
               columns={1} ref="list"
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
                  onPress={()=>{Actions.Detail({title:'details',slug:item.slug})}} 
                 style={{
                   margin: 5,
                   paddingBottom:10,
                   padding:30,
                   backgroundColor: "#fff",
                   borderRadius: 5,
                   overflow: "hidden",
                   borderWidth: 1,
                   borderColor: "#dedede"
                 }}>
                 <Image source={{ uri: item.image }} style={{ height: item.height }} resizeMode='contain' />
                 <Text style={{ padding: 5, color: "#444", fontWeight:'bold' }}>{item.text}</Text>
               </TouchableOpacity>}/>
    
          {this.state.loading && <View style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.3)"
          }}>
            <Text style={{
              backgroundColor: "#fff",
              paddingVertical: 20,
              paddingHorizontal: 30,
              borderRadius: 10
            }}>Loading..</Text>
          </View>}
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









