import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../components/Header';

configure({ adapter: new Adapter() });

describe('Check Header component', () => {
  test('Header render', () => {
    const data = {
      data: {
        name: 'bitcoin',
        symbol: 'bitcoin',
        price_usd: '10000',
        percent_change_24h: '2'
      }
    };
    const user = {
      username: 'username'
    };
    const wrapper = mount(<Header key="header" data={data} user={user} settings={() => false} />);

    expect(wrapper.length === 1);
  });

  test('Header recive props', () => {
    const data = {
      data: {
        name: 'bitcoin',
        symbol: 'bitcoin',
        price_usd: '10000',
        percent_change_24h: '2'
      }
    };
    const user = {
      username: 'username'
    };
    const wrapper = mount(<Header key="header" data={data} user={user} settings={() => false} />);
    const username = wrapper.find('.username');

    expect(username.text()).toBe(' username');
  });
});
