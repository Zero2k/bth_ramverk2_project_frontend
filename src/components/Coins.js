import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Root = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #6435c9;
  color: #958993;
  overflow-y: overlay;
`;

const CoinList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const CoinListItem = styled.li`
  height: 50px;
  width: 50px;
  background-image: url(${props => props.image});
  background-color: ${props => (props.color ? '#fff' : '')};
  background-repeat: no-repeat;
  background-size: contain;
  color: #fff;
  margin: auto;
  margin-bottom: ${props => (props.margin ? '' : '10px')};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  &:hover {
    border-style: solid;
    border-width: thin;
  }
`;

const CoinListText = styled.div`
  text-align: center;
  font-size: 16px;
  padding-bottom: 12px;
  color: #fff;
`;

const coin = ({ id, symbol, image }) => (
  <Link key={`team-${id}`} to={`/view/${id}`}>
    <CoinListItem image={image} color="true" />
    <CoinListText>{symbol}</CoinListText>
  </Link>
);

const Coins = ({ coins, onCoinSeachClick }) => (
  <Root>
    <CoinList>
      {coins.map(coin)}
      <Link key="search-coin" to="/view/bitcoin">
        <CoinListItem onClick={onCoinSeachClick} margin>
          <Icon style={{ margin: '0' }} name="search" size="big" />
        </CoinListItem>
      </Link>
    </CoinList>
  </Root>
);

export default Coins;
