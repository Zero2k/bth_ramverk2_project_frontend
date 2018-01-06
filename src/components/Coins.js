import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Root = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #6435c9;
  color: #958993;
`;

const CoinList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
  overflow: auto;
`;

const CoinListItem = styled.li`
  height: 50px;
  width: 50px;
  background-image: url(${props => props.image});
  background-color: ${props => props.color ? '#fff' : ''};
  background-repeat: no-repeat;
  background-size: contain;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
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
    <CoinListItem image={image} color='true' />
    <CoinListText>{symbol}</CoinListText>
  </Link>
);

export default ({ coins }) => (
  <Root>
    <CoinList>
      {coins.map(coin)}
      <Link key="search-coin" to="/view/bitcoin">
        <CoinListItem><Icon style={{ margin: '0' }} name='search' size='big' /></CoinListItem>
      </Link>
    </CoinList>
  </Root>
);
