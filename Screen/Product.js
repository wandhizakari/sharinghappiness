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
  RefreshControl
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

      var json = JSON.parse(JSON.stringify(item));
      console.log('loolo')
      console.log(image)
      console.log(item)
      // this.setState({index:this.state.index++})
      var width = (150*item.terkumpul)/item.total

      return (
          <TouchableOpacity 
                   onPress={()=>{Actions.Detail({title:'Detail',slug:item.slug})}} 
                   style={{flex:1, //here you can use flex:1 also
                   flexDirection:'column',marginRight:10}}>
                  <Image style={{width:150,height:100}} resizeMode='cover' source={{ uri:  item.image}}></Image>
                  <Text numberOfLines={1} style={{fontSize:12,width:150}}>{item.title
                  }</Text>
                  <Text numberOfLines={1} style={{fontWeight:'bold',fontFamily:'arial',color:'#9da2b3',fontSize:11}}>{item.location}</Text>
                  <Text numberOfLines={1} style={{fontWeight:'bold',fontFamily:'arial',color:'#9da2b3',fontSize:11}}>Terkumpul Rp {this.rupiah(String(item.terkumpul))}</Text>
                  
                  <View style={{marginTop:10,height:5,width:150,backgroundColor:'#fcebd2',borderRadius:3}}><View style={{height:5,width:width?width:0,backgroundColor:'orange',borderRadius:3}}></View></View>
          
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
        fetch('http://devel.sharinghappiness.org/api/v1/program', {
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
            img.push({image:responseJson.result[a].cover_picture.image,title:responseJson.result[a].title,location:responseJson.result[a].optional_location_name,date:responseJson.result[a].end_date,terkumpul:responseJson.result[a].collected,total:responseJson.result[a].target,slug:responseJson.result[a].slug})

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
      fetch('http://devel.sharinghappiness.org/api/v1/program?filter=popular&page=3', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
        let img1 =[]
        for(var a =0;a<responseJson.result.length;a++){
          img1.push({image:responseJson.result[a].cover_picture.image,title:responseJson.result[a].title,location:responseJson.result[a].optional_location_name,date:responseJson.result[a].end_date,terkumpul:responseJson.result[a].collected,total:responseJson.result[a].target,slug:responseJson.result[a].slug})

        }
        this.setState({data1:img1})
        console.log('***********************************')
        console.log(this.state.data1)
        // if(responseJson.result && responseJson.result.length>0){
        //   this.setState({data1:responseJson.result})
        // }
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getProgram2= async ()=>{
    console.log(this.state)
    this.setState({loading2:true})
    fetch('http://devel.sharinghappiness.org/api/v1/program/end-soon', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log('aaaaaalllmmmooooseeeeeee')
        console.log(responseJson)
      let img1 =[]
      if(responseJson.result){
      for(var a =0;a<responseJson.result.length;a++){
        img1.push({image:responseJson.result[a].cover_picture !== null && responseJson.result[a].cover_picture.image != null?responseJson.result[a].cover_picture.image:'',title:responseJson.result[a].title,location:responseJson.result[a].optional_location_name,date:responseJson.result[a].end_date,terkumpul:responseJson.result[a].collected,total:responseJson.result[a].target,slug:responseJson.result[a].slug})

      }
      this.setState({data2:img1,loading2:false})
    }
      console.log('***********************************')
      console.log(this.state.data2)
      // if(responseJson.result && responseJson.result.length>0){
      //   this.setState({data1:responseJson.result})
      // }
      
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
  return <View style={{width:'100%',height:500}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:20,paddingBottom:0,paddingTop:0}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>Latest</Text>
                    <TouchableOpacity onPress={()=>Actions.More({title: 'Latest'})}><Image style={{ width: 20, height: 20 }} resizeMode="contain" source={require('../Images/right-chevron.png')} /></TouchableOpacity>
                </View>
                
                <ScrollView  horizontal={true} style={{padding:15}}>

                <FlatList
                  style={{width:'100%'}}
                  numColumns={9}
                  data={this.state.image}
                  renderItem={({ item}) => this.renderItem(item)}
                />


                </ScrollView>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:20,paddingBottom:0,paddingTop:0}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>Most Founded</Text>
                    <TouchableOpacity onPress={()=>Actions.More({title: 'Most Founded'})}><Image style={{ width: 20, height: 20 }} resizeMode="contain" source={require('../Images/right-chevron.png')} /></TouchableOpacity>
                </View>
                <ScrollView  horizontal={true} style={{padding:15}}>

                <FlatList
                  style={{width:'100%'}}
                  numColumns={9}
                  data={this.state.data1}
                  renderItem={({ item}) => this.renderItem(item,true)}
                />


                </ScrollView>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:20,paddingBottom:0,paddingTop:0}}>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>Almost Done</Text>
                    {this.state.data2== null?null:<TouchableOpacity onPress={()=>Actions.More({title: 'Almost Done'})}><Image style={{ width: 20, height: 20 }} resizeMode="contain" source={require('../Images/right-chevron.png')} /></TouchableOpacity>}
                </View>
                <ScrollView horizontal={true}  vertical={false} style={{padding:15}}>

                <FlatList
                  style={{width:'100%'}}
                  numColumns={10}
                  data={this.state.data2}
                  renderItem={({ item}) => this.renderItem(item)}
                />
                
                {this.state.data2== null?<Text style={{marginLeft:5}}>Data Empty</Text>:null}


                </ScrollView>
        </View>
  }
  
}


 
    render() {
        let items =0

        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                <View style={{flex: 1,flexDirection:'row',padding:10,marginBottom:20,borderBottomWidth:1,borderBottomColor:'#ededed',borderBottomStyle:'solid'}}>
                  <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.setState({zakat:true})} style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
                    <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/zakat.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>ZAKAT</Text>
                  </View>
                  <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
                    <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/infaq.png')}></Image>
                    </View>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>INFAQ</Text>
                  </View>
                  <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
                      <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/sodaqoh.png')}></Image>
                    </View>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>SODAQOH</Text>
                  </View>
                  <View style={{flex: 4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40,justifyContent:'center',alignContent:'center'}}>
                      <Image style={{width:30,top:0,alignSelf:'center'}} resizeMode='contain' source={require('../Images/waqaf.png')}></Image>
                    </View>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10}}>WAKAF</Text>
                  </View>
                  
                </View>
               
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









