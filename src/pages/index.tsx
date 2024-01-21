import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Spinner } from '@chakra-ui/react';
import { Footer, Header, CelebritySelection } from '@components';
import ChatBox from '@components/chat/Chatbox';
// import { auth } from '../../firebase';

export type StoryProps = {
  story: string;
};

const CelebritySelectPage = ({ story }: StoryProps) => {
  // const [user, loading] = useAuthState(auth);

  return (
    <div className="horror-page">
      <Header />
      <main className="horror-content">
        {false ? (
          <Box
            margin="0px"
            color="white"
            backgroundImage="/header-image-halloween.jpg"
            className="horror-box"
            rounded="md"
          >
            <div className="spinner">
              <Spinner size={'xl'} />
            </div>
          </Box>
        ) : (
          <CelebritySelection story={story} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CelebritySelectPage;
