import React, { Fragment, Suspense } from 'react';
import { FirebaseAppProvider } from 'reactfire';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import 'firebase/database';
import Header from './Header';
import TopStories from './TopStories';

const firebaseConfig = {
  authDomain: 'hacker-news.firebaseio.com',
  databaseURL: 'https://hacker-news.firebaseio.com/',
  projectId: 'hacker-news'
};

export const appConfig = {
  storiesLimit: 10,
  commentLimit: 20
};

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Header />
        <Container>
          <Suspense fallback="Loading...">
            <TopStories limitToFirst={appConfig.storiesLimit} />
          </Suspense>
        </Container>
      </FirebaseAppProvider>
    </Fragment>
  );
}

export default App;
