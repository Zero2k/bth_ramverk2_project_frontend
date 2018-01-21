import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const Root = styled.div`
  grid-column: 3;
  grid-row: 3;
  background-color: #fff;
`;

const Inputx = styled.div`
  margin: 20px;
`;

const SendMessage = ({
  data: { name },
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Root>
    <Inputx>
      <Input
        name="message"
        value={values.message}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !isSubmitting) {
            handleSubmit(e);
          }
        }}
        fluid
        placeholder={`Talk about #${name}`}
        icon={{ name: 'smile', link: true }}
      />
    </Inputx>
  </Root>
);

const createMessageMutation = gql`
  mutation($coin: String!, $text: String!) {
    createMessage(coin: $coin, text: $text)
  }
`;

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (values, { props: { coin, mutate }, setSubmitting, resetForm }) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false);
        return;
      }

      await mutate({
        variables: { coin, text: values.message }
      });
      resetForm(false);
    }
  })
)(SendMessage);
