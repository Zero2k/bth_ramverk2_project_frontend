import React from 'react';

import Coins from '../components/Coins';
import SearchCoinModal from '../components/SearchCoinModal';

class Sidebar extends React.Component {
  state = {
    openCoinSearch: false
  };

  toggleSearchCoinModal = () => {
    this.setState(state => ({ openCoinSearch: !state.openCoinSearch }));
  };

  render() {
    const { openCoinSearch } = this.state;
    const { data } = this.props;
    return [
      <Coins
        key="coins-sidebar"
        coins={data.map(coin => ({
          id: coin.id,
          symbol: coin.symbol,
          image: coin.image.image_url
        }))}
        onCoinSeachClick={this.toggleSearchCoinModal}
      />,
      <SearchCoinModal
        key="find-coin-modal"
        onClose={this.toggleSearchCoinModal}
        open={openCoinSearch}
      />
    ];
  }
}

export default Sidebar;
