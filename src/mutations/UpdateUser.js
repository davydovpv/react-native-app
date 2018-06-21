export const UpdateUserRegister = `mutation UpdateUserRegister(
  	$userId:ID!,
    $name:String!,
    $address:String!,
    $city:String!,
    $state:String!,
    $country:String,
    $sex:String,
	) {
  	updateUser(input: {
      id: $userId,
      name: $name,
      address: $address,
      city: $city,
      state: $state,
      country: $country,
      sex: $sex,
 	 }) {
    id
  }
}`

export const UpdateUserVerifiedID = `mutation UpdateUserVerifiedID(
  	$userId:ID!,
    $has_verified_id:Boolean,
	) {
  	updateUser(input: {
      id: $userId,
      has_verified_id: $has_verified_id,
 	 }) {
    id
  }
}`


export const UpdateUserBalance = `mutation UpdateUserBalance(
  	$userId:ID!,
    $lfi_balance:Int,
	) {
  	updateUser(input: {
      id: $userId,
      lfi_balance: $lfi_balance,
 	 }) {
    id
  }
}`
