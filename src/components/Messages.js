import React from 'react';
import styled from 'styled-components';
import { Comment } from 'semantic-ui-react';

const Root = styled.div`
  grid-column: 3;
  grid-row: 2;
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

export default () => (
  <Root>
    <Comment.Group>
      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/assets/images/avatar/small/molly.png" />
        <Comment.Content>
          <Comment.Author as="a">Stevie Feliciano</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <Comment.Action active>Reply</Comment.Action>
            <Comment.Action active>Share</Comment.Action>
            <Comment.Action active>Like</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  </Root>
);
