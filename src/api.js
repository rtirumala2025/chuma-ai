export async function sendMessage(messages, language = "English") {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, language }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  
  // Return expected contract: { reply: "...", session_id: "..." }
  return { 
    reply: data.reply, 
    session_id: data.session_id 
  };
}