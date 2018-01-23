import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Messages from '../components/Messages';

const newMessageSubscription = gql`
  subscription($coin: String!) {
    newCoinMessage(coin: $coin) {
      _id
      text
      createdAt
      postedBy(limit: "single") {
        username
      }
    }
  }
`;

class MessagesContainer extends React.Component {
  componentWillReceiveProps({ coin }) {
    this.props.data.subscribeToMore({
      document: newMessageSubscription,
      variables: {
        coin
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newMessage = subscriptionData.data.newCoinMessage;
        /* Prevent it from adding multiple messages */
        if (!prev.getMessages.find(msg => msg._id === newMessage._id)) {
          return Object.assign({}, prev, {
            getMessages: [...prev.getMessages, subscriptionData.data.newCoinMessage]
          });
        }
        return prev;
      }
    });
  }

  render() {
    const { data: { loading, getMessages } } = this.props;
    return loading ? null : (
      <Messages>
        <Comment.Group style={{ paddingTop: '10px' }}>
          {getMessages.map(message => (
            <Comment key={`${message._id}-message`}>
              <Comment.Avatar src="https://react.semantic-ui.com/assets/images/avatar/small/molly.png" />
              <Comment.Content>
                <Comment.Author style={{ textTransform: 'capitalize' }} as="a">
                  {message.postedBy.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{distanceInWordsToNow(message.createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text>{message.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action active>Reply</Comment.Action>
                  <Comment.Action active>Share</Comment.Action>
                  <Comment.Action active>Like</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

const messagesQuery = gql`
  query($coin: String!) {
    getMessages(coin: $coin) {
      _id
      text
      createdAt
      postedBy {
        username
      }
    }
  }
`;

export default graphql(messagesQuery, {
  options: props => ({
    fetchPolicy: 'network-only',
    variables: {
      coin: props.coin
    }
  })
})(MessagesContainer);
