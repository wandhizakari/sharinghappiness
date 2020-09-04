import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageView,
  Image,
  RefreshControl,
  ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class ForgotScreen  extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            message:'',
            data:[1,2,3,4,5,6],
            data1:[],
            image:[],
            index:0,
            loading2:true,
            zakat:false
        }
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }

    componentWillMount(){
      this.getProgram()
      this.getProgram1()
      this.getProgram2()
    
    }

    

    renderItem(item,image) {
      return (
          <TouchableOpacity onPress={()=>{Actions.Detail({title:'Detail',slug:item.slug})}} 
          >
            {this.renderContent(item)}    
          </TouchableOpacity>
      )
    }

    renderItem1(item) { 

      return (
        <TouchableOpacity onPress={()=>{Actions.Detail({title:'Detail',slug:item.slug})}} 
        >
          {this.renderContent(item)}    
        </TouchableOpacity>
      )

    }
    renderItem2(item) { 

      return (
        <TouchableOpacity onPress={()=>{Actions.Detail({title:'Detail',slug:item.slug})}} 
        >
          {this.renderContent(item)}    
        </TouchableOpacity>
      )

    }

    renderContent(item){
      var persen = (item.collected/item.target)*100
      if(item.collected){
      var total = this.rupiah(item.collected)
      }else{
      var total =0
      }
       return(
       <ImageBackground source={{ uri:item.cover_picture?item.cover_picture.image_small_cover: "https://reactjs.org/logo-og.png" }} borderRadius={10} style={{width:226,height:161,justifyContent:'flex-end',marginRight:10}}>
        <View style={{backgroundColor:'#00000063',borderBottomLeftRadius:10,borderBottomRightRadius:10, width:226,alignItems:'center',justifyContent:'space-between',flexDirection:'row',padding:10}}>
          <View>
          <Text style={{fontSize:12,fontWeight:'bold',color:'white',width:129,height:30}}>{item.title}</Text>
          <Text style={{fontSize:12,color:'white',marginTop:5}}>Terkumpul Rp.{total}</Text>
          </View>
          <View style={{backgroundColor:'white',width:41,height:41,borderRadius:21,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:14,fontWeight:'bold'}}>{persen.toFixed(0)}%</Text>
          </View>
        </View>
      </ImageBackground>)
    }

  

  

    getProgram= async ()=>{
        console.log(this.state)
        fetch('https://sharinghappiness.org/api/v1/program', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log('hhhhhhhhhhhh ')
          console.log({responseJson})
          this.setState({data:responseJson.result})
         
          
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getProgram1= async ()=>{
      console.log(this.state)
      fetch('https://sharinghappiness.org/api/v1/program?filter=popular&page=3', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log({responseJson})
        this.setState({data1:responseJson.result})
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getProgram2= async ()=>{
    console.log(this.state)
    this.setState({loading2:true})
    fetch('https://sharinghappiness.org/api/v1/program/end-soon', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log('aaaaaalllmmmooooseeeeeee')
      this.setState({data2:responseJson.result})
      
      
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

nonZakat= () =>{

  if(this.state.zakat){


  }else{
  return(
    <View style={{width:'100%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
            <Text style={{fontSize:16,color:'#2E2D2D',marginTop:5,fontWeight:'600'}}>Latest</Text>
            <TouchableOpacity onPress={()=>Actions.More({title: 'Latest'})}><Text style={{fontSize:16,color:'#2E2D2D',marginTop:5,fontWeight:'600'}}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView  horizontal={true} style={{flexDirection:'row',padding:20,paddingTop:0}}> 
          <FlatList
            numColumns={9}
            data={this.state.data}
            renderItem={({item}) => this.renderItem(item)}
          />
        </ScrollView>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
            <Text style={{fontSize:16,color:'#2E2D2D',marginTop:5,fontWeight:'600'}}>Mosted</Text>
            <TouchableOpacity onPress={()=>Actions.More({title: 'Most Founded'})}><Text style={{fontSize:16,color:'#2E2D2D',marginTop:5,fontWeight:'600'}}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView  horizontal={true} style={{flexDirection:'row',padding:20,paddingTop:0}}> 
          <FlatList
            numColumns={9}
            data={this.state.data1}
            renderItem={({item}) => this.renderItem1(item)}
          />
        </ScrollView>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
            <Text style={{fontSize:16,color:'#2E2D2D',marginTop:5,fontWeight:'600'}}>Almost Done</Text>
            <TouchableOpacity onPress={()=>Actions.More({title: 'Almost Done'})}><Text style={{fontSize:16,color:'#2E2D2D',marginTop:5,fontWeight:'600'}}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView  horizontal={true} style={{flexDirection:'row',padding:20,paddingTop:0}}> 
          <FlatList
            numColumns={10}
            data={this.state.data2}
            renderItem={({item}) => this.renderItem2(item)}
          />
        </ScrollView>
        
    </View>
  )
  }
  
}

renderNav =() =>{
  return(
      <View style={{flex: 1,flexDirection:'row',padding:10,marginBottom:20,borderBottomWidth:1,borderBottomColor:'#ededed',borderBottomStyle:'solid'}}>
        <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>Actions.More({title: 'Zakat'})} style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
          <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/zakat.png')}></Image>
          </TouchableOpacity>
          <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>ZAKAT</Text>
        </View>
        <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>Actions.More({title: 'Infaq'})} style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
          <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/infaq.png')}></Image>
          </TouchableOpacity>
          <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>INFAQ</Text>
        </View>
        <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>Actions.More({title: 'Sodaqoh'})} style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
            <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/sodaqoh.png')}></Image>
          </TouchableOpacity>
          <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>SODAQOH</Text>
        </View>
        <View style={{flex: 4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>Actions.More({title: 'Waqaf'})} style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
            <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/waqaf.png')}></Image>
          </TouchableOpacity>
          <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>WAKAF</Text>
        </View>
      </View>)
}


 
    render() {
        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                {this.renderNav()}
                {this.nonZakat()}
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









