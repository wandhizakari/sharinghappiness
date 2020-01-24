import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormInput } from '../../Components/Form';

const widthScreen = Dimensions.get('window').width
const initHTML = `<br/>
<center><b>Pell.js Rich Editor</b></center>
<center>React Native</center>
<br/>
</br></br>
`;

type Props = {};
export default class DescriptionScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
      receiver: '',
      imageData: [],

      isDTPVisible: false,
      role: '',
    }
  }

  componentDidMount() {

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

  save = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml();
    console.log({html});
  };

  onPressAddImage = ()=> {
    // insert URL
    this.richText.insertImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png");
    this.richText.blurContentEditor();
  };

  render() {
    let { target, receiver, imageData } = this.state
    console.log({imageData})
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={ styles.container } keyboardShouldPersistTaps='handled'>
          <View style={ styles.content }>
            <FormInput
              label='Receiver'
              keyboardType='numeric'
              value={receiver}
              onChangeText={ (receiver) => this.setState({ receiver }) }
            />
            <FormInput
              label='Target'
              keyboardType='numeric'
              value={target}
              onChangeText={ (target) => this.setState({ target }) }
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
                <Text style={ styles.lbForm }>Deskripsi</Text>
              </View>
              <View style={ styles.formInput }>
                <View style={ styles.formInputRight }>
                  <RichEditor
                    ref={ rf => this.richText = rf }
                    initialContentHTML={initHTML}
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

});



