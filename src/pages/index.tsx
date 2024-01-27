import { useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Spinner } from '@chakra-ui/react';
import { Footer, Header, CelebritySelection } from '@components';
import ChatBox from '@components/chat/Chatbox';
import { auth } from '../../firebase';
import css from './index.module.css';

const CelebritySelectPage = () => {
  const [user, loading] = useAuthState(auth);
  const [celebrityName, setCelebrityName] = useState('');
  const [userName, setUserName] = useState('');
  const [isEntered, setIsEntered] = useState(false);

  const onClickHandler = () => {
    setIsEntered(true);
    anonymousSignIn();
  };

  const anonymousSignIn = async () => {
    await signInAnonymously(auth);
  };

  return (
    <div className={css.mainPage}>
      <Header />
      <main className={css.mainContent}>
        {loading ? (
          <Box
            margin="0px"
            color="white"
            className="celebrity-box"
            rounded="md"
          >
            <div className="spinner">
              <Spinner size={'xl'} />
            </div>
          </Box>
        ) : isEntered || user ? (
          <ChatBox celebrityName={celebrityName} userName={userName} />
        ) : (
          <CelebritySelection
            onClick={onClickHandler}
            setCelebrityName={setCelebrityName}
            celebrityName={celebrityName}
            setUserName={setUserName}
            userName={userName}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CelebritySelectPage;
