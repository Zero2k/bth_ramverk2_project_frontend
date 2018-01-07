import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const Root = styled.div``;

const Home = () => (
  <Root>
    <Container text>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'center',
          marginTop: '21em',
          color: 'black',
          padding: '25px',
          opacity: '0.95',
          borderRadius: '5px',
          backgroundColor: '#FFF'
        }}
      >
        <Header
          as="h1"
          content="Join CoinChat. It's Free!"
          inverted
          style={{
            fontSize: '3em',
            fontWeight: 'normal',
            color: 'black'
          }}
        />

        <Header
          as="h2"
          content="Connect with thousands of Investors and Traders"
          style={{ fontSize: '1.7em', fontWeight: 'normal', paddingBottom: '20px' }}
        />
        <Button.Group size="large">
          <Button as={Link} to="/sign-up" color="violet">
            Join Now
          </Button>
          <Button.Or />
          <Button as={Link} to="/about">
            Learn More
          </Button>
        </Button.Group>
      </div>
    </Container>
  </Root>
);

export default Home;
