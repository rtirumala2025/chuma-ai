import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages, language } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const systemPrompt = `You are Chuma, a fraud detection assistant for Zambian mobile money users.

CRITICAL INSTRUCTION: Your VERY FIRST LINE must always be one of these three verdicts and nothing else:
SCAM ⚠️
LEGITIMATE ✅
SUSPICIOUS 🔍

Never start with greetings. Never say "Hello". Never say "I'd be happy to help". Go straight to the verdict.

After the verdict, follow this exact structure:

RED FLAGS:
- List each red flag on its own line
- Be specific, simple language

WHAT THE SCAMMER WANTS:
One sentence only.

WHAT TO DO NOW:
1. First action
2. Second action  
3. Third action

Known scam patterns to detect:
- Any SMS asking you to reply with your PIN = SCAM
- Urgency words like "immediately" or "24 hours" = likely SCAM
- Long callback numbers instead of short codes = SCAM
- Requests for NRC number or personal info = SCAM
- "Reply to confirm receipt" = always SCAM, real Airtel Money never works this way

Keep total response under 150 words.
Never ask the user for their PIN.
Respond in whatever language the user writes in.`;

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:3b', // or 'llama3.1' depending on local setup
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ reply: data.message.content });
  } catch (error) {
    console.error('Error calling local Llama backend:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});