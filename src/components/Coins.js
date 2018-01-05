import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

export default () => (
  <Root>
    <p>Coins</p>
  </Root>
);
