import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Text and targetLanguage are required' });
  }

  const prompt = `Translate the following text into ${targetLanguage}. Maintain all markdown formatting, tables, amounts (K), and structure exactly. ONLY output the translated text, do not add any conversational filler or 'Here is the translation'.\n\nText to translate:\n${text}`;

  try {
    const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:3b',
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ translated: data.message.content.trim() });
  } catch (error) {
    console.error('Error calling Ollama API for translation:', error);
    res.status(500).json({ error: 'Failed to translate message' });
  }
});


app.post('/api/chat', async (req, res) => {
  const { messages, language } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  let tableTemplate = `| Metric | Value |
|---|---|
| Total Income | K... |
| Total Spending | K... |
| Top Category | ... |
| Savings Rate | ...% |`;

  if (language === 'Nyanja') {
    tableTemplate = `| Ndondomeko | Mtengo |
|---|---|
| Ndalama Zopeza | K... |
| Ndalama Zogwiritsidwa | K... |
| Zomwe mwagwiritsa ntchito kwambiri | ... |
| Mlingo Wosunga | ...% |`;
  } else if (language === 'Bemba') {
    tableTemplate = `| Ifipimo | Umutengo |
|---|---|
| Indalama Shingila | K... |
| Indalama Shipoosa | K... |
| Ifyapoosweko Sana | ... |
| Icipimo ca Kusunga | ...% |`;
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
- CRITICAL MATH RULES (Follow step-by-step):
  Step 1. Find all "Received" transactions (or "Mwapokela", "Mwalandila" in local languages) and sum them. This is Total Income.
  Step 2. Find all transactions sent to "Savings Wallet", "Savings deposit", or anything with "Savings" (or "Mwasunga" in local languages). Sum them. This is Total Savings.
  Step 3. Find all other "Sent" or "Paid" transactions (or "Mwatumiza", "Mwalipira", "Mwatuma", "Mwalipila" in local languages) (Water, ZESCO, Airtime, Groceries, Rent, School). Sum them. This is Total Spending.
  Step 4. Calculate Savings Rate = (Total Savings / Total Income) * 100.
- ADVICE RULES:
  * IF Savings Rate is 20% or higher: You MUST start your insights with high praise. Explicitly call them a "financial superstar" or "above-average saver". Absolutely DO NOT tell them to save more or increase income; instead, suggest advanced options like long-term investments.
  * IF Savings Rate is below 20%: Provide constructive advice on reducing spending or increasing income.
- ALWAYS present these calculated results in a strict Markdown table exactly following this template:
${tableTemplate}
- Keep your entire response EXTREMELY concise. After the table, provide a maximum of 2 short, bulleted actionable insights
- Never write long paragraphs of text
- Never claim to be a licensed financial advisor
- CRITICAL OUTPUT RULE: You MUST translate your ENTIRE final response, including all advice and bulleted actionable insights, strictly into ${language || 'English'}. Do not output English text if the language is Nyanja or Bemba.`;

  try {
    const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:3b',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        stream: false,
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ reply: data.message.content });
  } catch (error) {
    console.error('Error calling Ollama API:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});