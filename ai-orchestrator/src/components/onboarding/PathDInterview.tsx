'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { Spinner } from '@/components/ui/Spinner';

const INTERVIEW_QUESTIONS = [
  "What does your company sell, and who is your best customer?",
  "What problem do you solve that nobody else does well?",
  "When a deal closes fast, what's usually true about the buyer?",
  "What's the most common objection you hear, and how do you handle it?",
  "What's one thing you wish every prospect knew before talking to you?",
];

interface Message {
  role: 'ai' | 'user';
  content: string;
}

interface PathDInterviewProps {
  onComplete: () => void;
}

export function PathDInterview({ onComplete }: PathDInterviewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const addAiMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: 'ai', content }]);
  };

  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addAiMessage(INTERVIEW_QUESTIONS[0]);
    }, 800);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);

    const nextQ = currentQ + 1;
    if (nextQ < INTERVIEW_QUESTIONS.length) {
      setCurrentQ(nextQ);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addAiMessage(INTERVIEW_QUESTIONS[nextQ]);
      }, 1000);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addAiMessage("That's everything I need. Give me a moment to build your business profile...");
        setTimeout(() => {
          setDone(true);
          onComplete();
        }, 1500);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-72">
      <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-sand-50 rounded-md border border-sand-200">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'max-w-[85%] rounded-md px-3 py-2 text-sm',
              msg.role === 'ai'
                ? 'bg-white border border-sand-200 text-sand-800 mr-auto'
                : 'bg-primary-700 text-white ml-auto'
            )}
          >
            {msg.content}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 bg-white border border-sand-200 rounded-md px-3 py-2 w-fit">
            <Spinner size="sm" />
            <span className="text-sm text-sand-400">AI is thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!done && (
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your answer..."
            disabled={isTyping}
            className="flex-1 text-sm border border-sand-200 rounded-sm px-3 py-2 focus:border-primary-700 outline-none disabled:bg-sand-50 disabled:text-sand-400"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-primary-700 text-white text-sm rounded-sm disabled:opacity-40 hover:bg-primary-800 transition-colors"
          >
            Send
          </button>
        </div>
      )}

      {done && (
        <div className="mt-3 text-center text-sm text-green-600 font-medium">
          ✓ Interview complete — your business profile has been built
        </div>
      )}
    </div>
  );
}
