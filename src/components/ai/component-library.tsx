"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  User,
  ExternalLink,
  TrendingUp,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Award,
  ArrowUpRight,
  Filter,
  Search,
  Activity,
  PieChart,
} from "lucide-react"
import { motion } from "framer-motion"

// Component Types
export interface InternshipData {
  id?: string
  company: string
  role: string
  status: "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED" | "WITHDRAWN"
  dateApplied: string
  location?: string
  salary?: string
  tags?: string
  link?: string
  notes?: number
}

export interface AnalyticsData {
  totalApplications: number
  applied: number
  interviewing: number
  offers: number
  rejected: number
  successRate: number
}

// 1. Enhanced Application Status Card
export function ApplicationStatusCard({ data }: { data: InternshipData }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "status-applied"
      case "INTERVIEWING":
        return "status-interviewing"
      case "OFFER":
        return "status-offer"
      case "REJECTED":
        return "status-rejected"
      default:
        return "status-withdrawn"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPLIED":
        return <Clock className="h-4 w-4" />
      case "INTERVIEWING":
        return <Users className="h-4 w-4" />
      case "OFFER":
        return <CheckCircle className="h-4 w-4" />
      case "REJECTED":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <Card className="w-full max-w-md card-hover shadow-medium bg-gradient-to-br from-background to-accent/20">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-soft"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {data.company.charAt(0)}
              </motion.div>
              <div>
                <CardTitle className="text-lg font-bold text-foreground">{data.company}</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">{data.role}</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Badge className={`${getStatusColor(data.status)} font-medium shadow-soft`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(data.status)}
                  <span className="text-xs font-semibold">{data.status}</span>
                </div>
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="flex items-center text-sm text-muted-foreground"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <div>
                <p className="font-medium">{getDaysAgo(data.dateApplied)} days ago</p>
                <p className="text-xs text-muted-foreground">{new Date(data.dateApplied).toLocaleDateString()}</p>
              </div>
            </motion.div>

            {data.location && (
              <motion.div
                className="flex items-center text-sm text-muted-foreground"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-xs text-muted-foreground">{data.location}</p>
                </div>
              </motion.div>
            )}
          </div>

          {data.salary && (
            <motion.div
              className="flex items-center text-sm text-muted-foreground p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <DollarSign className="h-4 w-4 mr-2 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-700 dark:text-emerald-300">Salary</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">{data.salary}</p>
              </div>
            </motion.div>
          )}

          {data.tags && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Skills & Tags</p>
              <div className="flex flex-wrap gap-1">
                {data.tags.split(",").map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                      {tag.trim()}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-background border-border hover:bg-accent shadow-soft"
              >
                <User className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </motion.div>
            {data.link && (
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-background border-border hover:bg-accent shadow-soft"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Job
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// 2. Modern Applications Overview Chart
export function ApplicationsOverview({ data }: { data: AnalyticsData }) {
  const applications = [
    {
      status: "Applied",
      count: data.applied,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      status: "Interviewing",
      count: data.interviewing,
      color: "bg-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      textColor: "text-amber-700 dark:text-amber-300",
    },
    {
      status: "Offers",
      count: data.offers,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      textColor: "text-emerald-700 dark:text-emerald-300",
    },
    {
      status: "Rejected",
      count: data.rejected,
      color: "bg-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      textColor: "text-red-700 dark:text-red-300",
    },
  ]

  const maxCount = Math.max(...applications.map((app) => app.count), 1)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <Card className="w-full max-w-lg card-hover shadow-medium bg-gradient-to-br from-background to-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-soft"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <PieChart className="h-5 w-5 text-primary-foreground" />
                </motion.div>
                <span className="text-lg font-bold text-foreground">Applications Overview</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Total: {data.totalApplications} applications</p>
            </div>
            <div className="text-right">
              <motion.p
                className="text-2xl font-bold text-emerald-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {data.successRate.toFixed(1)}%
              </motion.p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-xl border ${app.bgColor} border-opacity-50 shadow-soft`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <motion.div className={`w-3 h-3 rounded-full ${app.color} shadow-soft`} whileHover={{ scale: 1.2 }} />
                  <span className={`text-sm font-semibold ${app.textColor}`}>{app.status}</span>
                </div>
                <div className="text-right">
                  <motion.span
                    className={`text-lg font-bold ${app.textColor}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {app.count}
                  </motion.span>
                  <p className="text-xs text-muted-foreground">applications</p>
                </div>
              </div>
              <div className="w-full bg-background/70 rounded-full h-2 overflow-hidden shadow-inner">
                <motion.div
                  className={`h-2 rounded-full ${app.color} shadow-soft`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(app.count / maxCount) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-primary to-primary/80 rounded-xl text-primary-foreground shadow-medium"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Award className="h-5 w-5" />
                </motion.div>
                <span className="font-semibold">Performance Score</span>
              </div>
              <div className="text-right">
                <motion.span
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  A+
                </motion.span>
                <p className="text-xs text-primary-foreground/80">Excellent</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// 3. Professional Company Applications Table
export function CompanyApplicationsTable({ data }: { data: InternshipData[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.005 }}
    >
      <Card className="w-full card-hover shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-soft"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Building2 className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-lg font-bold text-foreground">Your Applications</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="text-xs shadow-soft bg-transparent">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="text-xs shadow-soft bg-transparent">
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-sm">Company</th>
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-sm">Role</th>
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-sm">Status</th>
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-sm">Applied</th>
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((application, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-border/50 hover:bg-accent/50 transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm shadow-soft"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {application.company.charAt(0)}
                        </motion.div>
                        <div>
                          <p className="font-semibold text-foreground">{application.company}</p>
                          {application.location && (
                            <p className="text-xs text-muted-foreground">{application.location}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <p className="font-medium text-foreground">{application.role}</p>
                      {application.salary && (
                        <p className="text-xs text-emerald-600 font-semibold">{application.salary}</p>
                      )}
                    </td>
                    <td className="py-4 px-2">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${
                            application.status === "APPLIED"
                              ? "status-applied"
                              : application.status === "INTERVIEWING"
                                ? "status-interviewing"
                                : application.status === "OFFER"
                                  ? "status-offer"
                                  : "status-rejected"
                          } shadow-soft`}
                        >
                          {application.status}
                        </Badge>
                      </motion.div>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm text-foreground font-medium">
                        {new Date(application.dateApplied).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.ceil(
                          (new Date().getTime() - new Date(application.dateApplied).getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days ago
                      </p>
                    </td>
                    <td className="py-4 px-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity shadow-soft bg-transparent"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// 4. Enhanced Quick Stats Dashboard
export function QuickStatsDashboard({ data }: { data: AnalyticsData }) {
  const stats = [
    {
      label: "Total Applications",
      value: data.totalApplications,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      change: "+3 this week",
    },
    {
      label: "In Progress",
      value: data.applied + data.interviewing,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      borderColor: "border-amber-200 dark:border-amber-800",
      change: "2 interviews scheduled",
    },
    {
      label: "Offers Received",
      value: data.offers,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      change: "🎉 Congratulations!",
    },
    {
      label: "Success Rate",
      value: `${data.successRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      borderColor: "border-violet-200 dark:border-violet-800",
      change: "+5% improvement",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <Card className={`card-hover shadow-medium ${stat.bgColor} border ${stat.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center shadow-soft`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </motion.div>
                <div className="text-right">
                  <motion.p
                    className={`text-2xl font-bold ${stat.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// 5. Modern Recent Applications List
export function RecentApplicationsList({ data }: { data: InternshipData[] }) {
  const recent = data.slice(0, 5) // Show last 5 applications

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <Card className="w-full max-w-md card-hover shadow-medium bg-gradient-to-br from-background to-violet-50/30 dark:to-violet-950/10">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-violet-600 to-violet-500 rounded-xl flex items-center justify-center shadow-soft"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Activity className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-foreground">Recent Applications</span>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
              <Badge className="bg-violet-100 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                {recent.length}
              </Badge>
            </motion.div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {recent.map((application, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 bg-background/70 hover:bg-background/90 rounded-xl border border-border/50 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200 group shadow-soft hover:shadow-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ x: 4, scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm shadow-soft"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {application.company.charAt(0)}
                </motion.div>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
                    {application.company}
                  </p>
                  <p className="text-sm text-muted-foreground group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
                    {application.role}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium ${
                      application.status === "APPLIED"
                        ? "status-applied"
                        : application.status === "INTERVIEWING"
                          ? "status-interviewing"
                          : application.status === "OFFER"
                            ? "status-offer"
                            : "status-rejected"
                    } shadow-soft`}
                  >
                    {application.status}
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Component Library Mapping
export type ComponentKey = 
  | "applicationCard"
  | "applicationsOverview" 
  | "quickStats"
  | "companyTable"
  | "recentList"

export const COMPONENT_LIBRARY: Record<ComponentKey, React.ComponentType<{ data: any }>> = {
  applicationCard: ApplicationStatusCard,
  applicationsOverview: ApplicationsOverview,
  quickStats: QuickStatsDashboard,
  companyTable: CompanyApplicationsTable,
  recentList: RecentApplicationsList,
}
