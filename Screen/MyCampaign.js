import React, { Component } from 'react';
import { AsyncStorage, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
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

    fetch(`http://devel.sharinghappiness.org/api/v1/user/program?token=${token}&token_email=${email}`, {
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
          for (var a = 0; a < responseJson.result.length; a++) {
            data.push({
              image: responseJson.result[a].cover_picture ? responseJson.result[a].cover_picture.image : '',
              title: responseJson.result[a].title,
              location: responseJson.result[a].optional_location_name,
              date: responseJson.result[a].end_date,
              terkumpul: responseJson.result[a].collected,
              total: responseJson.result[a].target,
              slug: responseJson.result[a].slug,
              id: responseJson.result[a].id,
              user: responseJson.result[a].user.name,
              dataRaw: responseJson.result[a]
            });
          }
        }
        Snackbar.show({
          text: responseJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#4BB543'
        })
        console.log({data});
        if (responseJson.result && responseJson.result.length > 0) {
          this.setState({ data });
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

    fetch(`http://devel.sharinghappiness.org/api/v1/user/program/delete/${id}?token=${token}&token_email=${email}`, {
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
        <Image style={{width:150,height:100, resizeMode: 'cover'}} resizeMethod='resize' source={{ uri: item.image }} />
        
        <View style={{flexDirection:'column',marginLeft:10}}>
          <Text numberOfLines={2} style={{fontSize:14,width:150}}>{ item.title }</Text>
          <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
          <Image style={{width:10,height:10}} resizeMode='cover' source={require('../Images/price-tag.png')} />
            <View style={{height:30,marginRight:5,borderRadius:5,marginLeft:10}}>
              <Text numberOfLines={1} style={{fontWeight:'bold',fontFamily:'arial',color:'#9da2b3',fontSize:11}}>{item.user}</Text>
            </View>
          </View>
          <View style={{height:5,width:150,backgroundColor:'#fcebd2',borderRadius:3}}><View style={{height:5,width:width?width:0,backgroundColor:'orange',borderRadius:3}}></View></View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          style={{width: '100%', flexDirection: 'column'}}
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
          renderItem={({item, index}) => this.renderItem(item, index)}
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
