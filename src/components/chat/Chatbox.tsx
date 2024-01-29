import React, { useEffect, createRef, useState } from 'react';
import {
  query,
  where,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box } from '@chakra-ui/react';
import { Message } from '@types';

import { auth, db } from '../../../firebase';
import MessageComponent from './MessageComponent';
import SendMessage from './SendMessage';
import css from './Chatbox.module.css';

const ChatBox = ({
  celebrityName,
  userName,
}: {
  celebrityName: string;
  userName: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user] = useAuthState(auth);
  const scroll = createRef<HTMLSpanElement>();

  useEffect(() => {
    if (!user) return;

    const messageQuery = query(
      collection(db, 'messages'),
      where('currentUserUid', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(messageQuery, (QuerySnapshot) => {
      const fetchedMessages: any = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a: any, b: any) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <Box
      margin="0px"
      color="white"
      className="celebrity-box"
      rounded="md"
      backgroundImage="/celebrity-pool-party.jpg"
    >
      <main className={css.chatBox}>
        <div className={css.messagesWrapper}>
          {messages?.map((message: Message) => (
            <MessageComponent key={message.createdAt} message={message} />
          ))}
          {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
          {scroll && <span ref={scroll}></span>}
        </div>
        <SendMessage
          scroll={scroll}
          messages={messages}
          celebrityName={celebrityName}
          userName={userName}
        />
      </main>
    </Box>
  );
};

export default ChatBox;
