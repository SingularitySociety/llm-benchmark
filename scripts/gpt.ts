import * as fs from 'fs';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { main } from "./common";

const gpt_token = process.env.GPT_API_KEY;

const configuration = new Configuration({
  apiKey: gpt_token,
});
const openai = new OpenAIApi(configuration);

export const ask = async (
  messages: ChatCompletionRequestMessage[],
  model = "gpt-3.5-turbo-0301"
) => {
  // console.log(messages, model);
  try {
    const response = await openai.createChatCompletion({
      model: model,
      messages,
      temperature: 0.6,
    });

    const answer = response.data.choices[0].message;
    return answer;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const gptChat = (modelType: string) => {
  return async (text: string) => {
    const messages: ChatCompletionRequestMessage[] = [];
    messages.push({
      role: "user",
      content: text
    });
    
    const answer = await ask(messages, modelType);
    const result = answer?.content || "";
    return result;
  };
};

const resultModelKey = "gpt35";
const gptChat35 = gptChat("gpt-3.5-turbo");

main(resultModelKey, gptChat35);

// const resultModelKey = "gpt4";
// const gptChat35 = gptChat("gpt-4");
// main(resultModelKey, gptChat35);
