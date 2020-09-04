import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
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
    async componentDidMount() {
      this.setState({ loading: true })
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      await this.setState({ token, email })
      this.load()
      this.transaction()
    }


    load() {
      this.setState( { loading: true ,index:this.state.index+1} );
      let { token, email } = this.state
      let url =`https://sharinghappiness.org/api/v1/user/program-transaction?token=${token}&token_email=${email}`
      fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          console.log('koreaaaakkkk')

          this.setState( { loading: false } );
         
          data = responseJson.result
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
    transaction() {
      this.setState( { loading: true ,index:this.state.index+1} );
      let { token, email } = this.state
      let url =`https://sharinghappiness.org/api/v1/user/program-transaction?token=${token}&token_email=${email}`
      fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          console.log('kokokokokk')
         
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    onScrollEnd( event ) {
      const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
      const height = Math.floor( event.nativeEvent.contentSize.height );
      if ( scrollHeight >= height && this.props.title != 'Zakat' ) {
        // this.load();
      }
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

    render() {
        let items =0
        var PATTERN ="a"
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
                 <View style={{backgroundColor:'#eb6623',padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                   <View>
                    <Text style={{color:'white'}}>Total</Text>
                    <Text style={{color:'white',fontWeight:'bold'}}>{this.rupiah(item.amount)}</Text>
                   </View>
                   <View>
                    <Text style={{color:'white'}}>Status</Text>
                    <Text style={{color:'white',fontWeight:'bold'}}>{item.status}</Text>
                   </View>
                  </View>
                 <View style={{backgroundColor:'white',padding:10}}>
                   <Text>{item.program.title}</Text>
                   <Text>Pembayaran :</Text>
                   <Text>{item.payment_method.bank.name}</Text>
                   <Text>Atas Nama {item.payment_method.account_name}</Text>
                   <Text style={{fontSize:16}}>No Rek {item.payment_method.account_number}</Text>
                   <Text>{item.payment_method.type}</Text>

                 </View>

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









