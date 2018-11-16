import gql from 'graphql-tag'

//  Verification changes
export const VERIFICATION_CHANGES_SUBSCRIBTION = gql`
  subscription ($verifiedHash: String!) {
    requestStatusChanges(verifiedHash: $verifiedHash)
  }
`
