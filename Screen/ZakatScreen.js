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
  Dimensions
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
            index:0,
            totalIncome:0,
            otherIncome:0,
            debt:0,
            total:0,
            value:0
        }
    }

    onChangeText=(e)=>{
        this.setState({email:e.value})
        
    }

    componentWillMount(){
      this.getProgram()
      this.getProgram1()
        this.setState({value:this.props.nominal})
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
        fetch('http://devel.sharinghappiness.org/api/v1/program?order=newest', {
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
    totalZakat = () =>{
      const total= ((parseInt(this.state.totalIncome)+parseInt(this.state.otherIncome))-parseInt(this.state.debt))*0.025
      console.log(parseInt(this.state.totalIncome)+parseInt(this.state.otherIncome))
      this.setState({total:total})
    }
    close = () =>{
      this.totalZakat()
      this.setState({calculator:false,nomi:true})
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
    render() {
        let items =0

        return (
            <ScrollView style={{flexDirection:'column',backgroundColor:'white'}}> 
                <ScrollView style={{flex:1,padding:15,flexDirection:'column'}}>
                <View style={{flex: 1,flexDirection:'row',padding:10,marginBottom:20,borderBottomWidth:1,borderBottomColor:'#ededed',borderBottomStyle:'solid'}}>
                  <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>Actions.kalkulator({title:'Zakat'})} style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40}}></TouchableOpacity>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10,fontSize:11}}>PENGHASILAN</Text>
                  </View>
                  <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40}}></View>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10,fontSize:11}}>TABUNGAN</Text>
                  </View>
                  <View style={{flex:4,marginRight:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:78,height:78,borderColor:'#eb6623',borderWidth:2,borderStyle:'solid',borderRadius:40}}></View>
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:10,fontSize:11}}>PERDAGANGAN</Text>
                  </View>
                 
                  
                </View>
                </ScrollView>
                <View style={{flexDirection:'column',marginTop:50,paddingLeft:20,paddingRight:20}}>
                    {!this.props.nominal?<TextInput autoCapitalize = 'none' onChangeText={text => this.setState({value:text})} value={this.state.value} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingLeft:25}} placeholder="Total income"/>:<Text style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingTop:15,paddingLeft:25}}>{this.props.nominal}</Text>}
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:20,fontSize:11}}>Min 10000</Text>
                    <TouchableOpacity style={{color:'#eb6623',position:'absolute',right:30,top:-10}} onPress={()=>Actions.kalkulator({title:'Zakat'})}><Image style={{width:20}} resizeMode='contain' source={require('../Images/calculator.png')}></Image></TouchableOpacity>
                    <TextInput autoCapitalize = 'none' onChangeText={text => this.onChangeText({type:'password',value:text})} value={this.state.password} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingLeft:25,marginTop:20}} placeholder="Your Name"/>
                    <TouchableOpacity onPress={()=>Actions.donasi({title:'Zakat',slug:'zakat-penghasilan',zakat:true})} style={{width:340,borderRadius:3,height:46,backgroundColor:'#eb6623',justifyContent:'center',alignItems:'center',marginTop:30}}>
                        <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>BAYAR SEKARANG {this.state.otherIncome}</Text>
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









