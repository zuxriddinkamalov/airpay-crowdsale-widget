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
      organization {
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
      isWhitelisted
    }
  }
`

// Perform buying
export const PERFORM_BUYING_MUTATION = gql`
  mutation(
    $amount: Float!
    $asset: String!
    $withdrawAddress: String!
    $crowdsale: ID!
  ) {
    buyTokens(
      amount: $amount
      asset: $asset
      withdrawAddress: $withdrawAddress
      crowdsale: $crowdsale
    ) {
      address
      txHash
    }
  }
`

export const WITHDRAW_TOKENS_MUTATION = gql`
  mutation($address: String!) {
    withdrawTokens(address: $address)
  }
`

export const UPLOAD_DOC_MUTATION = gql`
  mutation uploadDocs(
    $selfie: Upload,
    $front: Upload,
    $docType: String!,
    $input: uploadInput!,
    $usaDocOne: Upload,
    $usaDocTwo: Upload
  ) {
    uploadDocs(
      selfie: $selfie,
      front: $front,
      docType: $docType,
      input: $input,
      usaDocOne: $usaDocOne,
      usaDocTwo: $usaDocTwo
    )
  }
`
// ONLY FOR TESTING
export const TEST_SET_VERIFY_STATUS = gql`
  mutation setVerifyStatus($verifiedHash: String!, $status: String!) {
    setVerifyStatus(verifiedHash: $verifiedHash, status: $status)
  }
`

// ONLY FOR TESTING
export const TEST_TXT_STATUS_CHANGE = gql`
  mutation notifyTxStatusChange($txHash: String!) {
    notifyTxStatusChange(txHash: $txHash)
  }
`
