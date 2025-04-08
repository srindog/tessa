import React from 'react';

import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase';

function OnboardingButton() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <>
      {user ? (
        <Button
          block
          size="larger"
          className="text-2xl"
          onClick={() => router.replace('/home/feed')}
        >
          Go to my feed!
        </Button>
      ) : (
        <Button
          block
          size="larger"
          className="text-2xl"
          onClick={() => router.replace('/onboarding/sign-up')}
        >
          Start your journey today!
        </Button>
      )}
    </>
  );
}

export { OnboardingButton };
