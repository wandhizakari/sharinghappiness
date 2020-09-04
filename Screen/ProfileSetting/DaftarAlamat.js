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
export default class DaftarAlamatScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',
      addressList: [],
      loading: true
    }
    global._DAFTAR_ALAMAT = this
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    await this.setState({ token, email })
    this.getDataAddress()
  }

  getDataAddress = async () => {
    this.setState({ loading: true })
    let { token, email } = this.state
    fetch(`https://sharinghappiness.org/api/v1/user/address?token=${token}&token_email=${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      this.setState({ loading: false })
      console.log('getDataAddress', respJson)
      if(respJson.status == 20 ) {
        let data = respJson.result?respJson.result.data:[]
        this.setState({ addressList: data })
      } else {
        Snackbar.show({
          text: respJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#bb0000'
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  deleteDataAddress = async (id) => {
    this.setState({ loading: true })
    let { token, email } = this.state
    console.log(`https://sharinghappiness.org/api/v1/user/address/delete/${id}?token=${token}&token_email=${email}`)
    fetch(`https://sharinghappiness.org/api/v1/user/address/delete/${id}?token=${token}&token_email=${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      this.setState({ loading: false })
      console.log('deleteDataAddress', respJson)
      if (respJson.status == 20) {
        Snackbar.show({
          text: respJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#4BB543'
        })
        this.getDataAddress()
      } else {
        Snackbar.show({
          text: respJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#bb0000'
        });
        this.setState({ loading: false })
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    let { addressList } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={ styles.container }>
          <View style={ styles.infoWrapper }>
            <Text style={ styles.infoText }>Alamat diperlukan untuk pengiriman reward jika memenuhi syarat dan ketentuan dari campaigner.</Text>
          </View>

          <View style={ styles.content }>
            {
              addressList.map((item, index) => (
                <View key={'key'+index} style={ styles.itemWrapper }>
                  <Icon name='home' size={40} color='#4D4D4D' />
                  <View style={ styles.itemDesc }>
                    <Text style={ styles.itemTitleText }>{ item.address_name }</Text>
                    <Text style={ styles.itemAddressText }>{ item.receiver_address }</Text>
                  </View>
                  <View style={ styles.itemAction }>
                    <TouchableOpacity
                      activeOpacity={.6}
                      style={ styles.btnAddressAction }
                    >
                      <Icon name='pencil' size={18} color='#BDBDBD' />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={.6}
                      style={ styles.btnAddressAction }
                      onPress={ () => {
                        Alert.alert(
                          'Hapus Alamat',
                          'Apakah anda yakin akan menghapus alamat ini?',
                          [
                            {
                              text: 'Batal',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {text: 'Ya', onPress: () => this.deleteDataAddress(item.id) },
                          ],
                          {cancelable: false},
                        );
                      }}
                    >
                      <Icon name='trash' size={18} color='#BDBDBD' />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            }
          </View>

          <TouchableOpacity 
            activeOpacity={.6}
            style={ styles.btnSubmit }
            onPress={ () => Actions.tambahAlamat({ title: 'Tambah Alamat' }) }
          >
            <Text style={ styles.submitText }>Tambah Alamat Baru</Text>
          </TouchableOpacity>
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

  content: {
    flex: 1,
    marginTop: 15
  },
  itemWrapper: {
    ...shdw,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    // height: 100,
    padding: 15,
    alignItems: 'center'
  },
  itemDesc: {
    paddingVertical: 15,
  },
  itemTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4D4D4D',
    textAlign: 'center',
  },
  itemAddressText: {
    fontSize: 16,
    color: '#4D4D4D',
  },
  itemAction: {
    flexDirection: 'row'
  },
  btnAddressAction: {
    marginHorizontal: 2.5,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E7E7E7'
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