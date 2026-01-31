'use client'

import type { Memory } from '@repo/types'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  MemoryCard,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Textarea,
  useToast,
} from '@repo/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importContent, setImportContent] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    fetchMemories()
  }, [])

  const fetchMemories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/memory', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setMemories(data.data.items)
      }
    } catch {
      // Fetch failed
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchMemories()
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `http://localhost:3001/api/memory/search?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      const data = await response.json()
      if (data.success) {
        setMemories(data.data.items || [])
      }
    } catch {
      // Search failed
    } finally {
      setIsLoading(false)
    }
  }

  const handleImport = async () => {
    if (!importContent.trim()) return

    setIsImporting(true)
    try {
      const response = await fetch('http://localhost:3001/api/memory/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: importContent }),
      })
      const data = await response.json()
      if (data.success) {
        addToast({ title: 'Memory imported successfully', variant: 'success' })
        setImportContent('')
        setIsImportModalOpen(false)
        fetchMemories()
      }
    } catch (error) {
      addToast({ title: 'Failed to import memory', variant: 'error' })
    } finally {
      setIsImporting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/memory/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setMemories((prev) => prev.filter((m) => m.id !== id))
        addToast({ title: 'Memory deleted', variant: 'default' })
      }
    } catch (error) {
      addToast({ title: 'Failed to delete memory', variant: 'error' })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-neutral-0">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/chat" className="text-lg font-bold text-neutral-900">
              YULA
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/chat" className="text-sm text-neutral-500 hover:text-neutral-900">
                Chat
              </Link>
              <Link href="/memory" className="text-sm font-medium text-neutral-900">
                Memory
              </Link>
              <Link href="/settings" className="text-sm text-neutral-500 hover:text-neutral-900">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">Memory</h1>
          <Button onClick={() => setIsImportModalOpen(true)}>Import Memory</Button>
        </div>

        <div className="mt-6 flex gap-3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="max-w-md"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="secondary" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-xl bg-neutral-200" />
              ))}
            </div>
          ) : memories.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-neutral-500">No memories yet. Import some to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Import Memory</ModalTitle>
          </ModalHeader>
          <div className="py-4">
            <Textarea
              value={importContent}
              onChange={(e) => setImportContent(e.target.value)}
              placeholder="Paste text, notes, or any information you want YULA to remember..."
              className="min-h-[200px]"
            />
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsImportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport} isLoading={isImporting}>
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
