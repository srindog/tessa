import React from 'react';

import { Background } from '../../background/Background';
import { Section } from '../../layout/Section';
import { Footer } from './Footer';
import { LandingHeading } from './LandingHeading';
import { LandingNavbar } from './LandingNavbar';
import { OnboardingButton } from './OnboardingButton';

function Landing() {
  return (
    <Background className="bg-pattern-randomized h-screen w-screen">
      <Section yPadding="py-6">
        <LandingNavbar />
      </Section>
      <Section yPadding="pt-10">
        <LandingHeading />
      </Section>
      <Section>
        <OnboardingButton />
      </Section>
      <Section>
        <Footer />
      </Section>
    </Background>
  );
}

export { Landing };
