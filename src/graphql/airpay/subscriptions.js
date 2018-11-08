import gql from 'graphql-tag'

//  Verification changes
export const VERIFICATION_CHANGES_SUBSCRIBTION = gql`
  subscription($verificationHash: String!) {
    verificationChanges(verificationHash: $verificationHash)
  }
`
