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
  Clipboard
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
      console.log('dsadewr444r4t4t')
      console.log(this.props.item)
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
        fetch('http://devel.sharinghappiness.org/api/v1/payment-method', {
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
    sendDonation= async ()=>{
      console.log(this.state)
      fetch('http://devel.sharinghappiness.org/api/v1/program/'+this.props.slug+'/donate?token='+this.state.token+'&token_email=wandhizakari@gmail.com&program_id='+this.props.id+'&payment_method_id='+this.state.bankId+'&custom_usename=anonim&quantity=1&base_amount=10000&mount='+this.state.mount+'&message='+this.state.message, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log('http://devel.sharinghappiness.org/api/v1/program/'+this.props.slug+'/donate?token='+this.state.token+'&token_email=wandhizakari@gmail.com&program_id='+this.props.id+'&payment_method_id='+this.state.bankId+'&custom_usename=anonim&quantity=1&base_amount=10000&mount='+this.state.mount+'&message='+this.state.message)
       console.log(responseJson)
       
        
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
                <View style={{flexDirection:'column',marginTop:30,paddingLeft:20,paddingRight:20}}>
                <Text style={{fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:20,fontSize:12}}>Batas Pembayaran 12 jam</Text>

                  <TouchableOpacity style={{flex:1,borderColor:'#eeeeee',borderStyle:'solid',borderWidth:1,borderRadius:5,marginTop:20,padding:20}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={{fontSize:14,width:131,marginTop:10,marginLeft:10}}>Nomer Tagihan</Text>

                    <View style={{backgroundColor:'#f2f5f9',padding:5,borderRadius:5}}><Text style={{fontSize:12,width:131,marginTop:10,marginLeft:10}}>{this.props.item.transaction_number}</Text></View>
                   
                  </View>
                    <Text style={{fontSize:14,alignSelf:'center',width:131,marginTop:10,marginLeft:10}}>Jumlah Donasi</Text>
                    <Text style={{fontSize:14,alignSelf:'center',width:131,marginTop:10,marginLeft:10}}>IDR Rp {this.rupiah(this.props.item.amount)}</Text>
                    <TouchableOpacity onPress={()=>{  Clipboard.setString(String(this.props.item.amount))}}><Text style={{alignSelf:'center',fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:20,fontSize:12}}>Salin Jumlah</Text></TouchableOpacity>

                  </TouchableOpacity>
                </View>

                <View style={{flexDirection:'column',marginTop:10,paddingLeft:20,paddingRight:20}}>

                  <TouchableOpacity style={{flex:1,borderColor:'#eeeeee',borderStyle:'solid',borderWidth:1,borderRadius:5,marginTop:20,padding:20}}>
                  
                    <Text style={{fontSize:14,marginTop:10,marginLeft:10}}>Nomer Rekening tujuan</Text>
                    <Text style={{fontSize:14,width:131,marginTop:10,marginLeft:10}}>{this.props.item.payment_method.account_number}</Text>
                    <TouchableOpacity onPress={()=>{  Clipboard.setString(String(this.props.item.payment_method.account_number))}}><Text style={{alignSelf:'center',fontWeight:'bold',fontFamily:'arial',color:'#eb6623',marginTop:20,fontSize:12}}>Salin Nomer Rekening</Text></TouchableOpacity>
                    <Text style={{fontSize:14,marginTop:10,marginLeft:10}}>Atas Nama</Text>
                    <Text style={{fontSize:14,width:131,marginTop:10,marginLeft:10}}>{this.props.item.payment_method.account_name}</Text>
                    <Text style={{fontSize:14,marginTop:10,marginLeft:10}}>Nama Bank</Text>
                    <Text style={{fontSize:14,width:131,marginTop:10,marginLeft:10}}>{this.props.item.payment_method.bank_name}</Text>
                    
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









