export async function sendMessage(messages, language) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, language })
  });
  const data = await res.json();
  return data.reply;
}