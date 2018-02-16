import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SendMessage from '../components/SendMessage';

configure({ adapter: new Adapter() });

describe('Check SendMessage component', () => {
  test('SendMessage render', () => {
    const data = {
      data: {
        id: 'bitcoin',
        name: 'Bitcoin'
      }
    };
    const coin = 'bitcoin';

    const wrapper = mount(<SendMessage data={data} coin={coin} />);

    expect(wrapper.length === 1);
  });

  test('SendMessage recive props', () => {
    const data = {
      id: 'bitcoin',
      name: 'Bitcoin'
    };

    const wrapper = mount(<SendMessage data={data} />);
    const input = wrapper.find('input').instance().placeholder;

    expect(input).toBe('Talk about #Bitcoin');
  });

  test('SendMessage change text', () => {
    const data = {
      id: 'bitcoin',
      name: 'Bitcoin'
    };

    const wrapper = mount(<SendMessage data={data} />);
    const input = wrapper.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { name: 'message', value: 'Hello' } });
    input.simulate('keyDown', {
      which: 27,
      target: {
        blur() {
          input.simulate('blur');
        }
      }
    });

    const result = input.instance().value;
    expect(result).toBe('Hello');
  });
});
