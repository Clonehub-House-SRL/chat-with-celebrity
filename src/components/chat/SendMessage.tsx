import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { sendMessage } from '@utils/helpers';
import { auth, db } from '../../../firebase';
import { Message } from 'src/types';
import { OpenAiMessage } from '@utils/OpenAIStream';

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
  const systemUser: OpenAiUser = {
    name: celebrityName,
    photoUrl: process.env.NEXT_PUBLIC_FIREBASE_OPENAI_PHOTO_URL ?? '',
    uid: process.env.NEXT_PUBLIC_FIREBASE_OPENAI_USERID ?? '',
  };

  useEffect(() => {
    scroll.current?.scrollIntoView();
  }, [scroll.current]);

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

    console.log(
      'Printing content',
      `Impersonate ${celebrityName} that will discuss any topic in a very casual manner.`
    );

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

  return (
    <form onSubmit={(event) => sendUserMessage(event)} className="send-message">
      <div className="message-container">
        {isLoading && <span>Violet is typing ...</span>}
        <div className="message-input">
          <label htmlFor="messageInput" hidden>
            Enter Message
          </label>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
