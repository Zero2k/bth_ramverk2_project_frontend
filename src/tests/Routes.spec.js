import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Index from '../routes/index';
import Home from '../routes/Home';
import About from '../routes/About';
import Login from '../routes/Login';
import Signup from '../routes/Signup';

configure({ adapter: new Adapter() });

describe('Routes exists', () => {
  test('The route Index renders', () => {
    shallow(<Index />);
  });

  test('The route Home renders', () => {
    shallow(<Home />);
  });

  test('The route About renders', () => {
    shallow(<About />);
  });

  test('The route Login renders', () => {
    shallow(<Login />);
  });

  test('The route Signup renders', () => {
    shallow(<Signup />);
  });
});
