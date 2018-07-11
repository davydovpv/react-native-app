import Amplify, { Auth } from 'aws-amplify';
import AmplifyMessageMap from './AmplifyMessageMap';

// Cognito Errors
const AuthError = (err) => {
    if (typeof err === 'string') {
        msg = err;
    } else if (err.message) {
        msg = err.message;
    } else {
        msg = JSON.stringify(err);
    }
    const map = AmplifyMessageMap;
    msg = (typeof map === 'string')? map : map(msg);

    return msg
}

// To Do - Bring all Cognito Functions here!
const SignIn = async (username, password) => {
  Auth.signIn(username, password)
    .then(user => {
      console.log('Logged In!', user)
    })
    .catch(err => {
      let msg = '';
      AuthError(err)
      console.log(msg)
      return msg
    })
}

export { AuthError, SignIn }
