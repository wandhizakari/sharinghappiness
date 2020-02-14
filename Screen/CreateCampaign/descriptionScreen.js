import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormInput } from '../../Components/Form';
import Snackbar from 'react-native-snackbar';
import { Actions } from 'react-native-router-flux';

const widthScreen = Dimensions.get('window').width

type Props = {};
export default class DescriptionScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      baseAmount: '12000000',
      receiver: '10000000',
      highlight: 'Butuh Cepat untuk Operasi kanker anak sebatang kara',
      urlVideo: 'https://www.youtube.com/watch?v=9xwazD5SyVg',
      content: '<h2>Content</h2>',
      description: '<h2>Sharing Happiness</h2>',
      imageData: [],
      dataSession: {},

      isDTPVisible: false,
      role: '',
      loading: false,
    }
  }

  async componentDidMount() {
    const email = await AsyncStorage.getItem('email');
    const dataSession = await AsyncStorage.getItem('dataSession');
    let session = JSON.parse(dataSession)
    console.log({session})

    await this.setState({ dataSession: {...session, email} })
  }

  pickImage() {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let { imageData } = this.state
        let newData = await imageData.slice(0)
        newData[imageData.length] = await response
        
        this.setState({ imageData: newData })
      }
    });
  }

  async save() {
    let { data:{ dataCategoryRaw, dataProvinceRaw, dataCityRaw, category, province, city } } = this.props
    let { highlight, urlVideo, baseAmount, receiver } = this.state
    this.setState({ loading: true })

    console.log('wekekeke',{dataCategoryRaw, dataProvinceRaw, dataCityRaw})

    let content = await this.richText.getContentHtml();
    let description = await this.richText.getContentHtml();
    await this.props.setData({ content, description, highlight, urlVideo, baseAmount, receiver })
    await this.setState({ content: content, description: description })

    const token = await AsyncStorage.getItem('token');

    let selectedCategory = await dataCategoryRaw.find(e => e.id == category) // get/find data category by category id selected
    let selectedProvince = await dataProvinceRaw.find(e => e.id == province) // get/find data province by category id selected
    let selectedCity = await dataCityRaw.find(e => e.id == city) // get/find data city by category id selected

    let { data } = this.props
    let params = {
      token: token,
      token_email: this.state.dataSession.email,
      user_id: this.state.dataSession.id,
      // program_type_id: parseInt(selectedCategory.program_type_id),
      program_category_id: parseInt(selectedCategory.id),
      // parent_id: 1,
      title: data.title,
      slug: data.link,
      highlight: data.highlight,
      description: data.description,
      end_date: data.deadline,
      city_id: parseInt(selectedCity.id),
      province_id: parseInt(selectedProvince.id),
      // country_id: 1,
      optional_location_name: data.location,
      // base_amount: parseInt(data.baseAmount),
      target: parseInt(data.targetFund),
      // receiver: parseInt(data.receiver),
      // position_order: 1,
      is_show_target: 1,
      // discount_price: 0,
      optional_video_url: data.urlVideo,
      images: [],
      is_rewarded: 0,
      // title_reward: 'title_reward',
      // condition: 2,
      // stock_count: 1,
      // content: data.content,
      rewards: [],
    }
    console.log({params}, JSON.stringify(params))

    fetch('http://devel.sharinghappiness.org/api/v1/user/program/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then((response) => response.json())
    .then((respJson) => {
      this.setState({ loading: false })
      if (respJson.status != 20) {
        Snackbar.show({
          text: respJson.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#bb0000',
        });
      } else {
        Snackbar.show({
          text: respJson.message || 'Data has been created',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#4BB543'
        })
        Actions.pop()
      }
      console.log({respJson})
    })
    .catch((error) => {
      console.error(error);
    });

    console.log({params})
  }

  render() {
    let { content, description, highlight, urlVideo, baseAmount, receiver, imageData } = this.state
    let { data } = this.props // all data create campaign
    console.log(data)
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={ styles.container } keyboardShouldPersistTaps='handled'>
          <View style={ styles.content }>
            <FormInput
              label='Highlight'
              value={highlight}
              onChangeText={ (highlight) => this.setState({ highlight }) }
            />
            {/* <FormInput
              label='Receiver'
              keyboardType='numeric'
              value={receiver}
              onChangeText={ (receiver) => this.setState({ receiver }) }
            /> */}
            {/* <FormInput
              label='Base AMount'
              keyboardType='numeric'
              value={baseAmount}
              onChangeText={ (baseAmount) => this.setState({ baseAmount }) }
            /> */}
            <FormInput
              label='Video URL'
              value={urlVideo}
              onChangeText={ (urlVideo) => this.setState({ urlVideo }) }
            />

            <View style={ styles.formWrapper }>
              <View style={ styles.formTitle }>
                <Text style={ styles.lbForm }>Gambar</Text>
              </View>
              <View style={ styles.formInputBox }>
                {
                  imageData.map((item, index) => {
                    return (
                      <View key={'key'+index} style={ styles.boxImage }>
                        <Image
                          source={{ uri: item.uri }}
                          style={ styles.imgBox }
                        />
                          <TouchableOpacity 
                            activeOpacity={.6}
                            style={ styles.btnRemoveImg }
                            onPress={ async () => {
                              let dataHelper = await imageData.slice(0) //copy data
                              await dataHelper.splice(index, 1)
                              this.setState({ imageData: dataHelper })
                            }}
                          >
                            <Text style={ styles.boxRemoveText }>x</Text>
                          </TouchableOpacity>
                      </View>
                    )
                  })
                }
                {
                  imageData.length < 4 && // max 4 image for upload
                    <TouchableOpacity 
                      activeOpacity={.6}
                      style={ styles.boxAddImage }
                      onPress={ () => this.pickImage() }
                    >
                      <Text style={ styles.boxAddText }>+</Text>
                    </TouchableOpacity>
                }
              </View>
            </View>

            <View style={ styles.formWrapper }>
              <View style={ styles.formTitle }>
                <Text style={ styles.lbForm }>Konten</Text>
              </View>
              <View style={ styles.formInput }>
                <View style={ styles.formInputRight }>
                  <RichEditor
                    ref={ rf => this.richText = rf }
                    initialContentHTML={content}
                    style={styles.rich}
                  />
                </View>
              </View>
              <RichToolbar
                style={styles.richBar}
                getEditor={() => this.richText}
                iconTint={'#000033'}
                selectedIconTint={'#2095F2'}
                selectedButtonStyle={{backgroundColor: "transparent"}}
                onPressAddImage={this.onPressAddImage}
              />
            </View>

            <View style={ styles.formWrapper }>
              <View style={ styles.formTitle }>
                <Text style={ styles.lbForm }>Deskripsi</Text>
              </View>
              <View style={ styles.formInput }>
                <View style={ styles.formInputRight }>
                  <RichEditor
                    ref={ rf => this.richText = rf }
                    initialContentHTML={description}
                    style={styles.rich}
                  />
                </View>
              </View>
              <RichToolbar
                style={styles.richBar}
                getEditor={() => this.richText}
                iconTint={'#000033'}
                selectedIconTint={'#2095F2'}
                selectedButtonStyle={{backgroundColor: "transparent"}}
                onPressAddImage={this.onPressAddImage}
              />
            </View>

            <TouchableOpacity 
              activeOpacity={.6}
              style={ styles.btnSubmit }
              onPress={ () => this.save() }
            >
              <Text style={ styles.submitText }>Simpan</Text>
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
  rich: {
    height: 150,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF'
  },
  scroll : {
    backgroundColor:'#ffffff'
  },

  formWrapper: {
    marginVertical: 5,
  },
  imgCaret: {
    width: 17.5,
    height: 17.5,
    resizeMode: 'contain',
    marginRight: 2.5
  },
  formTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cbLabel: {
    fontSize: 14,
    color: '#525355',
    paddingLeft: 5,
  },
  lbForm: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4C4B'
  },
  formInput: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DADADA',
    padding: 5,
    marginTop: 3,
  },
  formInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 3,
  },
  txtFormControl: {
    flex: 1,
    padding: 0,
    marginHorizontal: 5,
    fontSize: 14,
    color: '#525355',
  },
  formInputRight: {
    flex: 1,
    paddingRight: 5,
    justifyContent: 'center',
    // height: 30,
  },
  charLeftText: {
    marginTop: 5,
    fontSize: 12,
    color: '#525355',
  },
  charLeftBoldText: {
    fontSize: 12,
    color: '#525355',
    fontWeight: 'bold'
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

  boxImage: {
    height: ((widthScreen-52.5)/4),
    width: ((widthScreen-52.5)/4),
    borderRadius: 5,
    backgroundColor: '#DADADA',
    marginHorizontal: 2.5,
  },
  boxAddImage: {
    height: ((widthScreen-52.5)/4),
    width: ((widthScreen-52.5)/4),
    borderRadius: 5,
    backgroundColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2.5,
  },
  imgBox: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  boxAddText: {
    fontSize: 30,
    color: '#525355',
    fontWeight: 'bold'
  },
  btnRemoveImg: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 20,
    width: 20,
    borderRadius: 20*2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000'
  },
  boxRemoveText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
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



