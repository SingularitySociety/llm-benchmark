import * as fs from 'fs';

export const main = async (resultModelKey: string, chat: (text: string) => Promise<string>) => {
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

