export const CreateUserNew = `mutation CreateUserNew(
    $userId:ID!,
    $email:String!,
    $phone:String!,
    $country:String,
    $cognitoId:String
	) {
  	createUser(input: {
      id: $userId,
      email: $email,
      phone: $phone,
      country: $country,
      cognito_id: $cognitoId
 	 }) {
    id
    phone
  }
}`
