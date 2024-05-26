import OpenAI from "openai";
// import { addItem } from '../db/local'

const openai = new OpenAI({
  apiKey: "sk-proj-zpagy1xEBQD9x2eMb47iT3BlbkFJ0V8VToWqn26c5tVWWnIp", // This is the default and can be omitted
});

const systemPrompt = `
Extract business information from a provided business card and format it into a JSON object. 
Correct any potential errors and fill in missing information from external sources if the data appears incomplete.

Required JSON Structure:

{
  "name": "",
  "role" : "",
  "company": "",
  "email": "",
  "phone": "",
  "mobile": "",
  "website": "",
  "address": "",
  "postCode": "",
  "city": "",
  "country": "", 
  "industry": "",
  "employees": ""
}

Instructions:
Employees should be the range of the employees in company.
Provide phone code for the phone nad mobile if not available and remove spaces.
Provide all informations in english.
Ensure all fields are populated. Respect the 250 tokens max length. 
The output must strictly be a pure JSON object do not append any additional strings.`;

const systemPrompt2 = `
Extract business information from a provided link https://www.linkedin.com/in/nemanja-vucic-a8079817a and format it into a JSON object. 
Correct any potential errors and fill in missing information from external sources if the data appears incomplete.

Required JSON Structure:

{
  "name": "",
  "role" : "",
  "company": "",
  "industry": "",
  "email": "",
  "phone": "",
  "mobile": "",
  "website": "",
  "address": "",
  "postCode": "",
  "city": "",
  "country": "", 
  "employees": ""
}

Instructions:
Employees should be the range of the employees in company.
Provide phone code for the phone nad mobile if not available and remove spaces.
Provide all informations in english.
Ensure all fields are populated. Respect the 250 tokens max length. 
The output must strictly be a pure JSON object do not append any additional strings.`;

const ere = `if data is missing from the card, infer it based on the available information.
Correct formatting errors in emails or websites (e.g., missing periods or incorrect domain suffixes).
The output must strictly be a JSON object with the information formatted as shown above. `;

export const getDataFromPrompt = async (userPrompt: string, _id: string) => {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.2,
    model: "gpt-4o",
    max_tokens: 250,
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params);

  const content = chatCompletion.choices[0]?.message.content;
  console.log("PROMPT: ", content);

  return content;
};
