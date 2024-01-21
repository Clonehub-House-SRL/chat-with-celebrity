import React from 'react';
import { Button } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInAnonymously } from 'firebase/auth';

import { auth } from '../../firebase';

const Header = () => {
  // const [user] = useAuthState(auth);

  const anonymousSignIn = async () => {
    // await signInAnonymously(auth);
  };

  const headerTitle = '';
  // `Welcome to your daily horror story` + (user?.uid ? ' - chat' : '');

  const signOut = () => {
    // auth.signOut();
  };

  return (
    <header className="horror-header">
      <h1 className="horror-title">{headerTitle}</h1>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="squiggly-0">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="0"
              />
              <feDisplacementMap
                id="displacement"
                in="SourceGraphic"
                in2="noise"
                scale="6"
              />
            </filter>
            <filter id="squiggly-1">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="1"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            </filter>
          </defs>
        </svg>
      </div>
      {/* {user ? (
        <Button
          onClick={signOut}
          className="sign-out"
          colorScheme="red"
          color={'#fff'}
          variant={'outline'}
        >
          Get Out
        </Button>
      ) : (
        <Button
          className="sign-in"
          onClick={anonymousSignIn}
          colorScheme="red"
          color={'#fff'}
          variant={'outline'}
        >
          Chat
        </Button>
      )} */}
    </header>
  );
};

export default Header;
