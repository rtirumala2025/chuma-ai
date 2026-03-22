import React, { useState } from 'react';
import LanguageToggle from './components/LanguageToggle';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { sendMessage } from './api';
import { BWALYA_TRANSACTIONS } from './sampleData';

function App() {
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text) => {
    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const reply = await sendMessage(newMessages, language);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    return BWALYA_TRANSACTIONS;
  };

  return (
    <div className="flex flex-col h-screen w-full sm:max-w-md sm:mx-auto bg-white sm:shadow-2xl overflow-hidden sm:border-x sm:border-gray-200">
      <div className="bg-[#16A34A] text-white p-4 text-center font-bold text-xl shadow-md z-20 flex items-center justify-center space-x-2">
        <span>Chuma AI</span>
        <span>🇿🇲</span>
      </div>
      <LanguageToggle language={language} onLanguageChange={setLanguage} />
      <ChatWindow messages={messages} />
      <InputBar onSend={handleSend} isLoading={isLoading} onLoadSampleData={loadSampleData} />
    </div>
  );
}

export default App;