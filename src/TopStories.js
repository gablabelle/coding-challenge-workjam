import React, { useState, useEffect } from 'react';
import { useFirebaseApp } from 'reactfire';
import { isEqual } from 'lodash';
import Story from './Story';

function TopStories({ limitToFirst }) {
  // First time using hooks ;-)
  const [stories, setStories] = useState([]);
  const firebaseApp = useFirebaseApp();

  useEffect(() => {
    const topStoriesRef = firebaseApp
      .database()
      .ref('v0/topstories/')
      .limitToFirst(limitToFirst);
    topStoriesRef.on('value', snapshot => {
      const newStories = snapshot.val();
      if (!isEqual(stories, newStories)) {
        setStories(newStories);
      }
    });
    return () => {
      topStoriesRef.off();
    };
  }, [limitToFirst, firebaseApp, stories, setStories]);

  return stories.map(storyId => {
    return <Story key={storyId} storyId={storyId} />;
  });
}

export default TopStories;
