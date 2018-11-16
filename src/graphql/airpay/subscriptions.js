import gql from 'graphql-tag'

//  Verification changes
export const VERIFICATION_CHANGES_SUBSCRIPTION = gql`
  subscription ($verifiedHash: String!) {
    requestStatusChanges(verifiedHash: $verifiedHash)
  }
`

//  Verification changes
export const TX_CHANGES_SUBSCRIPTION = gql`
  subscription ($txHash: String!) {
    txChange(txHash: $txHash) {
      status
    }
  }
`
