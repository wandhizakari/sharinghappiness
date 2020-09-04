import React, { Component } from 'react';
import {Image} from 'react-native'
import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';

import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ForgotScreen from './Screen/ForgotScreen';
import HomeScreen from './Screen/HomeScreen';
import CustomNavBar from './Components/Navbar';
import ProductScreen from './Screen/Product';
import MoreScreen from './Screen/MoreScreen';
import ZakatScreen from './Screen/ZakatScreen';
import DonasiScreen from './Screen/DonasiScreen';
import DonasiDoneScreen from './Screen/DonasiDoneScreen';
import PartnerScreen from './Screen/PartnerScreen';
import SearchScreen from './Screen/SearchScreen';
import NotifScreen from './Screen/NotifScreen';
import AuthScreen from './Screen/AuthScreen';
import Profile from './Screen/ProfileScreen'
import DetailScreen from './Screen/DetailScreen';
import ProfileUser from './Screen/ProfileUserScreen';
import ProfileSetting from './Screen/ProfileSetting';
import TambahAlamat from './Screen/ProfileSetting/TambahAlamat';
import AllScreen from './Screen/AllScreen';
import AllProgramScreen from './Screen/AllProgramScreen';
import KalkulatorZakatScreen from './Screen/kalkulatorZakat';
import CreateCampaignScreen from './Screen/CreateCampaign';
import MyCampaignScreen from './Screen/MyCampaign';
import WishlistScreen from './Screen/Wishlist';
import FaqScreen from './Screen/Faq';
import TransactionScreen from './Screen/Transaction';
import Test from './Screen/Test';
import FounderScreen from './Screen/FounderScreen';
import { GoogleSignin } from '@react-native-community/google-signin';
const SimpleLineIcon= ({ title, focused }) => {
  let image;

  

  return ( <Image style={{ width: 20, height: 20 }} source={require('./Images/home.png')} /> );

}
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '816111242740-7j9c0braeqdkvn6bpdfcbu4n61kliliv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
});
const SimpleLineIcon1= ({ title, focused }) => {
  let image;

  

  return ( <Image style={{ width: 20, height: 20 }} source={require('./Images/care.png')} /> );

}

const SimpleLineIcon2= ({ title, focused }) => {
  let image;

  

  return ( <Image style={{ width: 20, height: 20 }} source={require('./Images/handshake.png')} /> );

}

const SimpleLineIcon3= ({ title, focused }) => {
  let image;

  

  return ( <Image style={{ width: 20, height: 20 }} source={require('./Images/notification.png')} /> );

}

const SimpleLineIcon4= ({ title, focused }) => {
  let image;

  

  return ( <Image style={{ width: 20, height: 20 }} source={require('./Images/user.png')} /> );

}
const App = () => {
  return (
    <Router>
          <Scene key='root'>

            {/* Authentications */}
            <Scene initial key='Login' component={LoginScreen} title='Login' />
            <Scene key='SignUp' component={RegisterScreen} title='SignUp' />
            <Scene key='More' component={MoreScreen} navBar={CustomNavBar} title='More' />
            <Scene key='Zakat' component={ZakatScreen} title='More' />
            <Scene key='Search' component={SearchScreen} title='More' />
            <Scene key='Detail' component={DetailScreen} navBar={CustomNavBar} title='Detail' />
            <Scene key='forgot' component={ForgotScreen} title='Detail' />
            <Scene key='register' component={RegisterScreen} title='Detail' />
            <Scene key='donasi' component={DonasiScreen} navBar={CustomNavBar} title='Detail'/>
            <Scene key='wishlist' component={WishlistScreen} navBar={CustomNavBar} title='Detail'/>
            <Scene key='faq' component={FaqScreen} navBar={CustomNavBar} title='Detail'/>
            <Scene key='transaction' component={TransactionScreen} navBar={CustomNavBar} title='Detail'/>
            <Scene key='all' component={AllScreen} navBar={CustomNavBar} title='Detail'/>

            <Scene key='profileUser' component={ProfileUser} navBar={CustomNavBar} title='Detail'/>
            <Scene key='profileSetting' component={ProfileSetting} navBar={CustomNavBar} title='Pengaturan'/>
            <Scene key='tambahAlamat' component={TambahAlamat} navBar={CustomNavBar} title='Tambah Alamat'/>
            <Scene key='donasiDone' component={DonasiDoneScreen} navBar={CustomNavBar} title='Payment'/>
            <Scene key='founder' component={FounderScreen} navBar={CustomNavBar} title='Payment'/>
            <Scene key='allprogram' component={AllProgramScreen} navBar={CustomNavBar} title='Payment'/>
            <Scene key='kalkulator' component={KalkulatorZakatScreen} navBar={CustomNavBar} title='Payment'/>
            <Scene key='createCampaign' component={CreateCampaignScreen} navBar={CustomNavBar} title='Create Campaign'/>
            <Scene key='myCampaign' component={MyCampaignScreen} navBar={CustomNavBar} title='Create Campaign'/>

            {/* Main */}

            {/* Tabs... */}
            <Scene key='tabbar' tabs={true}  hideNavBar={1} >
              <Scene icon={SimpleLineIcon} key='home' component={HomeScreen} navBar={CustomNavBar} title="Home" back={false} />
              <Scene icon={SimpleLineIcon1} key='product' component={ProductScreen} navBar={CustomNavBar} title="Program" back={true} />

              <Scene icon={SimpleLineIcon2} key='partner' component={PartnerScreen}  navBar={CustomNavBar}title='Partner' />
              <Scene icon={SimpleLineIcon4} key='Profile' component={Profile}  navBar={CustomNavBar} title='Profile' />
            </Scene>

            </Scene>

    </Router>
  );
}

export default App;
{/* <Scene icon={SimpleLineIcon3} key='Notif' component={NotifScreen}  navBar={CustomNavBar} title='Notif' /> */}

{/* <Scene icon={SimpleLineIcon1} key='tab2' component={ProductScreen}  navBar={CustomNavBar} title='Product' /> */}
