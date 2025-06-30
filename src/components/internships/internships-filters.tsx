"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const statusOptions = [
  { value: 'all', label: 'All Status', color: 'bg-muted' },
  { value: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-700' },
  { value: 'interviewing', label: 'Interviewing', color: 'bg-amber-100 text-amber-700' },
  { value: 'offer', label: 'Offer', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700' },
  { value: 'withdrawn', label: 'Withdrawn', color: 'bg-slate-100 text-slate-700' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First', icon: '↓' },
  { value: 'oldest', label: 'Oldest First', icon: '↑' },
  { value: 'company', label: 'Company A-Z', icon: 'A' },
  { value: 'status', label: 'Status', icon: '●' },
]

export function InternshipsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentStatus = searchParams.get('status') || 'all'
  const currentSearch = searchParams.get('search') || ''
  const currentSort = searchParams.get('sort') || 'newest'

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === 'all' || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    
    router.push(`/dashboard/internships?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/dashboard/internships')
  }

  const hasActiveFilters = currentStatus !== 'all' || currentSearch !== '' || currentSort !== 'newest'

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">Filters</h3>
        </div>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Button variant="outline" onClick={clearFilters} size="sm" className="h-8">
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          </motion.div>
        )}
      </div>

      {/* Main Filters */}
             <div className="bg-card border border-border/50 rounded-lg p-4 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company, role, or location..."
              value={currentSearch}
              onChange={(e) => updateFilters('search', e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <Select value={currentStatus} onValueChange={(value) => updateFilters('status', value)}>
              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
                             <SelectContent className="bg-popover border border-border/50 shadow-md">
                 {statusOptions.map((option) => (
                   <SelectItem key={option.value} value={option.value} className="focus:bg-accent">
                     <div className="flex items-center space-x-2">
                       <div className={cn("w-3 h-3 rounded-full", option.color)} />
                       <span>{option.label}</span>
                     </div>
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>

           {/* Sort */}
           <div className="space-y-2">
             <label className="text-sm font-medium text-foreground">Sort By</label>
             <Select value={currentSort} onValueChange={(value) => updateFilters('sort', value)}>
               <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20">
                 <SelectValue placeholder="Sort order" />
               </SelectTrigger>
               <SelectContent className="bg-popover border border-border/50 shadow-md">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="focus:bg-accent">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground font-mono text-xs">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-muted/30 border border-border/30 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Active Filters</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {currentStatus !== 'all' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                                     <Badge variant="secondary" className="flex items-center space-x-2 bg-background/80 hover:bg-background shadow-sm">
                     <span className="text-xs">Status: {statusOptions.find(opt => opt.value === currentStatus)?.label}</span>
                     <button 
                       onClick={() => updateFilters('status', 'all')}
                       className="ml-1 hover:bg-background/80 rounded-full p-0.5 transition-colors"
                     >
                       <X className="h-3 w-3" />
                     </button>
                   </Badge>
                 </motion.div>
               )}
               
               {currentSearch && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                 >
                   <Badge variant="secondary" className="flex items-center space-x-2 bg-background/80 hover:bg-background shadow-sm">
                     <span className="text-xs">Search: "{currentSearch}"</span>
                     <button 
                       onClick={() => updateFilters('search', '')}
                       className="ml-1 hover:bg-background/80 rounded-full p-0.5 transition-colors"
                     >
                       <X className="h-3 w-3" />
                     </button>
                   </Badge>
                 </motion.div>
               )}
               
               {currentSort !== 'newest' && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                 >
                   <Badge variant="secondary" className="flex items-center space-x-2 bg-background/80 hover:bg-background shadow-sm">
                    <span className="text-xs">Sort: {sortOptions.find(opt => opt.value === currentSort)?.label}</span>
                    <button 
                      onClick={() => updateFilters('sort', 'newest')}
                      className="ml-1 hover:bg-background/80 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 