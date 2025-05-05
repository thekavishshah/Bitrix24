"use client";

import { useChat } from "@ai-sdk/react";
import { Weather } from "@/components/generative-ui/weather";
import React from "react";
import { Stock } from "@/components/generative-ui/stock";

const ResearchChat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id}>
            <div>{message.role === "user" ? "User: " : "AI: "}</div>
            <div>{message.content}</div>
            <div>
              {message.toolInvocations?.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                  if (toolName === "displayWeather") {
                    const { result } = toolInvocation;
                    return (
                      <div key={toolCallId}>
                        <Weather {...result} />
                      </div>
                    );
                  } else if (toolName === "getStockPrice") {
                    const { result } = toolInvocation;
                    return (
                      <div key={toolCallId}>
                        <Stock {...result} />
                      </div>
                    );
                  }
                } else {
                  return (
                    <div key={toolCallId}>
                      {toolName === "displayWeather" ? (
                        <div>Loading weather...</div>
                      ) : toolName === "getStockPrice" ? (
                        <div>Loading stock price...</div>
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>

      </div>
    </div>
  );
};

export default ResearchChat;
