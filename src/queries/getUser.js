export const GetUser = `query GetUser($userId: ID!) {
  getUser(id:$userId) {
    id
    name
    email
    phone
    address
    city
    state
    zip
    country
    age
    sex
  }
}`

export const GetUserWelcome = `query GetUserWelcome($userId: ID!) {
  getUser(id:$userId) {
    name
    country
    has_verified_id
    has_wallet_setup
  }
}`

export const GetUserIDVerified = `query GetUserIDVerified($userId: ID!) {
  getUser(id:$userId) {
    id
    has_verified_id
  }
}`
