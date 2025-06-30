"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bell,
  BarChart3,
  Settings,
  Sparkles,
  Target,
  Calendar,
  User,
  ChevronRight,
  TrendingUp,
  Zap,
  Star,
  Award,
  BookOpen,
  BrainCircuit,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  description?: string
  comingSoon?: boolean
}

const navigationItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & insights",
  },
  {
    title: "Internships",
    href: "/dashboard/internships",
    icon: Briefcase,
    badge: 12,
    description: "Track applications",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    description: "Performance metrics",
  },
  {
    title: "AI Assistant",
    href: "/dashboard/generate",
    icon: Sparkles,
    badge: "New",
    description: "Generate insights",
  },
  {
    title: "Resumes",
    href: "/dashboard/resumes",
    icon: FileText,
    badge: 3,
    description: "Manage documents",
  },
  {
    title: "Reminders",
    href: "/dashboard/reminders",
    icon: Bell,
    badge: 5,
    description: "Follow-ups & deadlines",
  },
]

const quickActions: SidebarItem[] = [
  {
    title: "Add Application",
    href: "/dashboard/internships/new",
    icon: Target,
    description: "Quick add",
  },
  {
    title: "Schedule Interview",
    href: "/dashboard/calendar",
    icon: Calendar,
    comingSoon: true,
    description: "Coming soon",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-r border-border/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sidebar Header */}
      <motion.div className="p-6 border-b border-border/50" variants={itemVariants}>
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" />
            </div>
          </motion.div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">John Doe</h3>
            <p className="text-xs text-muted-foreground">Premium User</p>
          </div>
        </div>

        {/* Progress Card */}
        <motion.div
          className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Monthly Goal</span>
            <span className="text-sm text-primary font-semibold">8/15</span>
          </div>
          <Progress value={53} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">7 more to reach your goal!</p>
        </motion.div>
      </motion.div>

      {/* Main Navigation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <motion.div variants={itemVariants}>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Navigation
          </h4>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 overflow-hidden",
                      active
                        ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 mr-3 transition-all duration-200",
                        active ? "text-primary" : "group-hover:text-foreground",
                        hoveredItem === item.href && "scale-110",
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item.title}</span>
                        <AnimatePresence>
                          {item.badge && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                            >
                              <Badge
                                variant={active ? "default" : "secondary"}
                                className={cn(
                                  "ml-2 h-5 text-xs",
                                  active
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground",
                                )}
                              >
                                {item.badge}
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground mt-0.5 truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 transition-all duration-200 opacity-0 group-hover:opacity-100",
                        active ? "text-primary" : "text-muted-foreground",
                        hoveredItem === item.href && "translate-x-0.5",
                      )}
                    />

                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-full"
                        layoutId="activeIndicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Quick Actions
          </h4>
          <div className="space-y-1">
            {quickActions.map((item) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  whileHover={{ x: item.comingSoon ? 0 : 2 }}
                  whileTap={{ scale: item.comingSoon ? 1 : 0.98 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full justify-start px-3 py-2.5 h-auto rounded-lg text-left",
                      item.comingSoon
                        ? "text-muted-foreground cursor-not-allowed opacity-60"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    )}
                    disabled={item.comingSoon}
                    asChild={!item.comingSoon}
                  >
                    {item.comingSoon ? (
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-3" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <span className="text-sm truncate">{item.title}</span>
                            <Badge variant="outline" className="ml-2 text-xs border-border/50">
                              Soon
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground/70 mt-0.5 truncate">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link href={item.href} className="flex items-center w-full">
                        <Icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate">{item.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    )}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div className="p-4 border-t border-border/50 space-y-4" variants={itemVariants}>
        {/* Achievement Card */}
        <motion.div
          className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200/50 dark:border-amber-800/30"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
                             className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-sm"
              whileHover={{ rotate: 10 }}
            >
              <Award className="h-4 w-4 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm truncate">Achievement!</h4>
              <p className="text-xs text-muted-foreground truncate">10+ applications</p>
            </div>
          </div>
        </motion.div>

        {/* Settings & Help */}
        <div className="space-y-1">
          <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/dashboard/settings"
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                pathname === "/dashboard/settings"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <Settings className="h-4 w-4 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              Settings
            </Link>
          </motion.div>

          <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg"
            >
              <BookOpen className="h-4 w-4 mr-3" />
              Help & Support
            </Button>
          </motion.div>
        </div>

        {/* Upgrade Banner */}
        <motion.div
                     className="p-4 bg-gradient-to-r from-primary to-primary/90 rounded-lg text-primary-foreground shadow-md"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Star className="h-5 w-5 flex-shrink-0" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">Upgrade to Pro</h4>
              <p className="text-xs text-primary-foreground/80 mt-0.5">
                Unlock AI insights
              </p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="sm"
                             className="w-full bg-white/20 hover:bg-white/30 text-primary-foreground border-0 shadow-sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
