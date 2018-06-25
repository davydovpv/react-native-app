import Amplify, { Auth } from 'aws-amplify';
import AmplifyMessageMap from './AmplifyMessageMap';

export const AuthError = (err) => {
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

export const SignIn = async (username, password) => {
  Auth.signIn(username, password)
  .then(user => {
    console.log('trying to login')
    console.log('Logged In!', user)
    return user
  })
  .catch(err => {
    AuthError(err)
    console.log('failing to login', msg)
    return msg
  })
}

export const VerifySignIn = async (user, authCode) => {
  Auth.confirmSignIn(user, authCode)
    .then(user => {
      console.log('verified user:', user)
      //To Do: Fix this later by persisting via auth token
      let signInID = user.signInUserSession.accessToken.payload.sub
      data.id = signInID
      this.verifiedLoginHandler(signInID)
    })
    .catch(err => {
      AuthError(err)
      return msg
    })
}
