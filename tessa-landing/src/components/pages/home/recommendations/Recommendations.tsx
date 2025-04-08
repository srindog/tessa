import React, { useState, useEffect } from 'react';

import { Dropdown, DropdownItem, Button } from '@windmill/react-ui';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../../firebase';
import { capitalizeWord } from '../../../../utils/grammer';
import AuthenticatedPage from '../../AuthenticatedPage';
import NewsRecommendations from './NewsRecommendations';
import ProfessionalsRecommendations from './ProfessionalsRecommendations';

const lodash = require('lodash');

function Recommendations() {
  const [user] = useAuthState(auth);
  const [recommendations, setRecommendations]: any = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType]: any = useState('');
  const [error, setError] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeChange = (evt: any) => {
    const newlySelectedType = evt.target.value;
    setType(newlySelectedType);
    setIsOpen(false);
  };

  const displaySelectedRecommendations = () => {
    switch (type) {
      case 'professionals':
        return (
          <ProfessionalsRecommendations
            professionals={recommendations.professionals}
          />
        );
      case 'news':
        return <NewsRecommendations news={recommendations.news} />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (user) {
      fetch(`/api/recommendations/${user.uid}`)
        .then(async (res) => {
          if (res.ok) {
            const { recommendations: newRecommendations }: any =
              await res.json();
            setType('professionals');
            setRecommendations(newRecommendations);
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
  if (!recommendations)
    return <AuthenticatedPage>Loading...</AuthenticatedPage>;

  return (
    <AuthenticatedPage>
      <div className="relative">
        <Button size="larger" className="text-2xl" onClick={toggleDropdown}>
          {capitalizeWord(type)}
        </Button>
        <Dropdown
          isOpen={isOpen}
          onClose={lodash.debounce(() => setIsOpen(false), 100)}
        >
          {Object.keys(recommendations).map((recommendationType, i) => (
            <DropdownItem
              className="text-2xl"
              key={`type-${i}`}
              onClick={handleTypeChange}
              value={recommendationType}
            >
              {capitalizeWord(recommendationType)}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
      {displaySelectedRecommendations()}
      {error && <p>{error}</p>}
    </AuthenticatedPage>
  );
}

export default Recommendations;
