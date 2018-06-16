//To Do: Move Auth Logic Here

import { Auth } from 'aws-amplify';


export const SignIn = (username, password) => {

  Auth.signIn(username, password)
  .then(user => {
    console.log('logged in!', user)
    return "success"
  })
  .catch(err => {
    console.log('error sign in: ', err)
  })

}

export const SignUp = (username, password, email, phone_number) => {

    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        phone_number: phone_number
      }
    })

    .then(res => {
      this.setState({
        verifyNewAccount: true
      })
      console.log('signed up!', res)
    })

    .catch(err => {
      console.log('error: ', err)
    })

}
