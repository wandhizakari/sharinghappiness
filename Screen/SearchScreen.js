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
  ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:'',
            data:[1,2,3,4,5,6],
            data1:[],
            image:[],
            index:0
        }
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }

    componentWillMount(){
      this.getProgram('a')
      this.getProgram1()
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
        var image =item.galleries&&item.galleries.length >=1?item.galleries[0].image: "https://4.bp.blogspot.com/-5CJNywQX_n8/XOOOo4bN6jI/AAAAAAAADrI/gucSk8GJDiQ6lba5obk9vaR97wo9Us7mgCLcBGAs/s1600/SH3.PNG"
  
      }
       return(
       <ImageBackground source={{ uri:image }} borderRadius={10} style={{width:'100%',height:161,fontFamily:'inter',marginTop:10,justifyContent:'flex-end',marginRight:10}}>
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

    
  

    getProgram= async (e)=>{
        this.setState({loading:true})
        console.log('https://sharinghappiness.org/api/v1/program?keyword='+e)
        fetch('https://sharinghappiness.org/api/v1/program?keyword='+e, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
          let img =[]
          this.setState({loading:false})
          // if(responseJson.result){
          //   for(var a =0;a<responseJson.result.length;a++){
          //     img.push({image:responseJson.result[a].cover_picture.image,title:responseJson.result[a].title,location:responseJson.result[a].optional_location_name,date:responseJson.result[a].end_date,terkumpul:responseJson.result[a].collected,total:responseJson.result[a].target,user:responseJson.result[a].user.name})

          //   }
          // }else{
          //   img =[]
          // }
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
      fetch('https://sharinghappiness.org/api/v1/program?order=popular', {
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
    render() {
        let items =0

        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                <ScrollView style={{flex:1,padding:15,flexDirection:'column'}}>
                <TextInput autoCapitalize = 'none' onChangeText={text => {if(text&&text.length>2){this.getProgram(text)}}}  value={this.state.totalIncome} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:300,paddingLeft:25,marginBottom:15}} placeholder="Search Here"/>
                {this.state.loading?<Text>Feching Data ........</Text>:<FlatList
                  style={{width:'100%',flexDirection:'column'}}
                  numRows={1}
                  data={this.state.data}
                  renderItem={({ item}) => this.renderContent(item)}
                />}
                </ScrollView>
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









