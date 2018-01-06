import gql from 'graphql-tag';

export const coinQuery = gql`
  {
    topTenCoins(limit: 10) {
      success
      data {
        id
        symbol
        name
        price_usd
        percent_change_24h
        image {
          image_url
        }
      }
    }
  }
`;
