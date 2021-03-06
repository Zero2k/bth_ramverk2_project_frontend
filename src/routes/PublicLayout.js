import React from 'react';
import styled from 'styled-components';

import PublicNavbar from '../containers/PublicNavbar';

const Root = styled.div``;

const Backround = styled.div`
  min-height: 100vh;
  background-image: url('https://cdn-images-1.medium.com/max/2000/1*BnXHRV0vQCqJqpzE6escSQ.jpeg');
  background-size: cover;
`;

const PublicLayout = ({ children }) => (
  <Root>
    <Backround>
      <PublicNavbar />
      {children}
    </Backround>
  </Root>
);

export default PublicLayout;
