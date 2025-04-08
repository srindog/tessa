import React from 'react';

import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';

import { signOut } from '../../../firebase/auth';
import { Logo } from '../../logo/Logo';
import { NavbarTwoColumns } from '../../navigation/NavbarTwoColumns';

const pages = ['Feed', 'Recommendations', 'Profile'];

function HomeNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.replace('/');
  };

  const handlePageChange = (page: any) => {
    router.replace(`/home/${page.toLowerCase()}`);
  };

  const handleOpenNewTab = () => {
    window.open('https://forms.gle/FQV5EahiqSXFbXts7');
  };

  return (
    <NavbarTwoColumns logo={<Logo xl />}>
      {pages.map((page) => {
        return (
          <li key={page}>
            <Button
              key={page}
              layout="link"
              size="large"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          </li>
        );
      })}
      <li>
        <Button layout="link" size="large" onClick={handleOpenNewTab}>
          Give Feedback
        </Button>
      </li>

      <li>
        <Button
          key="sign-out"
          layout="link"
          size="large"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </li>
    </NavbarTwoColumns>
  );
}

export { HomeNavbar };
