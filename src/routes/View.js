import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import AppLayout from '../components/AppLayout';
import Coins from '../components/Coins';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';

import { coinQuery } from '../graphql/coins';

const View = ({ data: { loading, topTenCoins }, match: { params: { coinName } } }) => {
  if (loading || !topTenCoins) {
    return (
      <Segment style={{ height: '100vh' }}>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }

  const { data } = topTenCoins;

  const coinId = coinName ? findIndex(data, ['id', coinName]) : 0;
  const currentCoin = coinId === -1 ? data[0] : data[coinId];

  return (
    <AppLayout>
      <Coins coins={data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol,
        image: coin.image.image_url
        }))}
      />
      <Header data={currentCoin} />
      <Messages />
      <SendMessage />
    </AppLayout>
  );
};

export default compose(
  graphql(coinQuery, { options: { fetchPolicy: 'network-only' } })
)(View);
