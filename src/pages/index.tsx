import { useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Spinner } from '@chakra-ui/react';
import { Footer, Header, CelebritySelection } from '@components';
import ChatBox from '@components/chat/Chatbox';
import { auth } from '../../firebase';

const CelebritySelectPage = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [isEntered, setIsEntered] = useState(false);

  const onClickHandler = () => {
    setIsEntered(true);
    anonymousSignIn();
  };

  const anonymousSignIn = async () => {
    await signInAnonymously(auth);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="main-page">
      <Header />
      <main className="main-content">
        {loading ? (
          <Box margin="0px" color="white" className="horror-box" rounded="md">
            <div className="spinner">
              <Spinner size={'xl'} />
            </div>
          </Box>
        ) : isEntered ? (
          <ChatBox celebrityName={name} />
        ) : (
          <CelebritySelection
            onClick={onClickHandler}
            setName={setName}
            celebrityName={name}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CelebritySelectPage;
