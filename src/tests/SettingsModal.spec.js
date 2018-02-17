import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SettingsModal from '../components/SettingsModal';

configure({ adapter: new Adapter() });

describe('Check SettingsModal component', () => {
  test('SettingsModal render', () => {
    const user = {
      username: 'username',
      avatar: 'avatar',
      about: 'about'
    };
    const wrapper = mount(<SettingsModal
      key="settings-modal"
      user={user}
      onClose={() => true}
      open={false}
    />);

    expect(wrapper.length === 1);
  });
});
