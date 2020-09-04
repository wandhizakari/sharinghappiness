import React, { Component } from 'react';
import { AsyncStorage, Dimensions, FlatList,ImageBackground, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Actions } from 'react-native-router-flux';
const widthScreen = Dimensions.get('window').width;
export default class ForgotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',
      data: [],

      loading: false
    };
    global._MYCAMPAIGN = this
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    await this.setState({ token, email })
    this.getProgram()
  }

  getProgram = () => {
    this.setState({ loading: true })
    let { token, email } = this.state

    fetch(`https://sharinghappiness.org/api/v1/user/program?token=${token}&token_email=${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log({responseJson});
        let data = [];
        this.setState({loading: false});
        if (responseJson.result) {
          // for (var a = 0; a < responseJson.result.length; a++) {
          //   data.push({
          //     image: responseJson.result[a].cover_picture ? responseJson.result[a].cover_picture.image : '',
          //     title: responseJson.result[a].title,
          //     location: responseJson.result[a].optional_location_name,
          //     date: responseJson.result[a].end_date,
          //     terkumpul: responseJson.result[a].collected,
          //     total: responseJson.result[a].target,
          //     slug: responseJson.result[a].slug,
          //     id: responseJson.result[a].id,
          //     user: responseJson.result[a].user.name,
          //     dataRaw: responseJson.result[a]
          //   });
          // }
        }
        Snackbar.show({
          text: responseJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#4BB543'
        })
        console.log({data});
        if (responseJson.result && responseJson.result.length > 0) {
          this.setState({ data:responseJson.result });
        }
        this.setState({ loading: false })
      })
      .catch(error => {
        console.error(error);
      });
  };
  deleteProgram = (id) => {
    this.setState({ loading: true })
    let { token, email } = this.state

    fetch(`https://sharinghappiness.org/api/v1/user/program/delete/${id}?token=${token}&token_email=${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loading: false })
        if (responseJson.status != 20) {
          Snackbar.show({
            text: responseJson.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#bb0000',
          })
        } else {
          this.getProgram()
          Snackbar.show({
            text: responseJson.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#4BB543'
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderEmpty() {
    return(
      !this.state.loading &&
      <View style={ styles.blankPage }>
        <Text style={ styles.emptyText }>No Data Available</Text>
      </View>
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
      <TouchableOpacity  
      activeOpacity={.6}
      style={{marginBottom:10}}
      onPress={ () => Actions.Detail({ title: 'details', slug: item.slug,creator:true }) }
      onLongPress={() => {
        Alert.alert(
          item.title,
          '',
          [
            {
              text: 'Edit',
              onPress: () => Actions.createCampaign({ title: 'Edit Campaign', isEdit: true, item: item.dataRaw }),
            },
            {text: 'Delete', onPress: () => this.deleteProgram(item.id) },
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
          ],
          {cancelable: false},
        );
      }}
    >
     <ImageBackground source={{ uri:item.cover_picture?item.cover_picture.image_small_cover: "https://reactjs.org/logo-og.png" }} borderRadius={10} style={{width:'100%',height:161,fontFamily:'inter',justifyContent:'flex-end'}}>
      <View style={{backgroundColor:'#00000063',borderBottomLeftRadius:10,borderBottomRightRadius:10, width:'100%',alignItems:'center',justifyContent:'space-between',flexDirection:'row',padding:10}}>
        <View>
        <Text style={{fontSize:12,fontWeight:'bold',color:'white',width:129,height:30}}>{item.title}</Text>
        <Text style={{fontSize:12,color:'white',marginTop:5}}>Terkumpul Rp.{total}</Text>
        </View>
        <View style={{backgroundColor:'white',width:41,height:41,borderRadius:21,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:14,fontWeight:'bold'}}>{persen.toFixed(0)}%</Text>
        </View>
      </View>
    </ImageBackground>
    </TouchableOpacity>)
  }

  renderItem(item, index) {
    var width = (150*item.terkumpul)/item.total
    return (
      <TouchableOpacity  
        activeOpacity={.6}
        style={{width:widthScreen/2, //here you can use flex:1 also
          flexDirection:'row',marginRight:10,marginBottom:10}}
        onPress={ () => Actions.Detail({ title: 'details', slug: item.slug }) }
        onLongPress={() => {
          Alert.alert(
            item.title,
            '',
            [
              {
                text: 'Edit',
                onPress: () => Actions.createCampaign({ title: 'Edit Campaign', isEdit: true, item: item.dataRaw }),
              },
              {text: 'Delete', onPress: () => this.deleteProgram(item.id) },
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            ],
            {cancelable: false},
          );
        }}
      >
       
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          style={{flexDirection: 'column',padding:10}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={ this.getProgram }
              tintColor="#FF7E50"
              title="Loading..."
              titleColor="#FF7E50"
              colors={[ '#FF7E50' ]}
              progressBackgroundColor="#FF7E50"
            />
          }
          numRows={1}
          data={this.state.data }
          extraData={this.state.data }
          renderItem={({item, index}) =>  this.renderContent(item)}
          ListEmptyComponent={ this.renderEmpty() }
          keyExtractor={ (item, index) => 'key'+index }
        />
        {
          this.state.loading && 
            <View style={ styles.loading }>
            <Text style={ styles.loadingText }>Loading..</Text>
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
    paddingVertical: 10
  },
  blankPage: {
    height: 300,
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF7E50',
  },
  loading: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  loadingText: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10
  },
});
