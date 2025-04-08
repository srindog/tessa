import React, { useEffect, useState } from 'react';

import { Button, Input, Label } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Creatable from 'react-select/creatable';
import TimezoneSelect from 'react-timezone-select';

import { auth } from '../../../firebase';
import { updateUserInfo } from '../../../firebase/user';
import { Background } from '../../background/Background';
import { Section } from '../../layout/Section';
import { LandingNavbar } from '../landing/LandingNavbar';

const careersData: any = [
  { value: 'software engineer', label: 'software engineer' },
  { value: 'senior software engineer', label: 'senior software engineer' },
  { value: 'product manager', label: 'product manager' },
  { value: 'senior product manager', label: 'senior product manager' },
  { value: 'vp of product', label: 'vp of product' },
  { value: 'vp of engineering', label: 'vp of engineering' },
];

const domainsData: any = [
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
const locationsData: any = [
  { value: 'new york', label: 'new york' },
  { value: 'san francisco', label: 'san francisco' },
  { value: 'chicago', label: 'chicago' },
  { value: 'boston', label: 'boston' },
  { value: 'washington dc', label: 'washington dc' },
];

function InterestsSurvey() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [info, setInfo] = useState({
    linkedin: '',
    position: '',
    company: '',
    location: '',
    school: '',
    major: '',
    timezone: '',
  });

  const [onboardingError, setOnboardingError] = useState('');

  const [interests, setInterests] = useState({
    careers: [],
    domains: [],
    locations: [],
  });

  const [userError, setUserError] = useState('');

  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.uid}`)
        .then(async (res) => {
          if (res.ok) {
            const { userData: newUserData }: any = await res.json();
            if (newUserData.onboarded) {
              router.replace('/home/profile');
            }
          } else {
            const { message }: any = await res.json();
            const err = new Error(message);
            throw err;
          }
        })
        .catch((e) => setUserError(e.message));
    }
  }, [user]);

  const handleCompleteOnboarding = async () => {
    if (
      !interests.careers.length &&
      !interests.domains.length &&
      !interests.locations.length
    ) {
      setOnboardingError(
        'Please enter at least 1 career, interest, or location'
      );
      return;
    }
    if (!info.timezone) {
      setOnboardingError('Please enter your main timezone!');
      return;
    }
    const tags = [
      info.position,
      info.company,
      info.location,
      info.school,
      info.major,
    ]
      .concat(interests.domains)
      .filter((tag) => tag.length !== 0);
    const updatedUserInfo = {
      ...info,
      interests,
      tags,
      onboarded: true,
      last_updated: new Date().getTime(),
    };
    await updateUserInfo(user, updatedUserInfo);
    router.replace('/home/profile');
  };

  const handleInfoChange = (evt: any) => {
    const { value } = evt.target;
    setInfo({
      ...info,
      [evt.target.name]: value,
    });
  };

  const handleTimezoneChange = (evt: any) => {
    const { value } = evt;
    setInfo({
      ...info,
      timezone: value,
    });
  };

  const handleInterestsChange = (evt: any, name: any) => {
    setInterests({
      ...interests,
      [name]: evt.map((e: any) => e.value),
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) router.replace('/onboarding/sign-in');
  else if (!user) router.replace('/onboarding/sign-in');
  else if (userError) return <p>{userError}</p>;

  return (
    <div className="antialiased text-gray-900">
      <Background className="h-screen w-screen bg-pattern-randomized">
        <Section yPadding="py-4">
          <LandingNavbar />
        </Section>
        <form className="w-50">
          <Section yPadding="py-1">
            <header className="text-2xl font-semibold">
              Tell us about your professional interests
            </header>
            <Label className="pl-1 text-base text-gray-900">
              Feel free to create your own tags as well!
            </Label>
            <Creatable
              options={domainsData}
              isSearchable
              isMulti
              placeholder="What interests you?"
              className="mt-3 text-lg"
              onChange={(evt) => handleInterestsChange(evt, 'domains')}
            />
            <Creatable
              options={careersData}
              isSearchable
              isMulti
              placeholder="What careers interest to you?"
              className="mt-3 text-lg"
              onChange={(evt) => handleInterestsChange(evt, 'careers')}
            />
            <Creatable
              options={locationsData}
              isSearchable
              isMulti
              placeholder="Where locations interest you?"
              className="mt-3 text-lg"
              onChange={(evt) => handleInterestsChange(evt, 'locations')}
            />
          </Section>
          <Section yPadding="py-0">
            <header className="text-2xl font-semibold">
              And a little more information...
            </header>
            <TimezoneSelect
              id="timezone-select"
              className="text-lg mt-2"
              value={info.timezone}
              name="timezone"
              placeholder="Select your preferred timezone..."
              onChange={handleTimezoneChange}
            />
            <div className="mt-2 grid gap-x-7 gap-y-3 grid-cols-2">
              <div>
                <span className="text-xl">Linkedin</span>
                <Input
                  css=""
                  id="interests-select"
                  className="text-lg h-10"
                  value={info.linkedin}
                  name="linkedin"
                  onChange={handleInfoChange}
                />
              </div>
              <div>
                <span className="text-xl">Most Recent Position</span>
                <Input
                  css=""
                  className="text-lg h-10"
                  value={info.position}
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
                  value={info.company}
                  name="company"
                  onChange={handleInfoChange}
                />
              </div>
              <div>
                <span className="text-xl">Location</span>
                <Input
                  css=""
                  className="text-lg h-10"
                  value={info.location}
                  name="location"
                  onChange={handleInfoChange}
                />
              </div>
              <div>
                <span className="text-xl">School</span>
                <Input
                  css=""
                  className="text-lg h-10"
                  value={info.school}
                  name="school"
                  onChange={handleInfoChange}
                />
              </div>
              <div>
                <span className="text-xl">Major</span>
                <Input
                  css=""
                  className="text-lg h-10"
                  value={info.major}
                  name="major"
                  onChange={handleInfoChange}
                />
              </div>
            </div>
            {onboardingError && (
              <span className="text-md font-semibold text-red-500">
                {onboardingError}
              </span>
            )}
          </Section>
          <Section yPadding="py-5">
            <Button
              block
              onClick={handleCompleteOnboarding}
              layout="primary"
              size="large"
              className="text-xl"
            >
              Complete Onboarding!
            </Button>
          </Section>
        </form>
      </Background>
    </div>
  );
}

export { InterestsSurvey };
