'use client'

import type { Message } from '@repo/types'
import * as React from 'react'
import { cn } from '../utils/cn'

interface ChatBubbleProps {
  message: Message
  isStreaming?: boolean
  onRegenerate?: () => void
  onCopy?: () => void
  className?: string
}

export function ChatBubble({
  message,
  isStreaming,
  onRegenerate,
  onCopy,
  className,
}: ChatBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('group flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row', className)}>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
          isUser ? 'bg-neutral-900 text-neutral-0' : 'bg-neutral-100 text-neutral-600',
        )}
      >
        {isUser ? 'U' : 'Y'}
      </div>

      <div className={cn('flex max-w-[80%] flex-col gap-1', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm',
            isUser
              ? 'bg-neutral-900 text-neutral-0 rounded-tr-sm'
              : 'bg-neutral-100 text-neutral-900 rounded-tl-sm',
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {isStreaming && (
            <span className="inline-block ml-1 animate-pulse">
              <span className="inline-block w-2 h-2 bg-current rounded-full" />
            </span>
          )}
        </div>

        {!isUser && !isStreaming && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {onCopy && (
              <button
                type="button"
                onClick={onCopy}
                className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                aria-label="Copy message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            )}
            {onRegenerate && (
              <button
                type="button"
                onClick={onRegenerate}
                className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                aria-label="Regenerate response"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 16h5v5" />
                </svg>
              </button>
            )}
          </div>
        )}

        <span className="text-xs text-neutral-400">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}
