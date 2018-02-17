import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeaderContainer from '../containers/HeaderContainer';
import Sidebar from '../containers/Sidebar';
import PublicNavbar from '../containers/PublicNavbar';

configure({ adapter: new Adapter() });

describe('Containers exists', () => {
  test('The container HeaderContainer renders', () => {
    shallow(<HeaderContainer />);
  });

  test('The container Sidebar renders', () => {
    const coins = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        image: 'bitcoin'
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        image: 'ethereum'
      }
    ];
    shallow(<Sidebar data={coins} />);
  });

  test('The container PublicNavbar renders', () => {
    shallow(<PublicNavbar />);
  });
});
