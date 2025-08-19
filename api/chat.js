import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { message } = req.body;
  if (!message) {
    res.status(400).send({ message: "Message is required" });
    return;
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
