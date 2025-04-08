import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase';
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
} from '../../../firebase/auth';
import { Background } from '../../background/Background';
import { Section } from '../../layout/Section';
import { LandingNavbar } from '../landing/LandingNavbar';

function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSignIn = async () => {
    if (!email) {
      setInputError('Please enter an email');
      return;
    }
    if (!password) {
      setInputError('Please enter a password');
      return;
    }
    await loginWithEmailAndPassword(email, password).catch((e) =>
      setInputError(e.message)
    );
  };
  const handleGoogleSignIn = async () => {
    await loginWithGoogle().catch((e) => setInputError(e.message));
  };

  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.uid}`)
        .then(async (res) => {
          if (res.ok) {
            const { userData: newUserData }: any = await res.json();
            if (!newUserData.onboarded) {
              router.replace('/onboarding/interests-survey');
            } else {
              router.replace('/home/feed');
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

  if (error) return <p>{error}</p>;
  if (userError) return <p>{userError}</p>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="antialiased text-gray-900">
      <Background className="h-screen w-screen bg-pattern-randomized">
        <Section yPadding="py-6">
          <LandingNavbar />
        </Section>
        <Section yPadding="py-10">
          <div className="flex items-center justify-center">
            <div className="flex flex-col text-center p-30">
              <input
                type="text"
                className="p-5 text-base mb-5 border rounded-lg border-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
              <input
                type="password"
                className={`p-5 text-base border rounded-lg border-gray-400 ${
                  inputError ? 'mb-1' : 'mb-5'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {inputError && (
                <span className="text-red-500 mb-4">{inputError}</span>
              )}
              <button
                className="p-3 text-lg mb-5 text-white rounded-lg bg-black outline-1"
                onClick={handleSignIn}
              >
                Sign In
              </button>
              <button
                className="p-3 text-lg mb-5 text-white rounded-lg bg-blue-600 border-solid"
                onClick={handleGoogleSignIn}
              >
                Sign In with Google
              </button>
              <div className="text-lg mb-1">
                <Link href="/onboarding/reset-password">Forgot Password</Link>
              </div>
              <div className="text-lg">
                Don{"'"}t have an account?{' '}
                <Link href="/onboarding/sign-up">Register now</Link>.
              </div>
            </div>
          </div>
        </Section>
      </Background>
    </div>
  );
}

export default SignIn;
