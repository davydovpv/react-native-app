const GetUser = `query getUser($userId: ID!) {
  getUser(id:$userId) {
    id
    name
    age
    sex
    country
  }
}`;

export default GetUser
