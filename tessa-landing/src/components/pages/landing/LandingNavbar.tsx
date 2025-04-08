import React from 'react';

import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase';
import { signOut } from '../../../firebase/auth';
import { Logo } from '../../logo/Logo';
import { NavbarTwoColumns } from '../../navigation/NavbarTwoColumns';

function LandingNavbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  const handleOpenNewTab = () => {
    window.open('https://forms.gle/FQV5EahiqSXFbXts7');
  };

  return (
    <NavbarTwoColumns logo={<Logo xl />}>
      <li>
        <Button
          key="feedback"
          layout="link"
          size="large"
          onClick={handleOpenNewTab}
        >
          Give Feedback
        </Button>
      </li>
      <li>
        {user ? (
          <Button
            key="sign-out"
            layout="link"
            size="large"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            key="sign-in"
            layout="link"
            size="large"
            onClick={() => router.replace('/onboarding/sign-in')}
          >
            <a>Sign in</a>
          </Button>
        )}
      </li>
    </NavbarTwoColumns>
  );
}

export { LandingNavbar };
