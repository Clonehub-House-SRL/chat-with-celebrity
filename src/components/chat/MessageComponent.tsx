import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import Avatar from 'react-avatar';
import { Message } from '@types';

import { auth } from '../../../firebase';
import css from './MessageComponent.module.css';

type MessageComponentProps = {
  message: Message;
};

const MessageComponent = ({ message }: MessageComponentProps) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`${css.chatBubble} ${
        message.uid === user?.uid ? css.right : ''
      }`}
    >
      <Avatar name={message.name} className={css.chatBubble__left} size="35" />
      <div className={css.chatBubble__right}>
        <p className={css.userName}>{message.name}</p>
        <p className={css.userMessage}>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageComponent;
