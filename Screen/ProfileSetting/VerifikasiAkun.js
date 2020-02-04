import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';

type Props = {};
export default class VerifikasiAkunScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSession: {}
    }
  }

  async componentDidMount() {
    // this.setState({ loading: true })
    const dataSession = await AsyncStorage.getItem('dataSession');
    let session = JSON.parse(dataSession)
    await this.setState({ dataSession: session })
  }

  render() {
    let { dataSession } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={ styles.container }>
          <View style={ dataSession.is_profile_complete ? styles.infoSuccessWrapper : styles.infoWrapper }>
            <Text style={ dataSession.is_profile_complete ? styles.infoSuccessText : styles.infoText }>
              { dataSession.is_profile_complete ? 'Selamat data anda sudah terverifikasi' : 'Akun anda belum diverifikasi' }
            </Text>
          </View>

          <View style={ styles.content }>
          </View>

        </ScrollView>
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
    paddingHorizontal: 15,
  },
  titleWrapper: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#E7E7E7'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C4C4C'
  },
  infoWrapper: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FFF4C4'
  },
  infoText: {
    fontSize: 14,
    color: '#A79641',
    textAlign: 'center'
  },
  infoSuccessWrapper: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#CBEBD3'
  },
  infoSuccessText: {
    fontSize: 14,
    color: '#51795C',
    textAlign: 'center'
  },

  content: {
    flex: 1,
    marginTop: 15
  },

  btnSubmit: {
    paddingVertical: 12.5,
    backgroundColor: '#44ACF5',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  submitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
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