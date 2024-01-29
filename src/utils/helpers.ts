import {
  OpenAICompletions,
  OpenAICompletionsPayload,
  sendMessageChatCompletions,
  OpenAiMessage,
  OpenAIMessageChatCompletionsPayload,
} from '@utils/OpenAIStream';

export const generateStory = async (prompt: string) => {
  // const chatCompletionspayload: OpenAIChatCompletionsPayload = {
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     {
  //       role: 'user',
  //       content: prompt,
  //     },
  //   ],
  //   temperature: 0.77,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: 3000,
  //   n: 1,
  // };

  const payload: OpenAICompletionsPayload = {
    model: 'gpt-3.5-turbo-instruct',
    prompt: prompt,
    temperature: 0.77,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
  };

  const story = await OpenAICompletions(payload);
  return story;
};

export const sendMessage = async (messages: OpenAiMessage[]) => {
  const payload: OpenAIMessageChatCompletionsPayload = {
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 1.5,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    max_tokens: 256,
  };

  const response = await sendMessageChatCompletions(payload);
  return response;
};
