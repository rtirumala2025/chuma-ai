export async function sendMessage(messages, language) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, language })
  });
  
  if (!res.ok) {
    let errorMessage = `HTTP error! status: ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData.error) errorMessage = errorData.error;
    } catch (e) {
      // Ignore JSON parse error
    }
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data.reply || "I didn't receive a response.";
}

export async function translateMessage(text, targetLanguage) {
  if (targetLanguage === 'English') {
    // We could potentially avoid translation API if returning to English, but for robust handling or if the origin wasn't English, we might still want it. 
    // Usually 'English' is fine to translate back to.
  }
  
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLanguage })
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data.translated || text;
}