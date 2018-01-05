import React from 'react';

import AppLayout from '../components/AppLayout';
import Coins from '../components/Coins';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';

import SelectCoin from '../components/SelectCoin';

const View = ({ match: { params: { coinName } } }) => {
  if (!coinName) {
    return <SelectCoin />;
  }
  return (
    <AppLayout>
      <Coins />
      <Header />
      <Messages />
      <SendMessage />
    </AppLayout>
  );
};

export default View;
