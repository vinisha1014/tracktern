"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { COMPONENT_LIBRARY, type ComponentKey, type InternshipData, type AnalyticsData } from "./component-library"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Code, Eye, Save, Sparkles, Bot, User, Copy, Download, Trash2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface GeneratedComponent {
  id: string
  title: string
  description: string
  component: ComponentKey
  data?: any
  prompt: string
  timestamp: Date
}

const SUGGESTED_PROMPTS = [
  "Show me my Google application details",
  "Create an applications overview dashboard",
  "Display quick stats for my internships",
  "Generate a company applications table",
  "Show recent applications list",
  "Create a performance analytics chart",
  "Build an interview tracker component",
  "Design a status progress indicator",
  "Make a deadline reminder widget",
  "Create a success metrics display",
]

export function GenerativeUI() {
  const [generatedComponents, setGeneratedComponents] = useState<GeneratedComponent[]>([])
  const [activeComponent, setActiveComponent] = useState<GeneratedComponent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [userInternships, setUserInternships] = useState<InternshipData[]>([])
  const [userAnalytics, setUserAnalytics] = useState<AnalyticsData | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const { getToken } = useAuth()

  // Fetch user data for components
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/internships")
        if (response.ok) {
          const data = await response.json()

          // Transform internships data
          const internships: InternshipData[] = data.internships.map((internship: any) => ({
            id: internship.id,
            company: internship.company,
            role: internship.role,
            status: internship.status,
            dateApplied: internship.dateApplied,
            location: internship.location,
            salary: internship.salary,
            tags: internship.tags,
            link: internship.link,
            notes: internship.notes?.length || 0,
          }))

          setUserInternships(internships)

          // Calculate analytics
          const analytics: AnalyticsData = {
            totalApplications: internships.length,
            applied: internships.filter((i) => i.status === "APPLIED").length,
            interviewing: internships.filter((i) => i.status === "INTERVIEWING").length,
            offers: internships.filter((i) => i.status === "OFFER").length,
            rejected: internships.filter((i) => i.status === "REJECTED").length,
            successRate:
              internships.length > 0
                ? (internships.filter((i) => i.status === "OFFER").length / internships.length) * 100
                : 0,
          }

          setUserAnalytics(analytics)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: input.trim() }],
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const aiResponseText = await response.text()
      console.log("Raw AI response:", aiResponseText)

      // Simulate typing delay
      setTimeout(() => {
        setIsTyping(false)

        // Add AI message
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Component generated successfully! ✨",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])

        // Parse the AI response to extract component selection
        try {
          // Clean up the response - remove any markdown code blocks or extra text
          let cleanContent = aiResponseText.trim()

          // Extract JSON if it's wrapped in code blocks
          const jsonMatch = cleanContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
          if (jsonMatch) {
            cleanContent = jsonMatch[1].trim()
          }

          // Find JSON object in the response
          const jsonStart = cleanContent.indexOf("{")
          const jsonEnd = cleanContent.lastIndexOf("}") + 1

          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            cleanContent = cleanContent.substring(jsonStart, jsonEnd)
          }

          console.log("Cleaned content for parsing:", cleanContent)

          const aiResponse = JSON.parse(cleanContent)
          const componentKey = aiResponse.component as ComponentKey

          // Validate component exists
          if (!COMPONENT_LIBRARY[componentKey]) {
            throw new Error(`Unknown component: ${componentKey}`)
          }

          // Prepare data for the component
          let componentData: any = null

          if (componentKey === "applicationCard") {
            // For specific application, try to find it or use first one
            const requestedCompany = input.toLowerCase()
            componentData = userInternships.find((i) =>
              i.company
                .toLowerCase()
                .includes(
                  requestedCompany
                    .split(" ")
                    .find((word) => word !== "show" && word !== "my" && word !== "application" && word !== "details") ||
                    "",
                ),
            ) ||
              userInternships[0] || {
                company: "Sample Company",
                role: "Software Engineer Intern",
                status: "APPLIED" as const,
                dateApplied: new Date().toISOString(),
                location: "San Francisco, CA",
                salary: "$5000/month",
                tags: "Tech, Remote",
              }
          } else if (componentKey === "applicationsOverview" || componentKey === "quickStats") {
            componentData = userAnalytics || {
              totalApplications: 3,
              applied: 1,
              interviewing: 1,
              offers: 1,
              rejected: 0,
              successRate: 33.3,
            }
          } else {
            // For table and list components
            componentData =
              userInternships.length > 0
                ? userInternships
                : [
                    {
                      company: "Google",
                      role: "Software Engineer Intern",
                      status: "APPLIED" as const,
                      dateApplied: new Date().toISOString(),
                    },
                    {
                      company: "Microsoft",
                      role: "Product Manager Intern",
                      status: "INTERVIEWING" as const,
                      dateApplied: new Date().toISOString(),
                    },
                  ]
          }

          const newComponent: GeneratedComponent = {
            id: Date.now().toString(),
            title: aiResponse.title || "Generated Component",
            description: aiResponse.description || "AI-selected component",
            component: componentKey,
            data: componentData,
            prompt: input,
            timestamp: new Date(),
          }

          setGeneratedComponents((prev) => [newComponent, ...prev])
          setActiveComponent(newComponent)

          console.log("Successfully created component:", newComponent.title)
        } catch (error) {
          console.error("Error parsing AI response:", error)
          console.error("Raw response:", aiResponseText)

          // Fallback: create a stats component
          const fallbackComponent: GeneratedComponent = {
            id: Date.now().toString(),
            title: "Quick Stats Dashboard",
            description: "Default analytics view",
            component: "quickStats",
            data: userAnalytics || {
              totalApplications: 0,
              applied: 0,
              interviewing: 0,
              offers: 0,
              rejected: 0,
              successRate: 0,
            },
            prompt: input,
            timestamp: new Date(),
          }
          setGeneratedComponents((prev) => [fallbackComponent, ...prev])
          setActiveComponent(fallbackComponent)
        }
      }, 1500)
    } catch (error) {
      console.error("Error calling AI API:", error)
      setIsTyping(false)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error generating the component. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setInput("")
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const saveComponent = (component: GeneratedComponent) => {
    // This would save to the database
    console.log("Saving component:", component)
  }

  const deleteComponent = (componentId: string) => {
    setGeneratedComponents((prev) => prev.filter((c) => c.id !== componentId))
    if (activeComponent?.id === componentId) {
      setActiveComponent(null)
    }
  }

  const regenerateComponent = async (component: GeneratedComponent) => {
    setInput(component.prompt)
    handleSubmit(new Event("submit") as any)
  }

  // Dynamic component rendering
  const renderActiveComponent = () => {
    if (!activeComponent) return null

    const ComponentToRender = COMPONENT_LIBRARY[activeComponent.component]
    if (!ComponentToRender) return <div>Component not found</div>

    return <ComponentToRender data={activeComponent.data} />
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const componentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chat Interface */}
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card className="flex flex-col h-[700px] shadow-medium">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center space-x-2">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Bot className="h-5 w-5 text-primary" />
              </motion.div>
              <span>AI Assistant</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Enhanced
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-6">
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div
                    className="text-center text-muted-foreground py-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.3 }}>
                      <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                    </motion.div>
                    <p className="text-lg font-medium mb-2">Ready to create something amazing?</p>
                    <p className="text-sm mb-6">
                      Tell me what kind of component or visualization you'd like for your internship tracking.
                    </p>

                    {/* Suggested Prompts */}
                    <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
                      {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSuggestedPrompt(prompt)}
                          className="text-xs p-2 bg-accent hover:bg-accent/80 rounded-lg text-left transition-colors"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          "{prompt}"
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                      "flex items-start space-x-3",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" && (
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Bot className="h-4 w-4 text-primary" />
                      </motion.div>
                    )}

                    <motion.div
                      className={cn(
                        "max-w-[80%] rounded-xl px-4 py-3 shadow-soft",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground",
                      )}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </motion.div>

                    {message.role === "user" && (
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <User className="h-4 w-4 text-primary" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                    <div className="bg-accent rounded-xl px-4 py-3 shadow-soft">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Form */}
            <div className="border-t border-border/50 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe the component you want to create..."
                  disabled={isLoading}
                  className="flex-1 focus:ring-2 focus:ring-primary/20"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-primary to-primary/80"
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </motion.div>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Generated Components Preview */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="h-[700px] shadow-medium">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>Live Components</span>
              </span>
              {generatedComponents.length > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {generatedComponents.length} created
                  </Badge>
                </motion.div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col p-0">
            {generatedComponents.length === 0 ? (
              <motion.div
                className="flex-1 flex items-center justify-center text-center text-muted-foreground p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.3 }}>
                    <Eye className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  </motion.div>
                  <p className="text-lg font-medium mb-2">No components yet</p>
                  <p className="text-sm">Start a conversation with the AI to generate your first component.</p>
                </div>
              </motion.div>
            ) : (
              <Tabs defaultValue="preview" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Live Preview
                  </TabsTrigger>
                  <TabsTrigger value="info">
                    <Code className="h-4 w-4 mr-2" />
                    Component Info
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="flex-1 overflow-y-auto p-4">
                  <AnimatePresence mode="wait">
                    {activeComponent ? (
                      <motion.div
                        className="space-y-4"
                        variants={componentVariants}
                        initial="hidden"
                        animate="visible"
                        key={activeComponent.id}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{activeComponent.title}</h3>
                            <p className="text-sm text-muted-foreground">{activeComponent.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" onClick={() => saveComponent(activeComponent)}>
                                <Save className="h-4 w-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" onClick={() => regenerateComponent(activeComponent)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>

                        {/* Live Component Rendering */}
                        <motion.div
                          className="border rounded-lg p-4 bg-background shadow-soft"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          {renderActiveComponent()}
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="text-center text-muted-foreground py-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Select a component to preview
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="info" className="flex-1 overflow-y-auto p-4">
                  <AnimatePresence mode="wait">
                    {activeComponent ? (
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={activeComponent.id}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{activeComponent.title}</h3>
                          <div className="flex space-x-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(JSON.stringify(activeComponent, null, 2))}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="p-3 bg-accent rounded-lg">
                            <strong className="text-accent-foreground">Component:</strong>
                            <Badge variant="outline" className="ml-2">
                              {activeComponent.component}
                            </Badge>
                          </div>
                          <div className="p-3 bg-accent rounded-lg">
                            <strong className="text-accent-foreground">Description:</strong>
                            <p className="mt-1 text-muted-foreground">{activeComponent.description}</p>
                          </div>
                          <div className="p-3 bg-accent rounded-lg">
                            <strong className="text-accent-foreground">Created:</strong>
                            <p className="mt-1 text-muted-foreground">{activeComponent.timestamp.toLocaleString()}</p>
                          </div>
                          <div className="p-3 bg-accent rounded-lg">
                            <strong className="text-accent-foreground">Prompt:</strong>
                            <p className="mt-1 text-muted-foreground italic">"{activeComponent.prompt}"</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="text-center text-muted-foreground py-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Select a component to view details
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Component History */}
      <AnimatePresence>
        {generatedComponents.length > 0 && (
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Components</span>
                  <Badge variant="outline">{generatedComponents.length} total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {generatedComponents.map((component, index) => (
                      <motion.div
                        key={component.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                      >
                        <Card
                          className={cn(
                            "cursor-pointer transition-all duration-200 hover:shadow-medium",
                            activeComponent?.id === component.id && "ring-2 ring-primary shadow-medium",
                          )}
                          onClick={() => setActiveComponent(component)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-sm">{component.title}</CardTitle>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteComponent(component.id)
                                }}
                                className="text-muted-foreground hover:text-destructive"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{component.description}</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="outline" className="text-xs">
                                {component.component}
                              </Badge>
                              <p className="text-xs text-muted-foreground">
                                {component.timestamp.toLocaleDateString()}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
