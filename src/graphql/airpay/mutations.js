import gql from 'graphql-tag'

//  Enter
export const ENTER_MUTATION = gql`
  mutation($email: String!, $whitelist: ID!) {
    userEnter(email: $email, whitelist: $whitelist)
  }
`

//  Get widget settings
export const SETTINGS_MUTATION = gql`
  query($crowdsale: ID!) {
    getCrowdsale(crowdsale: $crowdsale){
      name
      hardcap
      whitelist
      asset {
        symbol
        name
      }
      business {
        id
        logo
        name
      }
      agreement
      assetAccept {
        asset {
          symbol
        }
        minAmount
        rate
      }
      whitelist
      endDate
      startDate
    }
  }
`

// Authorization
export const AUTHORIZATION_MUTATION = gql`
  mutation($hash: String!, $code: Int!) {
    userAuth(hash: $hash, code: $code) {
      authorization
       user {
         email
       }
       isWhitelisted
    }
  }
`

// Perform buying
export const PERFORM_BUYING_MUTATION = gql`
  mutation(
    $amount: Float!
    $currency: String!
    $withdrawAddress: String!
    $crowdsale: ID!
  ) {
    buyTokens(
      amount: $amount
      currency: $currency
      withdrawAddress: $withdrawAddress
      crowdsale: $crowdsale
    ) {
      address
      amount
      currency
    }
  }
`

export const WITHDRAW_TOKENS_MUTATION = gql`
  mutation($address: String!) {
    withdrawTokens(address: $address)
  }
`

export const UPLOAD_DOC_MUTATION = gql`
  mutation($selfie: Upload!, $front: Upload!, $docType: String!) {
    uploadDocs(selfie: $selfie, front: $front, docType: $docType)
  }
`
