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
import ImagePicker from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import { FormPicker, FormInput } from '../../Components/Form';

type Props = {};
export default class EditProfileScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',

      name: '',
      phone: '',
      bio: '',
      picture: '',

      password: '',
      newPassword: '',
      newPasswordConfirm: '',

      loading: false
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    await this.setState({ token, email })
    this.getDataProfile()
  }

  pickImage = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log({response})
        let picture = {
          ...response,
          fileName: response.uri.split('/').pop()
        }
        this.setState({ picture })
      }
    });
  }

  getDataProfile = async () => {
    let { token, email } = this.state
    fetch(`http://devel.sharinghappiness.org/api/v1/user/profile?token=${token}&token_email=${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((respJson) => {
      this.setState({ loading: false })
      console.log('getDataProfile', respJson)
      if (respJson.status == 20) {
        let data = respJson.result
        this.setState({ name: data.name, phone: data.phone_number })
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

  updateDataProfile = async () => {
    this.setState({ loading: true })
    let { token, email, name, phone, password, newPassword, newPasswordConfirm } = this.state
    let params = {
      token,
      token_email: email,
      name,
      phone_number: phone,
      bio: '',
      picture: '',
    }
    fetch(`http://devel.sharinghappiness.org/api/v1/user/profile`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((response) => response.json())
    .then((respJson) => {
      console.log('updateDataProfile', respJson, params)
      this.setState({ loading: false })
      if (respJson.status == 20) {
        if (password != '' && newPassword != '' && newPasswordConfirm != '') { // if you change the password too
          this.changePassword()
        } else {
          Snackbar.show({
            text: 'Data Profile has been changed',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#4BB543'
          });
          this.getDataProfile()
        }
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
  changePassword = async () => {
    let { token, email, password, newPassword, newPasswordConfirm } = this.state
    let params = {
      token,
      token_email: email,
      current_password: password,
      password: newPassword,
      confirm_password: newPasswordConfirm
    }
    fetch(`http://devel.sharinghappiness.org/api/v1/user/password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((response) => response.json())
    .then((respJson) => {
      this.setState({ loading: false })
      if (respJson.status == 20) {
        Snackbar.show({
          text: respJson.message || 'Data Profile has been changed',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#4BB543'
        });
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
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={ styles.container } keyboardShouldPersistTaps='handled'>
          <View style={ styles.titleWrapper }>
            <Text style={ styles.titleText }>1. Biodata</Text>
          </View>
          <View style={ styles.form }>
            <FormInput
              label='Nama Lengkap'
              value={ this.state.name }
              onChangeText={ (name) => this.setState({ name }) }
            />

            <View style={ styles.formWrapper }>
              <View style={ styles.formTitle }>
                <Text style={ styles.lbForm }>Profile Picture</Text>
              </View>
              <View style={ styles.formInput }>
                <View style={ styles.formInputRight }>
                  <TextInput 
                    editable={false}
                    placeholder='Select Picture'
                    value={ this.state.picture.fileName }
                    onChangeText={ (picture) => this.setState({ picture }) }
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={.6}
                  style={ styles.btnAction }
                  onPress={ this.pickImage }
                >
                  <Text style={ styles.actionText }>Select File</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FormInput
              label='Nomor Telepon'
              value={ this.state.phone }
              keyboardType='numeric'
              onChangeText={ (phone) => this.setState({ phone }) }
            />
            <FormInput
              multiline
              label='Bio Singkat'
              value={ this.state.bio }
              keyboardType='numeric'
              onChangeText={ (bio) => this.setState({ bio }) }
            />
          </View>

          <View style={ styles.titleWrapper }>
            <Text style={ styles.titleText }>2. Password</Text>
          </View>
          <View style={ styles.form }>
            <FormInput
              label='Password Saat Ini'
              value={this.state.password}
              onChangeText={ (password) => this.setState({ password }) }
              secureTextEntry
            />
            <FormInput
              label='Password Baru'
              value={this.state.newPassword}
              onChangeText={ (newPassword) => this.setState({ newPassword }) }
              secureTextEntry
            />
            <FormInput
              label='Konfirmasi Password'
              value={this.state.newPasswordConfirm}
              onChangeText={ (newPasswordConfirm) => this.setState({ newPasswordConfirm }) }
              secureTextEntry
            />

            <TouchableOpacity 
              activeOpacity={.6}
              style={ styles.btnSubmit }
              onPress={ () => this.updateDataProfile() }
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
      </View>
    );
  }
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
  form: {
    paddingVertical: 10,
  },
  btnSubmit: {
    alignSelf: 'flex-start',
    paddingHorizontal: 27.5,
    paddingVertical: 12.5,
    backgroundColor: '#44ACF5',
    borderRadius: 5,
    marginVertical: 20,
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

  formWrapper: {
    marginVertical: 5,
  },
  formTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lbForm: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4C4B'
  },
  formInput: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DADADA',
    padding: 5,
    marginTop: 3,
  },
  formInputRight: {
    flex: 1,
    paddingRight: 5,
    justifyContent: 'center',
    height: 30,
  },
  btnAction: {
    backgroundColor: 'pink',
    paddingHorizontal: 10,
    height: 30,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#FF7E50'
  },
  actionText: {
    fontSize: 14,
    color: '#fff'
  }
});