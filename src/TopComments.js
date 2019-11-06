import React, { useState, useEffect } from 'react';
import { useFirebaseApp } from 'reactfire';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { appConfig } from './App';

const DeletedComment = styled.div`
  font-style: italic;
  opacity: 0.5;
`;

const StyledListItem = styled(ListItem)`
  border-bottom: 1px solid #ddd;
`;

function Comment({ commentId }) {
  const [comment, setComment] = useState(null);
  const firebaseApp = useFirebaseApp();

  useEffect(() => {
    const commentRef = firebaseApp.database().ref(`v0/item/${commentId}`);
    commentRef.on('value', snapshot => {
      const newComment = snapshot.val();
      if (!isEqual(comment, newComment)) {
        setComment(newComment);
      }
    });
    return () => {
      commentRef.off();
    };
  }, [commentId, comment, setComment, firebaseApp]);

  if (!comment) return null;
  const { by, id, text, deleted } = comment;

  return deleted ? (
    <DeletedComment>Comment was deleted</DeletedComment>
  ) : (
    <div id={id}>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      by: <strong>{by}</strong>
    </div>
  );
}

function TopComments({ commentsId = [] }) {
  return (
    <List>
      {commentsId.slice(0, appConfig.commentsLimit).map(id => (
        <StyledListItem key={id}>
          <Comment commentId={id} />
        </StyledListItem>
      ))}
    </List>
  );
}

export default TopComments;
