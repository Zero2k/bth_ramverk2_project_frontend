import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Root = styled.div``;

const About = () => (
  <Root>
    <Container text>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'center',
          marginTop: '21em',
          color: 'black',
          padding: '20px',
          opacity: '0.9',
          borderRadius: '5px',
          backgroundColor: '#FFF'
        }}
      >
        <Header as="h2">About CoinChat</Header>
        <p>
          CoinChat is part of a course project at Blekinge Institute of
          Technology. Learn more about the course{' '}
          <a href="https://dbwebb.se/kurser/ramverk2/">here</a>.
        </p>
        <p>
          The idea behind the application is to get information and discussions
          around cryptocurrenies to occur in real time, unlike traditional
          forums.
        </p>
        <Icon name="github" size="large" />
      </div>
    </Container>
  </Root>
);

export default About;
