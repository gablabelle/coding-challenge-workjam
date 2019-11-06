import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import TopComments from './TopComments';

const StyledCard = styled(Card)`
  margin-top: 20px;
`;

function StoryCard({ story }) {
  const { by, descendants, id, kids, score, title, url } = story;
  const [showTopComments, setShowTopComments] = useState(false);

  return (
    <StyledCard id={id}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            <Link href={url} target="_blank" color="inherit" rel="noreferrer">
              {title}
            </Link>
          </Typography>
          <Typography color="textSecondary" component="p">
            <strong>author</strong>: {by}
            {' - '}
            <strong>score</strong>: {score}
            {' - '}
            <strong>comments</strong>: {descendants}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => setShowTopComments(!showTopComments)}
        >
          {!showTopComments ? 'Show' : 'Hide'} top comments
        </Button>
      </CardActions>
      {showTopComments && (
        <CardActionArea>
          <CardContent>
            <Typography color="textSecondary" component="div">
              <TopComments commentsId={kids} />
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
    </StyledCard>
  );
}

export default StoryCard;
