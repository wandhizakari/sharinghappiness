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
import RNPickerSelect from 'react-native-picker-select';

class FormInput extends Component {
  render() {
    let { label, value, placeholder, maxLength } = this.props
    let newPlaceholder = placeholder || 'Pilih '+label
    return (
      <View style={ styles.formWrapper }>
        <View style={ styles.formTitle }>
          <Text style={ styles.lbForm }>{ label }</Text>
        </View>
        <View style={ styles.formInput }>
          <View style={ styles.formInputRight }>
            <TextInput 
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
  render() {
    let { label, value, placeholder, data } = this.props
    const newPlaceholder = {
      label: 'Pilih '+(placeholder || label),
      value: null,
    }
    return (
      <View style={ styles.formWrapper }>
        <View style={ styles.formTitle }>
          <Text style={ styles.lbForm }>{ label }</Text>
        </View>
        <View style={ styles.formInput }>
          <View style={[ styles.formInputRight,  ]}>
            <RNPickerSelect
              style={{ inputIOS: {...styles.cbLabel}, inputAndroid: {...styles.cbLabel} }}
              hideDoneBar={false}
              placeholder={newPlaceholder}
              value={ value }
              onValueChange={(value) => this.props.onValueChange(value) }
              items={ data }
            />
          </View>
          <Image 
            style={ styles.imgCaret } 
            source={ require('../Images/icon-caret-bottom.png') }
            resizeMode='contain' 
          />
        </View>
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
            <Text style={[ styles.cbLabel, {color: value ? '#000' : '#C7C7CC' } ]}>{ value || newPlaceholder }</Text>
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
});


export { FormInput, FormPicker, FormDate }