import React, { useEffect, useRef, useState } from 'react';
import {
  query,
  where,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { Box } from '@chakra-ui/react';
import { auth, db } from '../../../firebase';
import MessageComponent from './MessageComponent';
import SendMessage from './SendMessage';
import { Message } from 'src/types';
import css from './Chatbox.module.css';

const ChatBox = ({ celebrityName }: { celebrityName: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const messageQuery = query(
      collection(db, 'messages'),
      where('currentUserUid', '==', auth.currentUser.uid),
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
  }, []);

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
        />
      </main>
    </Box>
  );
};

export default ChatBox;
