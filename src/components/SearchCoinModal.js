import React from 'react';
import Downshift from 'downshift';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

const getCoinsQuery = gql`
  query($name: String!) {
    searchCoins(name: $name) {
      success
      data {
        id
        name
      }
    }
  }
`;

const Items = ({
  data: { loading, searchCoins },
  highlightedIndex,
  selectedItem,
  getItemProps
}) => {
  if (loading || !searchCoins) {
    return null;
  }
  const { data } = searchCoins;

  return (
    <div>
      {data.slice(0, 5).map((item, index) => (
        <div
          {...getItemProps({ item })}
          key={item.id}
          style={{
            backgroundColor: highlightedIndex === index ? 'gray' : 'white',
            fontWeight: selectedItem === item ? 'bold' : 'normal'
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

const FetchItems = graphql(getCoinsQuery, {
  options: ({ name }) => ({ variables: { name } })
})(Items);

const SearchCoinModal = ({ history, open, onClose }) => (
  <Modal size="small" open={open} onClose={onClose}>
    <Modal.Header>Search Cryptocurrency</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Downshift
            onChange={(selectedItem) => {
              history.push(`/view/${selectedItem.id}`);
              onClose();
            }}
            render={({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              selectedItem,
              highlightedIndex
            }) => (
              <div>
                <Input fluid {...getInputProps({ placeholder: 'Search cryptocurrency' })} />
                {isOpen ? (
                  <div style={{ border: '1px solid #ccc' }}>
                    <FetchItems
                      name={inputValue}
                      selectedItem={selectedItem}
                      highlightedIndex={highlightedIndex}
                      getItemProps={getItemProps}
                    />
                  </div>
                ) : null}
              </div>
            )}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button fluid onClick={onClose}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default withRouter(SearchCoinModal);
