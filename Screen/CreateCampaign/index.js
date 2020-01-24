import React, { Component } from 'react'
import {
  Platform, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native';
import StepIndicator from 'react-native-step-indicator'
import { TabView } from 'react-native-tab-view';
import InformationScreen from './informationScreen'
import DescriptionScreen from './descriptionScreen'
import RewardScreen from './rewardScreen'

const stepIndicator = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#FF7E50',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#FF7E50',
  stepStrokeUnFinishedColor: '#FFBAA3',
  separatorFinishedColor: '#FF7E50',
  separatorUnFinishedColor: '#FFBAA3',
  stepIndicatorFinishedColor: '#FF7E50',
  stepIndicatorUnFinishedColor: '#FFBAA3',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#FF7E50',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,.5)',
  labelColor: '#000',
  labelSize: 12,
  currentStepLabelColor: '#FF7E50'
}

type Props = {};
export default class CreateCampaignScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      stepLabel: [ 'Informasi Campaign', 'Deskripsi Campaign' ],
      stepCount: 2,
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        // { key: 'third', title: 'Third' },
      ],
    }
  }


  changeTab = (index) => {
    this.setState({ index })
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <InformationScreen changeTab={ (index) => this.setState({ index }) } />;
      case 'second':
        return <DescriptionScreen changeTab={ (index) => this.setState({ index }) } />;
      case 'third':
        return <View />;
        return <RewardScreen changeTab={ (index) => this.setState({ index }) } />;
      default:
        return null;
    }
  };

  render() {
    let { stepCount, index, routes, stepLabel } = this.state
    const initialLayout = { width: Dimensions.get('window').width }
    return (
      <View style={ styles.container }>
        <View style={ styles.stepperBox }>
          <StepIndicator
            renderStepIndicator={() => <View /> }
            customStyles={stepIndicator}
            currentPosition={index}
            labels={stepLabel}
            stepCount={stepCount}
          />
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderTabBar={ () => null }
          renderScene={ this.renderScene }
          onIndexChange={ (index) => this.setState({ index }) }
          initialLayout={initialLayout}
          swipeEnabled={false}
        />

        <TouchableOpacity
          activeOpacity={.6}
          style={ styles.btnHelp }
        >
          <Image 
            style={ styles.imgHelp } 
            source={ require('../../Images/icon-help-mark.png') }
            resizeMode='contain' 
          />
        </TouchableOpacity>
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



