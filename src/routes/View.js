import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';

import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';

import { coinQuery } from '../graphql/coins';

const View = ({
  coinQuery: { loading, topTenCoins },
  singleCoinQuery: { coinByName },
  match: { params: { coinName } }
}) => {
  if (loading || !topTenCoins) {
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  const { data: tenCoins } = topTenCoins;
  const { data: coinData, success } = coinByName;

  const coinId = coinName ? findIndex(tenCoins, ['id', coinName]) : 0;
  const currentCoin = coinId === -1 ? tenCoins[0] : tenCoins[coinId];

  return (
    <AppLayout>
      <Sidebar data={tenCoins} />
      <Header data={success ? coinData : currentCoin} />
      <Messages />
      <SendMessage data={success ? coinData : currentCoin} />
    </AppLayout>
  );
};

const singleCoinQuery = gql`
  query($name: String!) {
    coinByName(name: $name) {
      success
      data {
        id
        name
        symbol
        price_usd
        percent_change_24h
      }
    }
  }
`;

export default compose(
  graphql(coinQuery, { name: 'coinQuery', options: { fetchPolicy: 'cache-and-network' } }),
  graphql(singleCoinQuery, {
    name: 'singleCoinQuery',
    options: props => ({
      variables: {
        name: props.match.params.coinName
      }
    })
  })
)(View);
