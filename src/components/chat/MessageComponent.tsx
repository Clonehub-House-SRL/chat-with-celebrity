import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import { Message } from 'src/types';
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
      <Image
        className={css.chatBubble__left}
        src={message.avatar}
        alt="user avatar"
        width={35}
        height={35}
      />
      <div className={css.chatBubble__right}>
        <p className={css.userName}>{message.name}</p>
        <p className={css.userMessage}>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageComponent;
