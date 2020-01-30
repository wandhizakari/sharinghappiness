import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput
} from 'react-native';
import ModalPicker from './ModalPicker';

class FormInput extends Component {
  render() {
    let { label, value, placeholder, maxLength, multiline, secureTextEntry, keyboardType='default' } = this.props
    let newPlaceholder = placeholder || 'Masukan '+label
    return (
      <View style={ styles.formWrapper }>
        <View style={ styles.formTitle }>
          <Text style={ styles.lbForm }>{ label }</Text>
        </View>
        <View style={ styles.formInput }>
          <View style={ multiline ? styles.textareaRight : styles.formInputRight }>
            <TextInput 
              multiline={multiline}
              numberOfLines={ multiline ? 4 : 1 }
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              value={ value }
              style={ styles.txtFormControl }
              placeholder={ newPlaceholder }
              onChangeText={ (val) => {
                if (maxLength) {
                  this.props.onChangeText(val.length > maxLength ? val.slice(0, maxLength) : val)
                } 
                else this.props.onChangeText(val)
              }}
            />
          </View>
        </View>
        {
          maxLength && <Text style={ styles.charLeftText }>Sisa Character: <Text style={ styles.charLeftBoldText }>{value.length}/{maxLength}</Text></Text>
        }
      </View>
    )
  }
}

class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPicker: false
    }
  }

  render() {
    let { label, value, placeholder, data } = this.props
    let findIdx = data.findIndex(e => e.value == value)
    let newPlaceholder = placeholder || 'Pilih '+label
    let valuePicker = value == '' ? newPlaceholder : data[findIdx].label
    return (
      <View style={ styles.formWrapper }>
        <View style={ styles.formTitle }>
          <Text style={ styles.lbForm }>{ label }</Text>
        </View>
        <TouchableOpacity 
          activeOpacity={.6}
          style={ styles.formInput }
          onPress={ () => this.setState({ modalPicker: true }) }
        >
          <View style={[ styles.formInputRight,  ]}>
            <Text style={ styles.formPicker }>{ valuePicker }</Text>
          </View>
          <Image 
            style={ styles.imgCaret } 
            source={ require('../Images/icon-caret-bottom.png') }
            resizeMode='contain' 
          />
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalPicker}
          onRequestClose={() => this.setState({ modalPicker: false }) }
        >
          <ModalPicker
            onRequestClose={() => this.setState({ modalPicker: false }) }
            data={ data }
            value={ value }
            placeholder={ newPlaceholder }
            onValueChange={ (val) => {
              this.props.onValueChange(val)
              this.setState({ modalPicker: false })
            }}
          />
        </Modal>
      </View>
    )
  }
}

class FormDate extends Component {
  render() {
    let { label, value, placeholder, data } = this.props
    let newPlaceholder = placeholder || 'Pilih '+label
    return (
      <View style={ styles.formWrapper }>
        <View style={ styles.formTitle }>
          <Text style={ styles.lbForm }>{ label }</Text>
        </View>
        <TouchableOpacity 
          activeOpacity={.6}
          style={ styles.formInput }
          onPress={ () => this.props.openDTP() }
        >
          <View style={ styles.formInputRight }>
            <Text style={[ styles.cbLabel, {color: value ? '#525355' : '#C7C7CC' } ]}>{ value || newPlaceholder }</Text>
          </View>
          <Image 
            style={ styles.imgCaret } 
            source={ require('../Images/icon-caret-bottom.png') }
          />
        </TouchableOpacity>
      </View>
    )
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
    height: 30,
  },
  textareaRight: {
    flex: 1,
    paddingRight: 5,
    justifyContent: 'center',
    height: 80,
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

  formPicker: {
    color: '#525355',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 5,
    marginTop: 3,
  },
});


export { FormInput, FormPicker, FormDate }