import * as fs from 'fs';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const gpt_token = process.env.GPT_API_KEY;

const configuration = new Configuration({
  apiKey: gpt_token,
});
const openai = new OpenAIApi(configuration);

export const ask = async (
  messages: ChatCompletionRequestMessage[],
  model = "gpt-3.5-turbo-0301"
) => {
  console.log(messages, model);
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

const main = async (resultModelKey: string, chat: (text: string) => Promise<string>) => {
  const dataFile = __dirname + '/../data/data.json';
  const resultFile = __dirname + '/../results/data.json';
  
  const dataSet = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const resultDataSet = (() => {
    if (fs.existsSync(resultFile)) {
      return JSON.parse(fs.readFileSync(resultFile, 'utf8'));
    }
    return [];
  })();
  
  for await (const data of dataSet) {
    const text = data.text.en || data.text.ja;
    const result = await chat(text);
    const matchKey = Object.keys(resultDataSet).find((res: string) => resultDataSet[res].id === data.id);
    if (matchKey) {
      const tmp = resultDataSet[matchKey];
      tmp ["result"][resultModelKey] = result;
    } else {
      data["result"] = {};
      data["result"][resultModelKey] = result;
      resultDataSet.push(data);
    }
    
    fs.writeFileSync(resultFile,  JSON.stringify(resultDataSet, null, '    '));
    console.log(resultDataSet);
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

const resultModelKey = "gpt4";
const gptChat35 = gptChat("gpt-4");
main(resultModelKey, gptChat35);
