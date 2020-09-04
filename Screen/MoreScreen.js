import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

import Masonry from 'react-native-masonry-layout';
import Snackbar from 'react-native-snackbar';
const widthScreen = Dimensions.get('window').width
const { width } = Dimensions.get( "window" );
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
      // this.getProgram()
      // this.getProgram1()
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
      let url =''
      if(this.props.title == 'Latest'){
        url='https://sharinghappiness.org/api/v1/program?page='+this.state.index
      }else if(this.props.title == 'Most Founded'){
        url='https://sharinghappiness.org/api/v1/program?filter=popular&page='+this.state.index
      }else if(this.props.title == 'Zakat'){
        url='https://sharinghappiness.org/api/v1/program/category/zakat?page='+this.state.index
      }else if(this.props.title == 'Infaq'){
        url='https://sharinghappiness.org/api/v1/program/category/infaq?page='+this.state.index
      }else if(this.props.title == 'Sodaqoh'){
        url='https://sharinghappiness.org/api/v1/program/category/sodaqoh?page='+this.state.index
      }else if(this.props.title == 'Waqaf'){
        url='https://sharinghappiness.org/api/v1/program/category/waqaf?page='+this.state.index
      }else{
        url='https://sharinghappiness.org/api/v1/program/end-soon?page='+this.state.index
      }

      fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson.result))
          console.log(JSON.stringify(responseJson.result))
          console.log('koreaaaakkkk')

          this.setState( { loading: false } );
          if(responseJson.result !=null && this.props.title == 'Zakat' || this.props.title == 'Infaq'|| this.props.title == 'Shodaqoh' || this.props.title == 'Waqaf'){
         
            data = responseJson.result?responseJson.result.data.map( item => {
              return item
            } ):null;
          }else{
            if(responseJson.result != null){
             data = responseJson.result.map( item => {
                return item
              } );
            }
            if (responseJson.result == null) {
              Snackbar.show({
                text: responseJson.message,
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: '#bb0000',
              })
            } 
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
  
    onScrollEnd( event ) {
      const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
      const height = Math.floor( event.nativeEvent.contentSize.height );
      if ( scrollHeight >= height && this.props.title != 'Zakat' ) {
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
          url='https://sharinghappiness.org/api/v1/program'
        }
        
        fetch('https://sharinghappiness.org/api/v1/program?order='+order, {
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
    getProgram1= async ()=>{
      console.log(this.state)
      fetch('https://sharinghappiness.org/api/v1/program?order=popular', {
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

  onRefresh = () => {
    this.setState({isRefreshing:false,withHeight:false})
    // this.refs.list.addItemsWithHeight({});
    this.load()
    


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

  renderContent(item){
    var persen = (item.collected/item.target)*100
    if(item.collected){
    var total = this.rupiah(item.collected)
    }else{
    var total =0
    }
    if(item.cover_picture&&item.cover_picture.image_small_cover && item.cover_picture.image_small_cover!==null){
      var image =item.cover_picture.image_small_cover 
    }else{
       // var image = item.galleries[0].image
      var image =item.galleries.length >=1?item.galleries[0].image: "https://4.bp.blogspot.com/-5CJNywQX_n8/XOOOo4bN6jI/AAAAAAAADrI/gucSk8GJDiQ6lba5obk9vaR97wo9Us7mgCLcBGAs/s1600/SH3.PNG"
    }
     return(
     <ImageBackground source={{ uri:image }} borderRadius={10} style={{width:'100%',height:161,fontFamily:'inter',justifyContent:'flex-end',marginRight:10}}>
      <View style={{backgroundColor:'#00000063',borderBottomLeftRadius:0,borderBottomRightRadius:0, width:'100%',alignItems:'center',justifyContent:'space-between',flexDirection:'row',padding:10}}>
        <View>
        <Text style={{fontSize:12,fontWeight:'bold',color:'white',width:200,height:30}}>{item.title}</Text>
        <Text style={{fontSize:12,color:'white',marginTop:5}}>Terkumpul Rp.{total}</Text>
        </View>
        <View style={{backgroundColor:'white',width:41,height:41,borderRadius:21,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:14,fontWeight:'bold'}}>{persen.toFixed(0)}%</Text>
        </View>
      </View>
    </ImageBackground>)
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
                  onPress={()=>{Actions.Detail({title:'details',slug:item.slug,zakat:this.props.title == 'Zakat'?true:false})}} 
                 style={{
                   margin: 5,
                   backgroundColor: "#fff",
                   borderRadius: 5,
                   overflow: "hidden",
                   borderWidth: 1,
                   borderColor: "#dedede"
                 }}>
                 {this.renderContent(item)}
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









