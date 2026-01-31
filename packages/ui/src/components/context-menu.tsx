'use client'

import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { cn } from '../utils/cn'

export interface ContextMenuItemProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  destructive?: boolean
  shortcut?: string
  icon?: React.ReactNode
}

interface ContextMenuState {
  open: boolean
  position: { x: number; y: number }
  items: (ContextMenuItemProps | { type: 'divider' })[]
}

const ContextMenuContext = React.createContext<{
  state: ContextMenuState
  setState: React.Dispatch<React.SetStateAction<ContextMenuState>>
}>({
  state: { open: false, position: { x: 0, y: 0 }, items: [] },
  setState: () => {},
})

export function ContextMenuProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ContextMenuState>({
    open: false,
    position: { x: 0, y: 0 },
    items: [],
  })

  React.useEffect(() => {
    const handleClickOutside = () => {
      if (state.open) {
        setState((prev) => ({ ...prev, open: false }))
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.open) {
        setState((prev) => ({ ...prev, open: false }))
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [state.open])

  return (
    <ContextMenuContext.Provider value={{ state, setState }}>
      {children}
      <ContextMenuPortal />
    </ContextMenuContext.Provider>
  )
}

export function useContextMenu() {
  const { state, setState } = React.useContext(ContextMenuContext)

  const openMenu = React.useCallback(
    (e: React.MouseEvent, items: (ContextMenuItemProps | { type: 'divider' })[]) => {
      e.preventDefault()
      e.stopPropagation()
      setState({
        open: true,
        position: { x: e.clientX, y: e.clientY },
        items,
      })
    },
    [setState],
  )

  const closeMenu = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }))
  }, [setState])

  return { state, openMenu, closeMenu }
}

function ContextMenuPortal() {
  const { state, setState } = React.useContext(ContextMenuContext)

  if (!state.open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className={cn(
          'fixed z-50 min-w-[180px] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 p-1 shadow-lg',
        )}
        style={{
          left: state.position.x,
          top: state.position.y,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {state.items.map((item, index) => {
          if ('type' in item && item.type === 'divider') {
            return (
              <div
                key={`menu-divider-${index}-${state.position.x}`}
                className="my-1 h-px bg-neutral-200"
              />
            )
          }

          const menuItem = item as ContextMenuItemProps

          return (
            <button
              type="button"
              key={`menu-item-${menuItem.label}-${index}`}
              className={cn(
                'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm',
                'transition-colors duration-150',
                menuItem.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:bg-neutral-100',
                menuItem.destructive && 'text-neutral-900 hover:bg-neutral-100',
              )}
              onClick={() => {
                if (!menuItem.disabled) {
                  menuItem.onClick?.()
                  setState((prev) => ({ ...prev, open: false }))
                }
              }}
              disabled={menuItem.disabled}
            >
              <span className="flex items-center gap-2">
                {menuItem.icon && <span className="h-4 w-4">{menuItem.icon}</span>}
                {menuItem.label}
              </span>
              {menuItem.shortcut && (
                <span className="ml-4 text-xs text-neutral-400">{menuItem.shortcut}</span>
              )}
            </button>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}

export function ContextMenuTrigger({
  children,
  items,
}: {
  children: React.ReactNode
  items: (ContextMenuItemProps | { type: 'divider' })[]
}) {
  const { openMenu } = useContextMenu()

  return (
    <div onContextMenu={(e) => openMenu(e, items)} className="contents">
      {children}
    </div>
  )
}
