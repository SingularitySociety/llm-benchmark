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

const main = async () => {
  const dataSet = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf8'));

  const ret = [];
  for await (const data of dataSet) {
    const messages: ChatCompletionRequestMessage[] = [];
    messages.push({
      role: "user",
      content: data.text.en || data.text.ja,
    });
    
    const answer = await ask(messages, "gpt-3.5-turbo");
    const result = answer?.content || "";

    data["result"] = data["result"] || {};
    data["result"]["gpt35"] = result;

    ret.push(data);

    fs.writeFileSync(__dirname + '/../results/data.json',  JSON.stringify(ret, null, '    '));

    console.log(ret);
  }
};

main();
