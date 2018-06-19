export const GetUser = `query GetUser($userId: ID!) {
  getUser(id:$userId) {
    id
    name
    email
    age
    phone
    address
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
  }
}`
