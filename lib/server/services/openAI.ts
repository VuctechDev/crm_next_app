import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

const systemPrompt = `
Extract business information from a provided business card and format it into a JSON object. 
Correct any potential errors and fill in missing information from external sources if the data appears incomplete.

Required JSON Structure:

{
  "firstName": "",
  "lastName": "",
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
Provide phone code for the phone and mobile if not available and remove spaces.
Provide all informations in english.
Avoid adding dummy data.
Add country based on 
Ensure all fields are populated. Respect the 250 tokens max length. 
The output must strictly be a pure JSON object do not append any additional strings.`;

// Provide short description about the company, its achievements and something specific about it from the internet, max 100 words.

export const getDataFromPrompt = async (userPrompt: string) => {
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
  console.log("GPT PROMPT: ", content);

  return content;
};
