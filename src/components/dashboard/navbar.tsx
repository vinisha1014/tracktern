"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Search, Bell, Plus, Sparkles, Menu, Command, Calendar, Settings, HelpCircle } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [notifications] = useState(3)

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard"
      case "/dashboard/internships":
        return "Internships"
      case "/dashboard/analytics":
        return "Analytics"
      case "/dashboard/generate":
        return "AI Assistant"
      case "/dashboard/resumes":
        return "Resumes"
      case "/dashboard/reminders":
        return "Reminders"
      case "/dashboard/settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  const getPageDescription = () => {
    switch (pathname) {
      case "/dashboard":
        return "Welcome back, ready to succeed?"
      case "/dashboard/internships":
        return "Manage and track all your applications"
      case "/dashboard/analytics":
        return "Performance insights and metrics"
      case "/dashboard/generate":
        return "AI-powered assistance and insights"
      case "/dashboard/resumes":
        return "Manage your documents and portfolios"
      case "/dashboard/reminders":
        return "Follow-ups and important deadlines"
      case "/dashboard/settings":
        return "Customize your experience"
      default:
        return "Welcome back, ready to succeed?"
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
    >
      <div className="container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo & Page Title */}
          <div className="flex items-center space-x-6">
            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden p-2">
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm">
                  <BrainCircuit className="h-6 w-6 text-primary-foreground" />
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <motion.span
                  className="text-xl font-bold text-foreground"
                  whileHover={{ scale: 1.02 }}
                >
                  Tracktern
                </motion.span>
                <div className="text-xs text-muted-foreground -mt-1">AI-Powered</div>
              </div>
            </Link>

            {/* Page Title with Breadcrumb */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="h-6 w-px bg-border" />
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <h1 className="text-lg font-semibold text-foreground">{getPageTitle()}</h1>
                <div className="text-xs text-muted-foreground">{getPageDescription()}</div>
              </motion.div>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <motion.div
              className="relative w-full"
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Search
                className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors",
                  isSearchFocused ? "text-primary" : "text-muted-foreground"
                )}
              />
              <Input
                placeholder="Search internships, companies..."
                className="pl-10 pr-12 bg-background/50 backdrop-blur-sm border border-border hover:border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-muted-foreground bg-muted border border-border rounded-md">
                  <Command className="h-3 w-3 mr-1" />
                  K
                </kbd>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center space-x-3">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Add Internship */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/50 border-border hover:bg-accent hover:border-border transition-all duration-200 shadow-sm"
                  asChild
                >
                  <Link href="/dashboard/internships/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Application
                  </Link>
                </Button>
              </motion.div>

              {/* AI Generate */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-sm hover:shadow-md transition-all duration-200"
                  asChild
                >
                  <Link href="/dashboard/generate">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Magic
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Notification Bell */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-5 w-5" />
                <AnimatePresence>
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs border-0">
                        {notifications}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                  <Calendar className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                  <Settings className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-3 border-l border-border/50">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-foreground">John Doe</div>
                <div className="text-xs text-muted-foreground">Premium User</div>
              </div>
              <motion.div 
                className="relative" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10 ring-2 ring-border hover:ring-primary/50 transition-all shadow-sm",
                    },
                  }}
                />
                <div className="absolute -bottom-1 -right-1 z-10">
                  <div className="h-3 w-3 bg-emerald-500 border-2 border-background rounded-full shadow-sm" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <motion.div
        className="lg:hidden container-padding pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="pl-10 bg-background/50 backdrop-blur-sm border border-border rounded-lg"
          />
        </div>
      </motion.div>
    </motion.nav>
  )
}
