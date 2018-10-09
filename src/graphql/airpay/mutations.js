import gql from 'graphql-tag'

//  By token
export const BY_TOKENS_MUTATION = gql`
  mutation($email: String!) {
    enter(email: $email)    
  }`

//  Get widget settings
export const SETTINGS_MUTATION = gql`
  query {
    initCrowdsale {
      name
      logo
      rate
      bonus
      color
    }
  }`

// Perform buying
export const PERFORM_BUYING_MUTATION = gql`
  mutation($hash: String!, $code: Int!, $amount: Float!, $currency: String!) {
    buyTokens(hash: $hash, code: $code, amount: $amount, currency: $currency)
    {
      authorization
      address
      amount
      currency
    }
  }`

export const WITHDRAW_TOKENS_MUTATION = gql`
  mutation($address: String!) {
    withdrawTokens(address: $address)
  }`

export const UPLOAD_DOC_MUTATION = gql`
  mutation($selfie: Upload!, $front: Upload!) {
    uploadDoc(selfie: $selfie, front: $front)
  }`
