import React, { useEffect } from 'react';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { StoryProps } from '../pages';

const CelebritySelection = ({ story }: StoryProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    onToggle();
    const toaster = toast({
      containerStyle: {
        fontFamily: 'Amatic SC, sans-serif',
        fontSize: '20px',
        fontWeight: 800,
      },
      status: 'success',
      description: 'Login to chat with a ghost!',
      duration: null,
      isClosable: true,
    });

    return () => toast.close(toaster);
  }, [toast]);

  return (
    <Box
      margin="0px"
      color="white"
      backgroundImage="/header-image-halloween.jpg"
      className="horror-box"
      rounded="md"
    >
      <Collapse in={isOpen} animateOpacity className="horror-story-container">
        <Box
          p="40px"
          color="white"
          mt="4"
          mb="4"
          bgGradient="linear(to-t, green.500, rgba(35, 78, 82, .7))"
          rounded="md"
          shadow="md"
        >
          {story}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CelebritySelection;
