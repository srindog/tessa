import React, { useState, useEffect } from 'react';

import { Input, Button } from '@windmill/react-ui';
import { useAuthState } from 'react-firebase-hooks/auth';
import Creatable from 'react-select/creatable';
import TimezoneSelect from 'react-timezone-select';

import { auth } from '../../../../firebase';
import { updateUserInfo } from '../../../../firebase/user';
import AuthenticatedPage from '../../AuthenticatedPage';

const careersData = [
  { value: 'software engineer', label: 'software engineer' },
  { value: 'senior software engineer', label: 'senior software engineer' },
  { value: 'product manager', label: 'product manager' },
  { value: 'senior product manager', label: 'senior product manager' },
  { value: 'vp of product', label: 'vp of product' },
  { value: 'vp of engineering', label: 'vp of engineering' },
];

const domainsData = [
  { value: 'blockchain', label: 'blockchain' },
  { value: 'machine learning', label: 'machine learning' },
  { value: 'quantum computing', label: 'quantum computing' },
  { value: 'artificial intelligence', label: 'artificial intelligence' },
  { value: 'data mining', label: 'data mining' },
  { value: 'big data', label: 'big data' },
  { value: 'virtual reality', label: 'virtual reality' },
  { value: 'augmented reality', label: 'augmented reality' },
  { value: 'metaverse', label: 'metaverse' },
  { value: 'web3', label: 'web3' },
  { value: 'cloud computing', label: 'cloud computing' },
  { value: 'crypto', label: 'crypto' },
  { value: 'devops', label: 'devops' },
  { value: 'ui ux', label: 'ui ux' },
  { value: 'payments', label: 'payments' },
  {
    value: 'natural language processing',
    label: 'natural language processing',
  },
  { value: 'robotics', label: 'robotics' },
  { value: 'react js', label: 'react js' },
  { value: 'frontend', label: 'frontend' },
  { value: 'backend', label: 'backend' },
  { value: 'full stack development', label: 'full stack development' },
  { value: 'distributed systems', label: 'distributed systems' },
  { value: 'growth', label: 'growth' },
  { value: 'Capital One', label: 'Capital One' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Google', label: 'Google' },
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'Amazon', label: 'Amazon' },
];
const locationsData = [
  { value: 'new york', label: 'new york' },
  { value: 'san francisco', label: 'san francisco' },
  { value: 'chicago', label: 'chicago' },
  { value: 'boston', label: 'boston' },
  { value: 'washington dc', label: 'washington dc' },
];

function labelInterests(interests: any) {
  return interests.map((interest: any) => {
    return { label: interest, value: interest };
  });
}

function deepCheckObjects(o1: any, o2: any) {
  return JSON.stringify(o1) === JSON.stringify(o2);
}

