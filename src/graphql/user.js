import gql from 'graphql-tag';

export const userQuery = gql`
  {
    me {
      _id
      username
      avatar
      about
    }
  }
`;
