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
  AsyncStorage
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
            value:0,
            bankId:0,
            message:'',
            mount:0,
            token:''
        }
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
      this.getBank()
      this.getProgram1()
      this.getDetail()
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

  renderBank = (item,image) => {

    var json = JSON.parse(JSON.stringify(item));
    console.log('loolo')
    console.log(image)
    // this.setState({index:this.state.index++})
    var width = (150*item.terkumpul)/item.total
    if(item.bank_id != null){
    return (
      <TouchableOpacity onPress={()=>this.setState({bankId:item.id})} style={{flex:1,borderColor:this.state.bankId == item.id?'orange':'#eeeeee',borderStyle:'solid',borderWidth:1,borderRadius:5,marginTop:20,padding:20}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{alignItems:'center',width:35,height:35}}>
          <Image style={{width:35,height:35,borderRadius:15}} resizeMode='contain'  source={{ uri: item.image != null?item.image:'https://f0.pngfuel.com/png/299/166/silhouette-of-person-illustration-png-clip-art-thumbnail.png'}} />
        </View>
    <Text style={{fontSize:14,width:131,marginTop:10,marginLeft:10}}>{item.bank_name}</Text>
      </View>
    </TouchableOpacity>
    )
    }else{
      return null
    }
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

    getBank= async ()=>{
        console.log(this.state)
        fetch('https://sharinghappiness.org/api/v1/payment-method', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log('bank')
          console.log(responseJson)
          this.setState({bank:responseJson.result.data})
         
          
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getDetail= async ()=>{
      console.log(this.state)
      fetch('https://sharinghappiness.org/api/v1/program/category/zakat', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log('prog')
        console.log(responseJson)
       
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
    sendDonation= async ()=>{
      alert(this.state.mount)
      fetch('https://sharinghappiness.org/api/v1/program/'+this.props.slug+'/donate?token='+this.state.token+'&token_email=wandhizakari@gmail.com&program_id='+this.props.id+'&payment_method_id='+this.state.bankId+'&custom_usename=anonim&quantity=1&base_amount=660000&amount='+this.state.mount+'&message='+this.state.message, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
      console.log('kakak')
       console.log(responseJson)
       if(responseJson.status == '20'){
        Actions.donasiDone({title: 'Payment',item:responseJson.result})
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
                <View style={{flexDirection:'column',marginTop:50,paddingLeft:20,paddingRight:20}}>
                    {this.props.zakat?<Text>Zakat</Text>:null}
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:20,fontSize:14,marginBottom:10}}>Total donasi</Text>
                    {!this.state.nomi?<TextInput autoCapitalize = 'none' onChangeText={text => this.setState({mount:text})}  value={this.state.mount} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:'100%',paddingLeft:25}} placeholder="Total Donasi"/>:<View autoCapitalize = 'none' onChangeText={text => this.setState({total:text})} value={this.state.total} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:340,paddingLeft:25,flexDirection:'row'}} placeholder="Total income"><Text style={{alignSelf:'flex-start',marginTop:15}}>{this.state.total}</Text><TouchableOpacity onPress={()=>this.setState({nomi:false})}><Image style={{width:10,top:-8,marginLeft:10}} resizeMode='contain' source={require('../Images/close.png')}></Image></TouchableOpacity></View>}
                    <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:20,fontSize:14,marginBottom:10}}>Komentar Anda</Text>
                    <TextInput autoCapitalize = 'none' onChangeText={text=> this.setState({message:text})} value={this.state.message} style={{height:46,borderRadius:3,borderColor:'gray',borderWidth:1,width:'100%',paddingLeft:25,marginTop:0}} placeholder="Your Name"/>
                    <FlatList
                      style={{width:'100%'}}
                      numRows={9}
                      data={this.state.bank?this.state.bank:null}
                      renderItem={({ item}) => this.renderBank(item)}
                    />
                    <TouchableOpacity onPress={()=>this.sendDonation()} style={{width:'100%',marginBottom:10, borderRadius:3,height:46,backgroundColor:'#eb6623',justifyContent:'center',alignItems:'center',marginTop:30}}>
                        <Text style={{color:'white',fontFamily:'arial',fontWeight:'bold'}}>BAYAR SEKARANG </Text>
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









