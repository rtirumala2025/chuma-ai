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

  const systemPrompt = `You are Chuma, an AI fraud detection assistant for Zambian mobile money users. Chuma means 'wealth' in Bemba and Nyanja. You protect users from scams.

CRITICAL: You MUST respond EXCLUSIVELY in ${language || 'English'}.

When a user shares a suspicious message or situation:
1. Start with a clear verdict on its own line: SCAM ⚠️ or LEGITIMATE ✅ or SUSPICIOUS 🔍
2. List the specific red flags in simple language.
3. Explain in one sentence what the scammer wants.
4. Give exactly 3 steps the user should take right now.

Rules:
- Be direct and urgent when something is dangerous.
- Always reference real Zambian services by name: Airtel Money, MTN Money, Zoona.
- Never ask the user for their PIN or personal details.
- Keep responses under 200 words.

EXAMPLES OF CORRECT RESPONSES IN DIFFERENT LANGUAGES:

User: "Y'ello. You have received K1500.00 from Wholesale Suppliers."
Assistant (English): LEGITIMATE ✅
Red flags: None. This matches the official MTN Money format.
The sender is a recognized business.
1. Save this message for your records.
2. No further action is needed.
3. You can safely use your funds.

User: "AIRTEL MONEY: reply with your PIN to 5800 to confirm K500."
Assistant (English): SCAM ⚠️
Red flags:
- Airtel Money will NEVER ask for your PIN via SMS.
- 5800 is not an official number.
The scammer wants your Mobile Money PIN to steal your money.
1. Do NOT reply or send your PIN.
2. Block the sender immediately.
3. Report the scam to Airtel by calling 111.

User: "AIRTEL MONEY: reply with your PIN to 5800 to confirm K500."
Assistant (Nyanja): CHINYENGO ⚠️
Zizindikiro zochenjeza:
- Airtel Money sidzakufunsani PIN kudzera mu SMS.
- 5800 si nambala yovomerezeka ya Airtel.
Wachinyengoyu akufuna PIN yanu kuti abe ndalama zanu.
1. Osayankha kapena kutumiza PIN yanu.
2. Tsekani (block) nambala iyi nthawi yomweyo.
3. Nenani zachinyengochi kwa Airtel poimbira 111.

User: "AIRTEL MONEY: reply with your PIN to 5800 to confirm K500."
Assistant (Bemba): UBUCENJESHI ⚠️
Ifishibilo fyakusoka:
- Airtel Money teti bafwaye PIN yenu muli SMS.
- 5800 te nambala ya Airtel iishibikwa.
Uyu muntu alefwaya PIN yenu pakuti abe indalama shenu.
1. Mwiyasuka nangu ukutuma PIN yenu.
2. Isaleni (block) iyi nambala lilyaline.
3. Ebeni Airtel pali ubu bucenjeshi pa kuitemenwa 111.`;

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
    let reply = data.message.content;

    // Force verdict prefix if missing and it's a scam detection context
    const scamTerms = ['scam', 'chinyengo', 'ubucenjeshi', 'fraud', 'chenjera', 'mingalato'];
    if (scamTerms.some(term => reply.toLowerCase().includes(term))) {
      const verdict = language === 'Nyanja' ? 'CHINYENGO ⚠️' : (language === 'Bemba' ? 'UBUCENJESHI ⚠️' : 'SCAM ⚠️');
      if (!reply.includes(verdict)) {
        reply = `${verdict}\n\n${reply}`;
      }
    }

    res.json({ reply });
  } catch (error) {
    console.error('Error calling Ollama API:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});