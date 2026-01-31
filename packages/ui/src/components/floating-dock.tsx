'use client'

import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { cn } from '../utils/cn'

export interface DockCommand {
  id: string
  label: string
  description?: string
  shortcut?: string
  icon?: React.ReactNode
  action: () => void | Promise<void>
}

interface FloatingDockProps {
  commands: DockCommand[]
  onCommandExecute?: (commandId: string) => void
}

export function FloatingDock({ commands, onCommandExecute }: FloatingDockProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dockRef = React.useRef<HTMLDivElement>(null)

  const filteredCommands = React.useMemo(() => {
    if (!search) return commands
    const lower = search.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lower) || cmd.description?.toLowerCase().includes(lower),
    )
  }, [commands, search])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        setOpen((prev) => !prev)
        setSearch('')
        setSelectedIndex(0)
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
        setSearch('')
        setSelectedIndex(0)
      }

      if (open) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          const selected = filteredCommands[selectedIndex]
          if (selected) {
            handleExecuteCommand(selected)
          }
        } else if (e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
          setSearch('')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filteredCommands, selectedIndex])

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleExecuteCommand = async (command: DockCommand) => {
    try {
      await command.action()
      onCommandExecute?.(command.id)
    } catch {
      // Command execution failed
    }
    setOpen(false)
    setSearch('')
    setSelectedIndex(0)
  }

  return (
    <>
      {!open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              'flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-0 px-4 py-2',
              'font-mono text-sm text-neutral-600 shadow-lg',
              'transition-all duration-200 hover:bg-neutral-50 hover:shadow-xl',
            )}
          >
            <span>Open Dock</span>
            <kbd className="rounded bg-neutral-100 px-2 py-0.5 text-xs">Cmd D</kbd>
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            <motion.div
              ref={dockRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed bottom-4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4"
            >
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-0 shadow-2xl">
                <div className="border-b border-neutral-100 p-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setSelectedIndex(0)
                    }}
                    placeholder="Search commands..."
                    className={cn(
                      'w-full bg-transparent font-mono text-base text-neutral-900',
                      'placeholder:text-neutral-400 focus:outline-none',
                    )}
                  />
                  <div className="mt-2 flex gap-3 text-xs text-neutral-400">
                    <span>
                      <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">up/down</kbd> navigate
                    </span>
                    <span>
                      <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">Enter</kbd> select
                    </span>
                    <span>
                      <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">Esc</kbd> close
                    </span>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                  {filteredCommands.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="font-mono text-sm text-neutral-500">No commands found</p>
                    </div>
                  ) : (
                    filteredCommands.map((command, idx) => (
                      <button
                        type="button"
                        key={command.id}
                        onClick={() => handleExecuteCommand(command)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-4 py-3',
                          'font-mono text-sm transition-colors duration-150',
                          idx === selectedIndex
                            ? 'bg-neutral-900 text-neutral-0'
                            : 'text-neutral-900 hover:bg-neutral-100',
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {command.icon && <span className="h-5 w-5">{command.icon}</span>}
                          <div className="text-left">
                            <div className="font-medium">{command.label}</div>
                            {command.description && (
                              <div
                                className={cn(
                                  'text-xs',
                                  idx === selectedIndex ? 'text-neutral-300' : 'text-neutral-500',
                                )}
                              >
                                {command.description}
                              </div>
                            )}
                          </div>
                        </div>
                        {command.shortcut && (
                          <kbd
                            className={cn(
                              'rounded px-2 py-1 text-xs',
                              idx === selectedIndex
                                ? 'bg-neutral-800 text-neutral-300'
                                : 'bg-neutral-100 text-neutral-500',
                            )}
                          >
                            {command.shortcut}
                          </kbd>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function useFloatingDock() {
  const [commands, setCommands] = React.useState<DockCommand[]>([])

  const addCommand = React.useCallback((command: DockCommand) => {
    setCommands((prev) => [...prev.filter((c) => c.id !== command.id), command])
  }, [])

  const removeCommand = React.useCallback((commandId: string) => {
    setCommands((prev) => prev.filter((c) => c.id !== commandId))
  }, [])

  const clearCommands = React.useCallback(() => {
    setCommands([])
  }, [])

  return { commands, addCommand, removeCommand, clearCommands }
}
