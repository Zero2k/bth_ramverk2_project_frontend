import React from 'react';
import { Form, Input, Button, Modal, TextArea } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const SettingsModal = ({
  open, onClose, values, handleChange, handleSubmit, isSubmitting
}) => (
  <Modal size="small" open={open} onClose={onClose}>
    <Modal.Header>Change Settings</Modal.Header>
    <Modal.Content>
      <Form
        onSubmit={(e) => {
          if (!isSubmitting) {
            handleSubmit(e);
          }
        }}
      >
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            readOnly
            /* defaultValue={} */
            name="username"
            label="Username"
            placeholder="Username"
          />
          <Form.Field
            control={Input}
            onChange={handleChange}
            value={values.avatar}
            label="Avatar"
            name="avatar"
            placeholder="Avatar"
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          onChange={handleChange}
          value={values.about}
          label="About"
          name="about"
          placeholder="Tell us more about you..."
        />
        <Form.Field control={Button} type="submit">
          Save
        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);

const updateUserMutation = gql`
  mutation($avatar: String, $about: String) {
    updateUser(avatar: $avatar, about: $about) {
      avatar
      about
    }
  }
`;

export default compose(
  graphql(updateUserMutation),
  withFormik({
    mapPropsToValues: () => ({ avatar: '' }),
    handleSubmit: async (values, { props: { mutate, onClose }, setSubmitting, resetForm }) => {
      /* if (!values.username) {
        setSubmitting(false);
        return;
      } */

      await mutate({
        variables: { avatar: values.avatar, about: values.about }
      });
      resetForm(false);
      onClose(true);
    }
  })
)(SettingsModal);
