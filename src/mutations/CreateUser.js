const CreateUser = `mutation CreateUser(
  $userId:ID!,
  $name:String!,
  $email:String!,
  $phone:String!,
  $address:String,
  $zip:String,
  $country:String,
  $age:Int,
  $sex:String,
  $cognitoId:String,
	) {
  	createUser(input: {
      id: $userId,
      name: $name,
      email: $email,
      phone: $phone,
      address: $address,
      zip: $zip,
      country: $country,
      age: $age,
      sex: $sex,
      cognito_id: $cognitoId,
 	 }) {
    id
    name
  }
}`

export default CreateUser
