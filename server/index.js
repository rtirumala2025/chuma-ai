import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const { messages, language } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const systemPrompt = `You are Chuma, a friendly and knowledgeable financial coach for Zambian mobile money users. Chuma means 'wealth' in Bemba and Nyanja.

Your role:
- Analyze mobile money transaction history (MTN Money, Airtel Money, Zoona)
- Give specific, actionable financial advice using exact amounts from the data
- Help users understand if they are ready for a microloan from Lupiya or Union54
- Respond in ${language || 'English'} at all times

Rules:
- Always use Zambian Kwacha (K) for amounts
- Reference real Zambian services: MTN Money, Airtel Money, Lupiya, Union54, Zoona
- Be warm and encouraging, never condescending
- Give maximum 3 key insights per response — do not overwhelm
- When analyzing transactions, always calculate: total income, total spending, top spending category, and savings rate
- For loan readiness, score the user on 5 criteria: regular income, low airtime spending (<20% of income), savings history, repayment behavior, transaction consistency
- Never claim to be a licensed financial advisor`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    });

    res.json({ reply: response.content[0].text });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});