import React from 'react';
import { Form, Header, Button, Segment, Icon, Modal } from 'semantic-ui-react';
// import { withFormik } from 'formik';
// import gql from 'graphql-tag';
// import { compose, graphql } from 'react-apollo';

const LoginModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal size="tiny" basic open={open} onClose={onClose}>
    <Modal.Content>
      <Header as="h2" style={{ color: '#FFF' }} textAlign="center">
        <Icon name="bitcoin" />| Log-in to your account
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail address" />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />

          <Button color="violet" fluid size="large">
            Login
          </Button>
        </Segment>
      </Form>
    </Modal.Content>
  </Modal>
);

export default LoginModal;
