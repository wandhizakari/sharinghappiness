import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 100 : 54,
    flexDirection: 'row',
    paddingTop: '5%',
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default class CustomNavBar extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  _renderLeft() {
    if (Actions.currentScene === 'customNavBar1') {
      return (
        <TouchableOpacity onPress={() => console.log('Hamburger button pressed')} style={[styles.navBarItem, { paddingLeft: 10 }]}>
          <Image
            style={{ width: 30, height: 50 }}
            resizeMode="contain"
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png' }}
          />
        </TouchableOpacity>
      );
    }
    return this.props.title !=='Home'?this.props.title =='Payment'? <TouchableOpacity onPress={Actions.home}><Text style={{marginLeft:10,fontWeight:'bold'}}>Close</Text></TouchableOpacity>:(
      <TouchableOpacity onPress={Actions.pop} style={[styles.navBarItem, { paddingLeft: 10 }]}>
         <Image
            style={{ width: 20, height:20 }}
            resizeMode="contain"
            source={require('../Images/back.png')}
          />
      </TouchableOpacity>): <Image style={{width:70,height:70,position:'absolute',left:'5%'}} resizeMode='contain' source={{uri:"https://sharinghappiness.org/files/contentimages/a05b1d7b47ab2b13c4c5c0679d3b1684-20180416142358-tentang-kami_thumbnail_x480.png"}}/>

    
  }

  _renderMiddle() {
    return (
      <View style={[styles.navBarItem,{}]}>
      </View>
    );
  }

  _renderRight() {
    return (
      <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
       
        <TouchableOpacity onPress={() => Actions.Search({title:'search'})} style={{ paddingRight: 10,justifyContent:'center',alignItems:'center' }}>
          <Image style={{ width: 20, height: 20 }} resizeMode="contain" source={require('../Images/search.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let dinamicStyle = {};
    if (Actions.currentScene === 'customNavBar1') {
      dinamicStyle = { backgroundColor: 'white' };
    } else {
      dinamicStyle = { backgroundColor: 'white' };
    }

    return (
      <View style={[styles.container, dinamicStyle,{justifyContent:'center',shadowOpacity: 0.75,elevation:1,shadowRadius: 5,shadowColor: 'gray', shadowOffset: { height: 0, width: 0 },}]}>
        <Text style={{alignSelf:'center',position:'absolute',zIndex:99,fontWeight:'bold',fontSize:17,color:'#eb6623'}}>{this.props.title}</Text>
        {this._renderLeft()}
        {this._renderMiddle()}
        {this._renderRight()}
      </View>
    );
  }
}