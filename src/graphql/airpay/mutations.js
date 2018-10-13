import gql from 'graphql-tag';

//  Enter
export const ENTER_MUTATION = gql`
  mutation($email: String!) {
    enter(email: $email)
  }
`;

//  Get widget settings
export const SETTINGS_MUTATION = gql`
  query($id: String!) {
    initCrowdsale(id: $id) {
      logo
      name
      rateBTC
      rateETH
      bonus
      agreement
      mode
      symbol
    }
  }
`;

// Authorization
export const AUTHORIZATION_MUTATION = gql`
  mutation($hash: String!, $code: Int!) {
    auth(hash: $hash, code: $code) {
      authorization
      isVerified
    }
  }
`;

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
`;

export const WITHDRAW_TOKENS_MUTATION = gql`
  mutation($address: String!) {
    withdrawTokens(address: $address)
  }
`;

export const UPLOAD_DOC_MUTATION = gql`
  mutation($selfie: Upload!, $front: Upload!, $docType: String!) {
    uploadDocs(selfie: $selfie, front: $front, docType: $docType)
  }
`;
