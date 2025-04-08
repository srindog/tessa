import React, { useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../../firebase';
import { getDateStringFromDateInput } from '../../../../utils/grammer';
import AuthenticatedPage from '../../AuthenticatedPage';
import NewsFeed from './NewsFeed';
import ProfessionalsFeed from './ProfessionalsFeed';

// function getFirstName(name: any) {
//   if (!name) return ''
//   return name.split(' ')[0]
// }

function Feed() {
  const [user] = useAuthState(auth);
  const [feed, setFeed]: any = useState(null);
  const [displayDate, setDisplayDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetch(`/api/feed/${user.uid}`)
        .then(async (res) => {
          if (res.ok) {
            const { feed: newFeed }: any = await res.json();
            setFeed(newFeed);
            setDisplayDate(getDateStringFromDateInput(newFeed.timestamp));
          } else {
            const { message }: any = await res.json();
            const err = new Error(message);
            throw err;
          }
        })
        .catch((e) => setError(e.message));
    }
  }, [user]);

  if (error) return <AuthenticatedPage>{error}</AuthenticatedPage>;
  if (!feed) return <AuthenticatedPage>Loading...</AuthenticatedPage>;

  return (
    <AuthenticatedPage>
      <h2 className="font-semibold text-4xl mb-2">{displayDate}</h2>
      <div className="grid gap-x-7 gap-y-3 grid-cols-1">
        {feed.news && <NewsFeed news={feed.news} />}
        {feed.professionals && (
          <ProfessionalsFeed professionals={feed.professionals} />
        )}
      </div>
    </AuthenticatedPage>
  );
}

export default Feed;
