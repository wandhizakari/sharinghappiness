import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
  TextInput
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';

import { FormPicker, FormInput } from '../../Components/Form';
import { Actions } from 'react-native-router-flux';

type Props = {};
export default class TambahAlamatScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dataSession: {},

      info: '',
      name: '',
      phone: '',
      address: '',

      province: '',
      city: '',
      postCode: '',
      dataProvinceRaw: [],
      dataProvince: [],
      dataCityRaw: [],
      dataCity: [],

      loading: false,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const email = await AsyncStorage.getItem('email');
    const dataSession = await AsyncStorage.getItem('dataSession');
    let session = JSON.parse(dataSession)
    console.log({session})

    await this.setState({ dataSession: {...session, email} })
    this.getDataProvince()
  }

  getDataProvince = () => {
    this.setState({ loading: true })
    fetch('https://sharinghappiness.org/api/v1/masterdata/province', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      if (respJson.status == 20) {
        let data = respJson.result.data
        console.log({provinceRaw: data})
        let newData = []
        for (let i=0; i < data.length; i++) {
          newData[i] = { label: data[i].name, value: data[i].id, key: data[i].id }
        }
        console.log({province: newData})
        this.setState({ dataProvinceRaw: respJson.result, dataProvince: newData, loading: false })
        this.getDataCity()
      } else {
        this.setState({ loading: false })
        Snackbar.show({
          text: respJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#bb0000',
          action: {
            text: 'RETRY',
            textColor: '#fff',
            onPress: () => this.getDataProvince(),
          },
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  getDataCity = (id=null) => {
    this.setState({ loading: true })
    let uri = id ? `province/${id}` : ''
    fetch(`https://sharinghappiness.org/api/v1/masterdata/city/${uri}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      if (respJson.status == 20) {
        let data = respJson.result.data
        console.log({cityRaw: data})
        let newData = []
        for (let i=0; i < data.length; i++) {
          newData[i] = { label: data[i].name, value: data[i].id, key: data[i].id }
        }
        console.log({city: newData})
        this.setState({ dataCityRaw: respJson.result, dataCity: newData, loading: false })
      } else {
        this.setState({ loading: false })
        Snackbar.show({
          text: respJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#bb0000',
          action: {
            text: 'RETRY',
            textColor: '#fff',
            onPress: () => this.getDataCity(id),
          },
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  saveAddress = () => {
    this.setState({ loading: true })
    let params = {
      token: this.state.dataSession.token,
      token_email: this.state.dataSession.email,
      user_id: this.state.dataSession.id,
      address_name: this.state.name,
      receiver_name: this.state.name,
      receiver_email: '',
      phone_number: this.state.phone,
      receiver_address: this.state.address,
      province_id: this.state.province,
      city_id: this.state.city,
      postal_code: this.state.postCode,
    }

    console.log({params})

    fetch(`https://sharinghappiness.org/api/v1/user/address/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((response) => response.json())
    .then((respJson) => {
      console.log({respJson})
      this.setState({ loading: false })
      if (respJson.status == 20) {
        Snackbar.show({
          text: respJson.message || 'Data has been created',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#4BB543'
        })
        Actions.pop()
        global._DAFTAR_ALAMAT.getDataAddress()
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


  render() {
    let { dataProvince, province, dataCity, city, } = this.state
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={ styles.container } keyboardShouldPersistTaps='handled'>
          <View style={ styles.titleWrapper }>
            <Text style={ styles.titleText }>Tambah Alamat Baru</Text>
          </View>
          <View style={ styles.form }>
            <FormInput
              label='Isi informasi donatur dengan jelas dan lengkap'
              placeholder='Masukan informasi donatur'
              value={this.state.info}
              onChangeText={ (info) => this.setState({ info }) }
            />
            <FormInput
              label='Nomor Handphone Penerima'
              value={this.state.phone}
              onChangeText={ (phone) => this.setState({ phone }) }
            />
            <FormInput
              multiline
              label='Alamat Lengkap'
              value={this.state.address}
              onChangeText={ (address) => this.setState({ address }) }
            />
            <FormPicker
              data={ dataProvince }
              label='Provinsi'
              value={province}
              onValueChange={ async (val) => {
                await this.setState({ province: val.value })
                this.getDataCity(val.value)
              }}
            />
            <FormPicker
              data={ dataCity }
              label='Kota'
              value={city}
              onValueChange={ (val) => this.setState({ city: val.value }) }
            />
            <FormInput
              label='Kode Pos'
              value={this.state.postCode}
              keyboardType='numeric'
              onChangeText={ (postCode) => this.setState({ postCode }) }
            />
          </View>

          <TouchableOpacity 
            activeOpacity={.6}
            style={ styles.btnSubmit }
            onPress={ this.saveAddress }
          >
            <Text style={ styles.submitText }>Simpan</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>

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
    paddingHorizontal: 15,
    backgroundColor: '#fff'
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
  form: {
    paddingVertical: 10,
  },
  btnSubmit: {
    paddingHorizontal: 27.5,
    paddingVertical: 12.5,
    backgroundColor: '#44ACF5',
    borderRadius: 5,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
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