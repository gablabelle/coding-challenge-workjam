import React from 'react';
import { useFirebaseApp, useDatabaseObject } from 'reactfire';
import StoryCard from './StoryCard';

function Story({ storyId }) {
  // We don't want to store fetched stories in a store or in the context api
  // because if a story re-enters the top 10, it's data (score, comments) will most certainly
  // have changed and we would need to re-fetch anyway.
  const firebaseApp = useFirebaseApp();
  const storyRef = firebaseApp.database().ref(`v0/item/${storyId}`);
  const storyDbObj = useDatabaseObject(storyRef);
  const story = storyDbObj.snapshot.val();

  return <StoryCard story={story} />;
}

export default Story;
