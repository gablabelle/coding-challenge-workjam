import React, { useEffect } from 'react';
import { useFirebaseApp } from 'reactfire';
import { isEqual } from 'lodash';
import { useStoryContext } from './StoryProvider';
import StoryCard from './StoryCard';

function Story({ storyId }) {
  const { getStory, saveStory } = useStoryContext();
  const story = getStory(storyId);
  const firebaseApp = useFirebaseApp();

  useEffect(() => {
    const storyRef = firebaseApp.database().ref(`v0/item/${storyId}`);
    storyRef.on('value', snapshot => {
      const newStory = snapshot.val();
      if (!isEqual(story, newStory)) {
        saveStory(newStory);
      }
    });
    return () => {
      storyRef.off();
    };
  }, [storyId, firebaseApp, story, saveStory]);

  if (!story) return null;

  return <StoryCard key={storyId} story={story} />;
}

export default Story;
