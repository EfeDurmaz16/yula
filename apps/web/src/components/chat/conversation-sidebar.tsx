'use client'

import type { Conversation } from '@repo/types'
import { Button } from '@repo/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ConversationSidebarProps {
  activeConversationId: string | null
  onSelectConversation: (id: string | null) => void
}

export function ConversationSidebar({
  activeConversationId,
  onSelectConversation,
}: ConversationSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/conversations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setConversations(data.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    onSelectConversation(null)
  }

  return (
    <aside className="flex w-64 flex-col border-r border-neutral-200 bg-neutral-50">
      <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
        <Link href="/" className="text-lg font-bold text-neutral-900">
          YULA
        </Link>
      </div>

      <div className="p-3">
        <Button variant="secondary" className="w-full justify-start gap-2" onClick={handleNewChat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-lg bg-neutral-200" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <p className="px-3 py-2 text-sm text-neutral-500">No conversations yet</p>
        ) : (
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <button
                type="button"
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeConversationId === conversation.id
                    ? 'bg-neutral-200 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span className="line-clamp-1">{conversation.title}</span>
                <span className="text-xs text-neutral-400">
                  {conversation.messageCount} messages
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 p-3">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  )
}