function Profile() {
  const [user] = useAuthState(auth);
  const [info, setInfo]: any = useState(null);
  const [newInfo, setNewInfo]: any = useState(info);
  const [interests, setInterests]: any = useState(null);
  const [newInterests, setNewInterests] = useState(interests);
  const [error, setError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const canUpdateProfile =
    info &&
    interests &&
    deepCheckObjects(
      { ...info, ...interests },
      { ...newInfo, ...newInterests }
    );

  const handleProfileUpdate = async () => {
    if (
      !newInterests.careers.length &&
      !newInterests.domains.length &&
      !newInterests.locations.length
    ) {
      setProfileError('Please enter at least 1 career, interest, or location');
      return;
    }
    const newTags = [
      newInfo.position,
      newInfo.company,
      newInfo.location,
      newInfo.school,
      newInfo.major,
    ].concat(newInterests.domains);
    const updatedUserInfo = {
      ...newInfo,
      interests: newInterests,
      tags: newTags,
      last_updated: new Date().getTime(),
    };
    setUpdateLoading(true);
    updateUserInfo(user, updatedUserInfo).catch((e) => setError(e.message));
    setInfo(newInfo);
    setInterests(newInterests);
    setUpdateLoading(false);
  };

  const handleInfoChange = (evt: any) => {
    const { value } = evt.target;
    setNewInfo({
      ...newInfo,
      [evt.target.name]: value,
    });
  };

  const handleTimezoneChange = (evt: any) => {
    const { value } = evt;
    setNewInfo({
      ...newInfo,
      timezone: value,
    });
  };

  const handleInterestsChange = (evt: any, name: any) => {
    setNewInterests({
      ...newInterests,
      [name]: evt.map((e: any) => e.value),
    });
  };

  const handleSetDefault = () => {
    setNewInfo(info);
    setNewInterests(interests);
  };

  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.uid}`)
        .then(async (res) => {
          if (res.ok) {
            const { userData: newUserData }: any = await res.json();
            setNewInfo(newUserData);
            setNewInterests(newUserData.interests);
            setInfo(newUserData);
            setInterests(newUserData.interests);
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
  if (!info || !interests)
    return <AuthenticatedPage>Loading...</AuthenticatedPage>;

  return (
    <AuthenticatedPage>
      <form className="w-50">
        <header className="text-2xl font-semibold">Interests</header>
        <Creatable
          options={domainsData}
          value={labelInterests(newInterests.domains)}
          isSearchable
          isMulti
          placeholder="What interests you?"
          className="mt-3 text-lg"
          onChange={(evt) => handleInterestsChange(evt, 'domains')}
        />
        <Creatable
          options={careersData}
          value={labelInterests(newInterests.careers)}
          isSearchable
          isMulti
          placeholder="What careers interest to you?"
          className="mt-3 text-lg"
          onChange={(evt) => handleInterestsChange(evt, 'careers')}
        />
        <Creatable
          options={locationsData}
          value={labelInterests(newInterests.locations)}
          isSearchable
          isMulti
          placeholder="Where locations interest you?"
          className="mt-3 text-lg"
          onChange={(evt) => handleInterestsChange(evt, 'locations')}
        />
        {profileError && <span className="text-red-500">{profileError}</span>}

        <header className="text-2xl font-semibold mt-4">Personal Info</header>
        <div className="mt-2 grid gap-x-7 gap-y-3 grid-cols-2">
          <div>
            <span className="text-xl">Name</span>
            <Input
              css=""
              className="text-lg h-10"
              value={newInfo.name}
              name="name"
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <span className="text-xl">Timezone</span>
            <TimezoneSelect
              id="timezone-select"
              className="text-lg h-10"
              value={newInfo.timezone}
              name="timezone"
              placeholder="Select your preferred timezone..."
              onChange={handleTimezoneChange}
            />
          </div>
          <div>
            <span className="text-xl">Linkedin</span>
            <Input
              css=""
              className="text-lg h-10"
              value={newInfo.linkedin}
              name="linkedin"
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <span className="text-xl">Most Recent Position</span>
            <Input
              css=""
              className="text-lg h-10"
              value={newInfo.position}
              name="position"
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <span className="text-xl">
              Company/Organization (if applicable)
            </span>
            <Input
              css=""
              className="text-lg h-10"
              value={newInfo.company}
              name="company"
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <span className="text-xl">Location</span>
            <Input
              css=""
              className="text-lg h-10"
              value={newInfo.location}
              name="location"
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <span className="text-xl">School</span>
            <Input
              css=""
              className="text-lg h-10"
              value={newInfo.school}
              name="school"
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <span className="text-xl">Major</span>
            <Input
              css=""
              className="text-lg h-10"
              value={newInfo.major}
              name="major"
              onChange={handleInfoChange}
            />
          </div>
          <div className="flex flex-row">
            <Button
              block
              onClick={handleSetDefault}
              disabled={canUpdateProfile || updateLoading}
              layout="primary"
              size="large"
              className="text-xl mt-4 "
            >
              Reset Info
            </Button>
          </div>
          <div>
            <Button
              block
              onClick={handleProfileUpdate}
              disabled={canUpdateProfile || updateLoading}
              layout="primary"
              size="large"
              className="text-xl mt-4"
            >
              Update Info
            </Button>
          </div>
        </div>
      </form>
    </AuthenticatedPage>
  );
}

export default Profile;
