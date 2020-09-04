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
import Snackbar from 'react-native-snackbar';
import { Actions } from 'react-native-router-flux';

type Props = {};
export default class InformationScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: {},
      cityData: {},
      provinceData: {},

      category: '',
      title: '',
      targetFund: '',
      deadline: '',
      date: '',
      location: '',
      province: '',
      city: '',
      link: '',

      content: '',
      description: '',
      highlight: '',
      urlVideo: '',

      isDTPVisible: false,
      role: '',

      loading: false,

      dataCategoryRaw: [],
      dataCategory: [],
      dataProvinceRaw: [],
      dataProvince: [],
      dataCityRaw: [],
      dataCity: [],
    }
  }

  componentDidMount() {
    this.getDataCategory(true)
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

  getDataCategory = (init=false) => {
    fetch('https://sharinghappiness.org/api/v1/program-category?perPage=500', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      let data = respJson.result
      console.log({categoryRaw: data})
      let newData = []
      for (let i=0; i < data.length; i++) {
        newData[i] = { label: data[i].title, value: data[i].id, key: data[i].id }
      }
      console.log({category: data})
      this.setState({ dataCategoryRaw: respJson.result, dataCategory: newData })
      this.props.setData({dataCategoryRaw: respJson.result})
      this.getDataProvince(init)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  getDataProvince = (init=false) => {
    this.setState({ loading: true })
    fetch('https://sharinghappiness.org/api/v1/masterdata/province?perPage=100', {
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
        this.props.setData({dataProvinceRaw: data})
        this.getDataCity(null, init)
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
  getDataCity = (id=null, init=false) => {
    this.setState({ loading: true })
    let uri = id ? `province/${id}` : ''
    fetch(`https://sharinghappiness.org/api/v1/masterdata/city/${uri}?perPage=600`, {
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
        this.props.setData({dataCityRaw: data})
        this.setState({ dataCityRaw: respJson.result, dataCity: newData })
        this.props.isEdit 
          ? init ? this.getDetail() : this.setState({ loading: false })
          : this.setState({ loading: false })
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
  getDetail = () => {
    let item = this.props.dataProgram
    console.log({ itemmmmm: item })
    this.setState({
      idProgram: item.id,
      categoryData: item.category,
      cityData: item.city,
      category: item.category.id,
      title: item.title,
      targetFund: item.target,
      deadline: item.end_date,
      location: item.optional_location_name,
      province: item.city.province_id,
      city: item.city.id,
      link: item.slug,

      content: '', 
      description: item.description, 
      highlight: item.highlight,
      urlVideo: '', 

      loading: false,
    })
  }

  async selanjutnya() {
    let { category, title, targetFund, deadline, date, location, province, city, link, categoryData, cityData, provinceData, idProgram } = this.state
    let data = {
      category,
      title,
      targetFund,
      deadline,
      date,
      location,
      province,
      city,
      link,
      categoryData,
      cityData, 
      provinceData,
      idProgram,
    }
    await this.props.changeTab(1)
    await this.props.setData(data)
    await global._DESCRIPTION_CREATE.setState({ 
      // content: '', 
      description: this.state.description, 
      highlight: this.state.highlight,
      urlVideo: this.state.urlVideo, 
      // baseAmount, 
      // receiver
    })
  }

  render() {
    let { dataCategory, dataProvince, dataCity, category, title, targetFund, deadline, date, location, province, city, link, cityData, categoryData } = this.state
    let { data } = this.props // all data create campaign
    console.log('provinceprovinceprovince',province)
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={ styles.container } keyboardShouldPersistTaps='handled'>
          <View style={ styles.content }>
            <FormPicker
              data={ dataCategory }
              label='Kategori Campaign'
              value={category}
              valueTemp={ this.props.isEdit ? categoryData.title : false } // valueTemp untuk value sementara jika id value tidak ada pada list
              onValueChange={ (val) => this.setState({ category: val.value, categoryData: {} }) }
            />
            <FormInput
              label='Judul Campaign'
              value={title}
              onChangeText={ title => this.setState({ title }) }
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
            {/* <FormDate
              label='Pilih Tanggal'
              value={ date ? moment(date).format('DD/MM/YYYY') : '' } // if date not filled, then show empty string
              openDTP={ () => this.setState({ isDTPVisible: true, role: 'date' }) }
            /> */}
            <FormInput
              label='Lokasi Penyaluran'
              value={location}
              onChangeText={ (location) => this.setState({ location }) }
            />
            <FormPicker
              data={ dataProvince }
              label='Provinsi'
              value={province}
              onValueChange={ async (val) => {
                await this.setState({ province: val.value, city: '', provinceData: {} })
                this.getDataCity(val.value)
              }}
            />
            <FormPicker
              data={ dataCity }
              label='Kota'
              value={city}
              valueTemp={ this.props.isEdit ? cityData.name : false } // valueTemp untuk value sementara jika id value tidak ada pada list
              onValueChange={ (val) => this.setState({ city: val.value, cityData: {} }) }
            />
            <FormInput
              label='Tentukan link untuk campaign'
              value={link}
              autoCapitalize='none'
              onChangeText={ (link) => this.setState({ link }) }
            />

            <TouchableOpacity 
              activeOpacity={.6}
              style={ styles.btnSubmit }
              onPress={ () => this.selanjutnya() }
            >
              <Text style={ styles.submitText }>Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        {
          this.state.loading && 
            <View style={ styles.loading }>
            <Text style={ styles.loadingText }>Loading..</Text>
          </View>
        }

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



