import React from 'react';
import { Form, Input, Button, Modal, TextArea, Dropdown } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { avatars } from '../utils/avatars';
import { userQuery } from '../graphql/user';

const SettingsModal = ({
  open,
  onClose,
  user,
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue
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
            defaultValue={user.username}
            name="username"
            label="Username"
            placeholder="Username"
          />
          <Form.Field
            control={Dropdown}
            onChange={(e, { name, value }) => setFieldValue(name, value)}
            placeholder="Select avatar"
            closeOnBlur={false}
            label="Avatar"
            selection
            defaultValue={user.avatar}
            options={avatars}
            name="avatar"
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          onChange={handleChange}
          defaultValue={user.about}
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
    handleSubmit: async (
      values,
      { props: { mutate, onClose, user }, setSubmitting, resetForm }
    ) => {
      if (!user.username) {
        setSubmitting(false);
        return;
      }

      await mutate({
        variables: { avatar: values.avatar, about: values.about },
        update: (store, { data: { updateUser } }) => {
          const { avatar, about } = updateUser;

          const data = store.readQuery({ query: userQuery });
          data.me = {
            __typename: 'User',
            _id: user._id,
            username: user.username,
            avatar,
            about
          };
          store.writeQuery({ query: userQuery, data });
        }
      });
      resetForm(false);
      onClose(true);
    }
  })
)(SettingsModal);
