import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { sendMessage } from '@utils/helpers';
import { OpenAiMessage } from '@utils/OpenAIStream';
import { Message } from '@types';

import { auth, db } from '../../../firebase';
import css from './SendMessage.module.css';

type SendMessageProps = {
  scroll: React.RefObject<HTMLSpanElement>;
  messages: Message[];
  celebrityName: string;
};

type OpenAiUser = {
  name: string;
  photoUrl: string;
  uid: string;
};

const SendMessage = ({ scroll, messages, celebrityName }: SendMessageProps) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef() as React.RefObject<HTMLButtonElement>;

  const systemUser: OpenAiUser = {
    name: celebrityName,
    photoUrl: process.env.NEXT_PUBLIC_FIREBASE_OPENAI_PHOTO_URL ?? '',
    uid: process.env.NEXT_PUBLIC_FIREBASE_OPENAI_USERID ?? '',
  };

  useEffect(() => {
    scroll.current?.scrollIntoView();
  }, [scroll]);

  const sendUserMessage = async (event: any) => {
    event.preventDefault();
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }

    if (!auth.currentUser) return;
    setIsLoading(true);
    const { uid } = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: 'You',
      avatar: '/anon_user_avatar.jpg',
      createdAt: serverTimestamp(),
      currentUserUid: auth.currentUser.uid,
      role: 'user',
      uid,
    });

    scroll.current?.scrollIntoView({ behavior: 'smooth' });

    await sendOpenAIResponseMessage(message);

    scroll.current?.scrollIntoView({ behavior: 'smooth' });
    setMessage('');
    setIsLoading(false);
  };

  const sendOpenAIResponseMessage = async (messageForReply: string) => {
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }

    const prevMessages = messages.map((message) => {
      return { content: message.text, role: message.role };
    });

    const messageWithHistory: OpenAiMessage[] = [
      {
        content: `Impersonate ${celebrityName} that will discuss any topic in a very casual manner.`,
        role: 'system',
      },
      ...prevMessages,
      { content: messageForReply, role: 'user' },
    ];

    const reply = await sendMessage(messageWithHistory);

    await addDoc(collection(db, 'messages'), {
      text: reply,
      name: systemUser.name,
      avatar: systemUser.photoUrl,
      createdAt: serverTimestamp(),
      uid: systemUser.uid,
      currentUserUid: auth.currentUser?.uid,
      role: 'system',
    });
  };

  const signOut = () => {
    auth.signOut();
    onClose();
  };

  return (
    <form
      onSubmit={(event) => sendUserMessage(event)}
      className={css.sendMessage}
    >
      <div className={css.messageContainer}>
        {isLoading && <span>Violet is typing ...</span>}
        <div className={css.messageInput}>
          <label htmlFor="messageInput" hidden>
            Enter Message
          </label>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className={css.sendButton}
            colorScheme="whiteAlpha"
          >
            Send
          </Button>
          <Button
            colorScheme="blackAlpha"
            className={css.sendButton}
            onClick={onOpen}
          >
            Exit
          </Button>
        </div>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Really exit?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>All message history will be lost.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={signOut}>
                Exit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
};

export default SendMessage;
