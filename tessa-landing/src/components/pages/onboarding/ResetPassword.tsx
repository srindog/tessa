import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import validator from 'validator';

import { sendPwrdResetEmail } from '../../../firebase/auth';
import { Background } from '../../background/Background';
import { Section } from '../../layout/Section';
import { LandingNavbar } from '../landing/LandingNavbar';

function ResetPassword() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [sentEmail, setSentEmail] = useState(false);

  const [inputError, setInputError] = useState('');

  const isValidEmail = validator.isEmail(email);

  const sendResetEmail = async () => {
    await sendPwrdResetEmail(email).catch((error) =>
      setInputError(error.message)
    );
    setSentEmail(true);
  };

  return (
    <div className="antialiased text-gray-900">
      <Background className="h-screen w-screen bg-pattern-randomized">
        <Section yPadding="py-6">
          <LandingNavbar />
        </Section>
        <Section yPadding="py-10">
          <div className="flex items-center justify-center">
            <div className="flex flex-col text-center p-30">
              <div className="flex flex-col mb-3">
                <input
                  type="email"
                  className="p-3 text-base border rounded-lg border-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail Address"
                />
                {!isValidEmail && (
                  <span className="text-red-500">
                    Please enter a valid email
                  </span>
                )}
                {inputError && (
                  <span className="text-red-500">{inputError}</span>
                )}
              </div>
              <button
                className="p-3 text-lg ml-1 mb-4 text-white rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"
                onClick={sendResetEmail}
                disabled={!isValidEmail}
              >
                {sentEmail ? 'Resend Email' : 'Send password reset email'}
              </button>
              {sentEmail && (
                <button
                  className="p-3 text-lg ml-1 mb-5 text-white rounded-lg bg-blue-600"
                  onClick={() => router.replace('/onboarding/sign-in')}
                >
                  Back to Login
                </button>
              )}
              <div className="pl-1 text-lg mb-2">
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

export default ResetPassword;
