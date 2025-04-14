"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ onSearch, placeholder = "Search...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("")
  
  // Debounce search input to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [query, onSearch])
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
  )
} 