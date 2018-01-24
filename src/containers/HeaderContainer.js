import React from 'react';

import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';

export class HeaderContainer extends React.Component {
  state = {
    openSettings: false
  };

  toggleSettingsModal = () => {
    this.setState(state => ({ openSettings: !state.openSettings }));
  };

  render() {
    const { openSettings } = this.state;
    const { data, user } = this.props;
    return [
      <Header key="header" data={data} user={user} settings={this.toggleSettingsModal} />,
      <SettingsModal
        key="settings-modal"
        user={user}
        onClose={this.toggleSettingsModal}
        open={openSettings}
      />
    ];
  }
}

export default HeaderContainer;
