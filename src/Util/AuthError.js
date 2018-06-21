// Extracted from Amazon js for AuthPiece
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Auth } from 'aws-amplify';
import AmplifyMessageMap from './AmplifyMessageMap';

export default class AuthError extends Component {

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

        msg = data.error;

        this.setState({
          error: msg
        });

    }


}
