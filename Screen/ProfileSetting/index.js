import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { TabView } from 'react-native-tab-view';

import EditProfile from './EditProfile'
import DaftarAlamat from './DaftarAlamat'
import VerifikasiAkun from './VerifikasiAkun'

type Props = {};
export default class ProfileSettingScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
      ],
    }
  }

  changeTab = (index) => {
    this.setState({ index })
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return  <EditProfile
                  changeTab={ (index) => this.setState({ index }) } 
                />;
      case 'second':
        return  <DaftarAlamat
                  changeTab={ (index) => this.setState({ index }) } 
                />;
      case 'third':
        return  <VerifikasiAkun
                  changeTab={ (index) => this.setState({ index }) } 
                />;
      default:
        return null;
    }
  };

  render() {
    let { index, routes, stepLabel, data } = this.state
    const initialLayout = { width: Dimensions.get('window').width }
    return (
      <View style={ styles.container }>
        <View style={ styles.stepperBox }>
          <TouchableOpacity 
            activeOpacity={.6}
            style={ index == 0 ? styles.tabActiveWrapper : styles.tabWrapper }
            onPress={ () => this.setState({ index: 0 }) }
          >
            <Text style={ index == 0 ? styles.tabActiveText : styles.tabText }>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={.6}
            style={ index == 1 ? styles.tabActiveWrapper : styles.tabWrapper }
            onPress={ () => this.setState({ index: 1 }) }
          >
            <Text style={ index == 1 ? styles.tabActiveText : styles.tabText }>Daftar Alamat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={.6}
            style={ index == 2 ? styles.tabActiveWrapper : styles.tabWrapper }
            onPress={ () => this.setState({ index: 2 }) }
          >
            <Text style={ index == 2 ? styles.tabActiveText : styles.tabText }>Verifikasi Akun</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.content }>
          <TabView
            navigationState={{ index, routes }}
            renderTabBar={ () => null }
            renderScene={ this.renderScene }
            onIndexChange={ (index) => this.setState({ index }) }
            initialLayout={initialLayout}
          />
        </View>
      </View>
    );
  }
}

const shdw = {
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowRadius: 2.5,
  shadowOpacity: .5
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  stepperBox: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingTop: 20,
    marginTop: 10,
  },
  tabWrapper: {
    flex: 1,
    height: 50,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    marginHorizontal: 1.5,
  },
  tabText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#A3A3A3'
  },
  tabActiveWrapper: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginHorizontal: 1.5,
    borderTopWidth: 3,
    borderColor: '#FF7E50'
  },
  tabActiveText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FF7E50',
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
  },
});



