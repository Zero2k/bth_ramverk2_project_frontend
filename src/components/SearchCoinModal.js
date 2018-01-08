import React from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';

const SearchCoinModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal size="small" open={open} onClose={onClose}>
    <Modal.Header>Search Cryptocurrency</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input />
        </Form.Field>
        <Form.Group widths="equal">
          <Button disabled={isSubmitting} fluid onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
            Join chat
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default SearchCoinModal;
