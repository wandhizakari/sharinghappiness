import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { SafeAreaView } from 'react-navigation'

import styles from './style';

export default class ModalPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: this.props.data,
      search: ''
    }
  }

  async search(val) {
    await this.setState({ search: val })
    let { search } = this.state
    let { data } = this.props
    let regexp = new RegExp(search.toLowerCase(), 'g')
    let newData = data.filter( e => e.label.toLowerCase().match(regexp))
    this.setState({ data: newData })
  }

  renderItem(item, index) {
    let bgSelected = this.props.value == item.value ? '#FFBAA3' : '#fff'
    let textSelected = this.props.value == item.value ? '#fff' : '#FF7E50'
    return(
      <TouchableOpacity 
        activeOpacity={.6}
        style={[ styles.itemWrapper, {backgroundColor: bgSelected} ]}
        onPress={ () => this.props.onValueChange(item) }
      >
        <Text style={[ styles.itemText, {color: textSelected} ]}>{item.label.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  renderEmpty() {
    return(
      <View style={ styles.blankPage }>
        <Text style={ styles.emptyText }>No Data Available</Text>
      </View>
    )
  }

  render() {
    let { data } = this.state
    let { placeholder } = this.props

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={ styles.container }>
          <View style={ styles.headerModal }>
            <TouchableOpacity
              activeOpacity={.6}
              style={ styles.headerCorner }
              onPress={() => this.props.onRequestClose()}
            >
              <Image 
                source={ require('../../Images/icon-chevron-left.png') }
                style={ styles.imgCorner }
              />
            </TouchableOpacity>
            <View style={ styles.headerMain }>
              <Text style={ styles.headerText }>{ placeholder }</Text>
            </View>
            <View style={ styles.headerCorner } />
          </View>
          <FlatList
            style={{ marginTop: 5, backgroundColor: '#fff' }}
            renderItem={ ({ item, index }) => this.renderItem(item, index) }
            ItemSeparatorComponent={ () => <View style={ styles.dividerItem } /> }
            data={ data }
            extraData={ data }
            keyExtractor={ (item, index) => 'key'+index }
            ListEmptyComponent={ this.renderEmpty() }
          />

        </View>
      </SafeAreaView>
    );
  }
}
ModalPicker.defaultProps = {
  style: {},
  src: '',
  title: '-',
  desc: '-',
  date: '00-00-000',
  position: 'left'
}