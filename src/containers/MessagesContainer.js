import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment, Popup, Feed, Button } from 'semantic-ui-react';
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
        avatar
        about
        createdAt
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
        <Comment.Group style={{ paddingTop: '10px', maxWidth: '100%' }}>
          <Button
            style={{ width: '100%' }}
            onClick={() => {
              this.props.data.fetchMore({
                variables: {
                  coin: this.props.coin,
                  offset: this.props.data.getMessages.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) {
                    return prev;
                  }

                  return {
                    ...prev,
                    getMessages: [...prev.getMessages, ...fetchMoreResult.getMessages]
                  };
                }
              });
            }}
          >
            Load More
          </Button>
          {getMessages.map(message => (
            <Comment key={`${message._id}-message`}>
              <Popup
                trigger={
                  <Comment.Avatar
                    src={
                      message.postedBy.avatar
                        ? message.postedBy.avatar
                        : 'https://react.semantic-ui.com/assets/images/avatar/small/molly.png'
                    }
                  />
                }
                content={
                  <Feed>
                    <Feed.Event>
                      <Feed.Label
                        image={
                          message.postedBy.avatar
                            ? message.postedBy.avatar
                            : 'https://react.semantic-ui.com/assets/images/avatar/small/molly.png'
                        }
                      />
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.User style={{ textTransform: 'capitalize' }}>
                            {message.postedBy.username}
                          </Feed.User>{' '}
                          joined
                          <Feed.Date>
                            {distanceInWordsToNow(message.postedBy.createdAt)} ago
                          </Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra text style={{ fontStyle: 'italic' }}>
                          {message.postedBy.about}
                        </Feed.Extra>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                }
                position="right center"
                style={{
                  borderRadius: 0,
                  opacity: 0.9,
                  padding: '1em'
                }}
                wide="very"
                on="hover"
              />
              <Comment.Content>
                <Comment.Author style={{ textTransform: 'capitalize' }} as="a">
                  {message.postedBy.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{distanceInWordsToNow(message.createdAt)} ago</div>
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
  query($offset: Int!, $coin: String!) {
    getMessages(offset: $offset, coin: $coin) {
      _id
      text
      createdAt
      postedBy {
        username
        avatar
        about
        createdAt
      }
    }
  }
`;

export default graphql(messagesQuery, {
  options: props => ({
    fetchPolicy: 'network-only',
    variables: {
      coin: props.coin,
      offset: 0
    }
  })
})(MessagesContainer);
