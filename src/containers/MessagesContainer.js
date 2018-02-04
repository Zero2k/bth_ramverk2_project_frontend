import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment, Popup, Feed } from 'semantic-ui-react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

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
  state = {
    loadMoreItem: true,
    avatar: 'https://react.semantic-ui.com/assets/images/avatar/small/molly.png'
  };

  componentWillReceiveProps({ data: { getMessages }, coin }) {
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
          return {
            ...prev,
            getMessages: [
              subscriptionData.data.newCoinMessage,
              ...prev.getMessages
            ]
          };
        }
        return prev;
      }
    });

    /* Check if coin (page) changes and reset state */
    if (coin !== this.props.coin) {
      this.setState({ loadMoreItem: true });
    }

    /* Keep current position when scrolling and new messages is being loaded */
    if (
      this.scroller &&
      this.props.data.getMessages &&
      getMessages &&
      this.scroller.scrollTop < 100 &&
      this.props.data.getMessages.length !== getMessages.length
    ) {
      const chatHeight = this.scroller.scrollHeight;
      setTimeout(() => {
        this.scroller.scrollTop = this.scroller.scrollHeight - chatHeight;
      }, 125);
    }
  }

  infiniteScroll = () => {
    const { data: { getMessages, fetchMore }, coin } = this.props;
    if (
      this.scroller &&
      this.state.loadMoreItem &&
      this.scroller.scrollTop < 100
    ) {
      fetchMore({
        variables: {
          coin,
          offset: getMessages.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.getMessages.length < 15) {
            this.setState({ loadMoreItem: false });
          }

          const newEntries = fetchMoreResult.getMessages;
          if (!prev.getMessages.find(msg => msg._id === newEntries._id)) {
            return {
              ...prev,
              getMessages: [
                ...prev.getMessages,
                ...fetchMoreResult.getMessages.filter(n => !prev.getMessages.some(p => p._id === n._id))
              ]
            };
          }
          return prev;
        }
      });
    }
  };

  render() {
    const { data: { loading, getMessages } } = this.props;

    return loading || !getMessages ? null : (
      <div
        style={{
          gridColumn: '3',
          gridRow: '2',
          backgroundColor: '#fff',
          paddingTop: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto'
        }}
        onScroll={this.infiniteScroll}
        ref={(scroller) => {
          this.scroller = scroller;
        }}
      >
        <Comment.Group style={{ paddingTop: '10px', maxWidth: '100%' }}>
          {getMessages
            .slice()
            .reverse()
            .map(message => (
              <Comment key={`${message._id}-message`}>
                <Popup
                  trigger={
                    <Comment.Avatar
                      src={
                        message.postedBy.avatar
                          ? message.postedBy.avatar
                          : this.state.avatar
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
                              : this.state.avatar
                          }
                        />
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User style={{ textTransform: 'capitalize' }}>
                              {message.postedBy.username}
                            </Feed.User>{' '}
                            joined
                            <Feed.Date>
                              {distanceInWordsToNow(message.postedBy.createdAt)}{' '}
                              ago
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
                  <Comment.Author
                    style={{ textTransform: 'capitalize' }}
                    as="a"
                  >
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
      </div>
    );
  }
}

const messagesQuery = gql`
  query($offset: Int, $coin: String!) {
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
