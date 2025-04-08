import React from 'react';

import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/index';
import { Background } from '../background/Background';
import { Section } from '../layout/Section';
import { HomeNavbar } from './home/HomeNavbar';

function AuthenticatedPage(props: any) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <div>Loading...</div>;
  if (error) router.replace('/onboarding/sign-in');
  else if (!user) router.replace('/onboarding/sign-in');

  return (
    <Background className="h-screen w-screen antialiased bg-pattern-randomized">
      <Section yPadding="py-6">
        <HomeNavbar />
      </Section>
      <Section yPadding="py-2">{props.children}</Section>
    </Background>
  );
}

export default AuthenticatedPage;
