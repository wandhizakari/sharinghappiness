import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';
import { FormInput, FormDate, FormPicker } from '../../Components/Form';

type Props = {};
export default class InformationScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      title: '',
      targetFund: '',
      deadline: '',
      date: '',
      location: '',
      province: '',
      city: '',
      link: '',

      isDTPVisible: false,
      role: '',

      dataCategoryRaw: [],
      dataCategory: [],
      dataProvinceRaw: [],
      dataProvince: [],
      dataCityRaw: [],
      dataCity: [],
    }
  }

  componentDidMount() {
    this.getDataCategory()
  }

  hideDatePicker = () => {
    this.setState({ isDTPVisible: false })
  }

  handleConfirm = async date => {
    let { role } = this.state

    // you must setState role for every form for type date
    this.state[role] = await moment(date).format('YYYY-MM-DD') 
    this.setState({ isDTPVisible: false })
  }

  getDataCategory = () => {
    fetch('https://sharinghappiness.org/api/v1/program-category', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      let data = respJson.result
      let newData = []
      for (let i=0; i < data.length; i++) {
        newData[i] = { label: data[i].title, value: data[i].id, key: data[i].id }
      }
      this.setState({ dataCategoryRaw: respJson.result, dataCategory: newData })
      this.getDataProvince()
    })
    .catch((error) => {
      console.error(error);
    });
  }
  getDataProvince = () => {
    fetch('https://sharinghappiness.org/api/v1/masterdata/province', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      let data = respJson.result.data
      let newData = []
      for (let i=0; i < data.length; i++) {
        newData[i] = { label: data[i].name, value: data[i].id, key: data[i].id }
      }
      console.log({province: newData})
      this.setState({ dataProvinceRaw: respJson.result, dataProvince: newData })
      this.getDataCity()
    })
    .catch((error) => {
      console.error(error);
    });
  }
  getDataCity = (id=null) => {
    let uri = id ? `province/${id}` : ''
    fetch(`https://sharinghappiness.org/api/v1/masterdata/city/${uri}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      console.log({respJson})
      let data = respJson.result.data
      let newData = []
      for (let i=0; i < data.length; i++) {
        newData[i] = { label: data[i].name, value: data[i].id, key: data[i].id }
      }
      console.log({city: newData})
      this.setState({ dataCityRaw: respJson.result, dataCity: newData })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    let { dataCategory, dataProvince, dataCity, category, title, targetFund, deadline, date, location, province, city, link, stepCount, index, stepLabel } = this.state
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={ styles.container } keyboardShouldPersistTaps='handled'>
          <View style={ styles.content }>
            <FormPicker
              data={ dataCategory }
              label='Kategori Campaign'
              value={category}
              onValueChange={ (category) => this.setState({ category }) }
            />
            <FormInput
              label='Judul Campaign'
              value={title}
              onChangeText={ (title) => this.setState({ title }) }
              maxLength={50}
            />
            <FormInput
              label='Target Dana'
              placeholder='Rp 0'
              value={targetFund}
              onChangeText={ (targetFund) => this.setState({ targetFund }) }
            />
            <FormDate
              label='Deadline Penggalangan Dana'
              value={ deadline ? moment(deadline).format('DD/MM/YYYY') : '' } // if date not filled, then show empty string
              openDTP={ () => this.setState({ isDTPVisible: true, role: 'deadline' }) }
            />
            <FormDate
              label='Pilih Tanggal'
              value={ date ? moment(date).format('DD/MM/YYYY') : '' } // if date not filled, then show empty string
              openDTP={ () => this.setState({ isDTPVisible: true, role: 'date' }) }
            />
            <FormInput
              label='Lokasi Penyaluran'
              value={location}
              onChangeText={ (location) => this.setState({ location }) }
            />
            <FormPicker
              data={ dataProvince }
              label='Provinsi'
              value={province}
              onValueChange={ async (province) => {
                await this.setState({ province })
                this.getDataCity(province)
              }}
            />
            <FormPicker
              data={ dataCity }
              label='Kota'
              value={city}
              onValueChange={ (city) => this.setState({ city }) }
            />
            <FormInput
              label='Tentukan link untuk campaign'
              value={link}
              onChangeText={ (link) => this.setState({ link }) }
            />

            <TouchableOpacity 
              activeOpacity={.6}
              style={ styles.btnSubmit }
              onPress={ () => this.props.changeTab(1) }
            >
              <Text style={ styles.submitText }>Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>


        <DateTimePickerModal
          isVisible={ this.state.isDTPVisible }
          onConfirm={ this.handleConfirm }
          onCancel={ this.hideDatePicker }
        />
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
    backgroundColor: '#F1F2F4',
  },
  content: {
    marginHorizontal: 15,
  },
  stepperBox: {
    ...shdw,
    marginHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center'
  },

  btnSubmit: {
    alignSelf: 'flex-start',
    paddingHorizontal: 27.5,
    paddingVertical: 12.5,
    backgroundColor: '#FF7E50',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  submitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  },

  btnHelp: {
    ...shdw,
    position: 'absolute',
    bottom: 12.5,
    right: 17.5,
    width: 55,
    height: 55,
    borderRadius: 60*2,
    backgroundColor: '#FF7E50',
  },
  imgHelp: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    margin: '15%'
  }
});



