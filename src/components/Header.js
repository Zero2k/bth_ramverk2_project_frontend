import React from 'react';
import styled from 'styled-components';
import { Input, Icon, Image, Dropdown } from 'semantic-ui-react';

const Root = styled.div`
  grid-column: 3;
  grid-row: 1;
  border-bottom: 1px solid #d4d4d5;
  padding: 10px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: minmax(200px, 1fr) 150px 240px 160px;
  background-color: #fff;
  color: #444;
`;

const Box = styled.div`
  color: #444;
  align-self: ${props => props.align};
  justify-items: stretch;
`;

const CompanyName = styled.div`
  font-size: 20px;
  font-weight: 600;
  align-self: ${props => props.align};
  justify-items: stretch;
`;

const SubHeader = styled.div`
  padding-top: 5px;
  align-self: ${props => props.align};
`;

const trigger = (
  <span>
    <Image avatar src="https://react.semantic-ui.com/assets/images/avatar/small/molly.png" />
    <span> Stevie Feliciano</span>
  </span>
);

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  {
    key: 'sign-out',
    text: 'Sign Out',
    icon: 'sign out',
    as: 'a',
    href: '/logout'
  }
];

const Header = ({
  data: {
    name, symbol, price_usd, percent_change_24h
  }
}) => (
  <Root>
    <Wrapper>
      <Box>
        <CompanyName align="start">
          {name} | <small>{symbol}</small>
        </CompanyName>
        <SubHeader align="end">
          Price: ${price_usd} | Change (24h):{' '}
          {percent_change_24h > 0 ? (
            <span style={{ color: 'green' }}>{percent_change_24h}%</span>
          ) : (
            <span style={{ color: 'red' }}>{percent_change_24h}%</span>
          )}
        </SubHeader>
      </Box>
      <Box
        align="center"
        style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Icon link name="at" size="large" />
        <Icon link name="empty star" size="large" />
        <Icon link name="ellipsis vertical" size="large" />
      </Box>
      <Box align="center">
        <Input fluid icon="search" iconPosition="left" placeholder="Search" />
      </Box>
      <Box align="center" style={{ textAlign: 'left' }}>
        <Dropdown trigger={trigger} options={options} pointing="top left" />
      </Box>
    </Wrapper>
  </Root>
);

export default Header;
