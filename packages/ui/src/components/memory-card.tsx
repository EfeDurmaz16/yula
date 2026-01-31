'use client'

import type { Memory } from '@repo/types'
import * as React from 'react'
import { cn } from '../utils/cn'

interface MemoryCardProps {
  memory: Memory
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  className?: string
}

export function MemoryCard({ memory, onDelete, onEdit, className }: MemoryCardProps) {
  const sourceLabels: Record<string, string> = {
    import: 'Imported',
    conversation: 'From Chat',
    proactive: 'Auto-saved',
    tool: 'Tool Generated',
  }

  return (
    <div
      className={cn(
        'group relative rounded-xl border border-neutral-200 bg-neutral-0 p-4 transition-all duration-200 hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-neutral-900 line-clamp-3">{memory.content}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
              {sourceLabels[memory.source] || memory.source}
            </span>
            <span className="text-xs text-neutral-400">
              {new Date(memory.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(memory.id)}
              className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              aria-label="Edit memory"
            >
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(memory.id)}
              className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              aria-label="Delete memory"
            >
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
