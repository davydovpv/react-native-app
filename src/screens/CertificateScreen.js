import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import MainHeader from '../components/MainHeader';
import UserProfile from '../components/UserProfile';

class CertificateScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MainHeader
          openSidemenu = {() => { this.props.navigation.navigate("DrawerOpen")}}
        />

        <View style={styles.certificateLFI}>
          <View style={styles.certificateHeader}>
            <Image
              source={require("../../assets/images/cert-border-left.png")}
              style={styles.certBorder}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/images/cert-border-right.png")}
              style={styles.certBorder}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text style={styles.certTitle}>Life Insure{"\n"}Certificate</Text>
          </View>

          <View style={styles.profileWrapper}>
            <UserProfile
                color="black"
                nameWeight="bold"
                photo={require("../../assets/images/profile.png")}
                name="Adam Rosen"
                age="32"
                sex="M"
                location="New York, NY"
                ssn4digit="0910"
            />
          </View>

          <ScrollView>
            <View style={styles.certContent}>
              <Text style={styles.certText}>This certificate guarantees that this wallet and contained LFI tokens belong to Adam Rosen, resident of the State of New York and a Citizen of the United States with Social Security Number ending xx-0910.{"\n"}</Text>
              <Text style={styles.certText}>Upon his death, our Smart Contract will verify records via the US Social Security Administration and other API's. Once validated, the balance of his LFI wallet will multiply and funds will be available to the holder of this certificate.</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.footerNav}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.navRow}
          >
            <Image
              source={require("../../assets/images/icon-email.png")}
              style={styles.iconNav}
              resizeMode="contain"
            />
            <Text style={styles.navItem}>Send via Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E4072',
  },
  certificateLFI: {
    flex: 1,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#ccc',
    backgroundColor: '#F2EDE6',
  },
  certificateHeader: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  certTitle: {
    fontSize: 25,
    marginTop: -30,
    fontFamily: 'Abel'
  },
  certBorder: {
    height: 50,
    width: 50,
    opacity: 0.15,
  },
  profileWrapper: {
    margin: 20,
    borderTopColor: 'rgba(0,0,0,0.25)',
    borderTopWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    borderBottomWidth: 0.5,
  },
  footerNav: {
    paddingBottom: 20,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    fontFamily: 'MontserratSemiBold',
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
  },
  iconNav: {
    height: 16,
    width: 16,
    marginRight: 10,
    opacity: 0.6,
  },
  certContent: {
    flex: 1,
  },
  certText: {

  },
});

export default CertificateScreen;
