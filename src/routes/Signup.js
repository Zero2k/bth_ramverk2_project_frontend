import React from 'react';
import { Link } from 'react-router-dom';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      username: '',
      email: '',
      password: '',
      success: ''
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

    console.log(response);

    const { success } = response.data.signup;
    if (success) {
      this.props.history.push('/login');
    } else {
      this.success = false;
      this.props.history.push('/sign-up');
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      username, email, password, success
    } = this;

    return (
      <div className="login-form">
        {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
            */}
        <style>
          {`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                height: 100%;
                }
            `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: '100%', paddingTop: '21em' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" style={{ color: '#6435c9' }} textAlign="center">
              <Icon name="bitcoin" />| Create your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  onChange={this.onChange}
                  value={username}
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                />

                <Button color="violet" fluid size="large" onClick={this.onSubmit}>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            {success === false ? (
              <Message error header="There was some errors with your submission" />
            ) : null}
            <Message>
              Already a member?{' '}
              <Link as={Link} to="/login">
                Sign In
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      success
    }
  }
`;

export default graphql(mutation)(observer(Register));
