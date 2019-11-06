import { useState } from 'react';
import constate from 'constate';

function useStories() {
  const [stories, setStories] = useState({});
  const getStory = storyId => stories[storyId];
  const saveStory = story => {
    const newStories = {
      ...stories
    };
    newStories[story.id] = story;
    setStories(newStories);
  };
  return { stories, getStory, saveStory };
}

const [StoryProvider, useStoryContext] = constate(useStories);

export { useStoryContext };

export default StoryProvider;
