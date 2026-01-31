'use client'

import { ConversationSidebar } from '@/components/chat/conversation-sidebar'
import { useChat } from '@ai-sdk/react'
import type { Message } from '@repo/types'
import { Button, ChatBubble, FloatingDock, Textarea, useFloatingDock } from '@repo/ui'
import { useEffect, useRef, useState } from 'react'

export default function ChatPage() {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { commands, addCommand } = useFloatingDock()

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    api: 'http://localhost:3001/api/chat',
    body: { conversationId },
  })

  useEffect(() => {
    addCommand({
      id: 'new-chat',
      label: 'New Chat',
      description: 'Start a new conversation',
      shortcut: 'Cmd N',
      action: () => {
        setConversationId(null)
      },
    })
    addCommand({
      id: 'memory',
      label: 'Memory',
      description: 'View and manage memories',
      shortcut: 'Cmd M',
      action: () => {
        window.location.href = '/memory'
      },
    })
    addCommand({
      id: 'settings',
      label: 'Settings',
      description: 'Account and preferences',
      shortcut: 'Cmd ,',
      action: () => {
        window.location.href = '/settings'
      },
    })
  }, [addCommand])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  })

  const formattedMessages: Message[] = messages.map((msg, index) => ({
    id: msg.id || `msg-${index}`,
    userId: 'user_123',
    conversationId: conversationId || 'new',
    role: msg.role as 'user' | 'assistant' | 'system',
    content: msg.content,
    createdAt: new Date(),
  }))

  return (
    <div className="flex h-screen bg-neutral-0">
      <ConversationSidebar
        activeConversationId={conversationId}
        onSelectConversation={setConversationId}
      />

      <main className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-neutral-200 px-6">
          <h1 className="font-semibold text-neutral-900">
            {conversationId ? 'Conversation' : 'New Chat'}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {formattedMessages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-neutral-900">Welcome to YULA</h2>
                <p className="mt-2 text-neutral-500">
                  Start a conversation. I remember everything.
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-6">
              {formattedMessages.map((message, index) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  isStreaming={isLoading && index === formattedMessages.length - 1}
                  onCopy={() => navigator.clipboard.writeText(message.content)}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 p-4">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message YULA..."
                className="min-h-[52px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as unknown as React.FormEvent)
                  }
                }}
              />
              <Button type="submit" disabled={!input.trim() || isLoading} className="h-[52px]">
                Send
              </Button>
            </div>
          </form>
        </div>
      </main>

      <FloatingDock commands={commands} />
    </div>
  )
}
