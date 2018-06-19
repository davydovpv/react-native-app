// Extracted from Amazon js for AuthPiece
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Auth } from 'aws-amplify';
import AmplifyMessageMap from './AmplifyMessageMap';

class AuthError extends Component {

    constructor() {
      super();
      this.state = {
        error: '',
      };
    }

    componentDidMount() {
      error(err) {
        let msg = '';
        if (typeof err === 'string') {
            msg = err;
        } else if (err.message) {
            msg = err.message;
        } else {
            msg = JSON.stringify(err);
        }

        const map = this.props.errorMessage || AmplifyMessageMap;
        msg = (typeof map === 'string')? map : map(msg);

        this.setState({
          error: msg
        });

      }
    }

    render() {
      return(
        <View style={{backgroundColor: '#C51162', height: 50}}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            Error: { this.state.error }
          </Text>
        </View>
      );
    }
}

export default AuthError
