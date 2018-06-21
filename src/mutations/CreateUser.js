export const CreateUser = `mutation CreateUser(
    $userId:ID!,
    $name:String!,
    $email:String!,
    $phone:String!,
    $country:String,
    $cognitoId:String,
	) {
  	createUser(input: {
      id: $userId,
      name: $name,
      email: $email,
      phone: $phone,
      country: $country,
      cognito_id: $cognitoId,
      has_verified_id: false
 	 }) {
    id
    name
  }
}`
