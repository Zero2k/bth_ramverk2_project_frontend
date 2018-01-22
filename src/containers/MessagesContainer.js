import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Messages from '../components/Messages';

const MessagesContainer = ({ data: { loading, getMessages } }) =>
  (loading ? null : (
    <Messages>
      <Comment.Group style={{ paddingTop: '10px' }}>
        {getMessages.map(message => (
          <Comment key={`${message._id}-message`}>
            <Comment.Avatar src="https://react.semantic-ui.com/assets/images/avatar/small/molly.png" />
            <Comment.Content>
              <Comment.Author as="a">{message.postedBy.username}</Comment.Author>
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
  ));

const messagesQuery = gql`
  query($coin: String!) {
    getMessages(coin: $coin) {
      _id
      text
      createdAt
      postedBy {
        _id
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
