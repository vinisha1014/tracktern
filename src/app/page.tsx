import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BrainCircuit, 
  Kanban, 
  FileText, 
  Bell, 
  Sparkles,
  Github,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Target,
  Star,
  Calendar,
  BarChart3,
  Shield,
  Clock,
  Lightbulb,
  Globe,
  Smartphone,
  Database
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                <BrainCircuit className="relative h-8 w-8 text-white bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Tracktern
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border-0">
                <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
                AI-Powered Internship Management Platform
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Land Your Dream{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Internship
                </span>
                <br />
                with AI Intelligence
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Transform your internship search with the world's most intelligent tracking platform. 
                Powered by AI, designed for success, trusted by thousands of students.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button size="lg" asChild className="text-lg px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-200">
                  <Link href="/sign-up">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-12 py-4 border-2 hover:bg-gray-50">
                  <Link href="/dashboard">
                    <Globe className="mr-2 h-5 w-5" />
                    Live Demo
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10K+</div>
                  <div className="text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50K+</div>
                  <div className="text-gray-600">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-gray-600">Companies</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Demo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8">
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Interactive Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Powerful Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From AI-powered insights to intelligent automation, Tracktern provides all the tools 
                you need to streamline your internship search and maximize your success rate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: BrainCircuit,
                  title: "AI-Powered Analytics",
                  description: "Get intelligent insights about your application performance and receive personalized recommendations to improve your success rate.",
                  color: "blue"
                },
                {
                  icon: Kanban,
                  title: "Smart Kanban Board",
                  description: "Organize applications with drag-and-drop simplicity. Track progress from application to offer with visual clarity.",
                  color: "purple"
                },
                {
                  icon: Sparkles,
                  title: "Generative UI",
                  description: "Create custom tracking components using natural language. Let AI build the perfect interface for your workflow.",
                  color: "pink"
                },
                {
                  icon: Bell,
                  title: "Intelligent Reminders",
                  description: "Never miss a deadline again. AI-powered notifications ensure you stay on top of follow-ups and important dates.",
                  color: "orange"
                },
                {
                  icon: FileText,
                  title: "Resume Management",
                  description: "Upload, organize, and manage multiple resume versions. Match the perfect resume to each application.",
                  color: "green"
                },
                {
                  icon: TrendingUp,
                  title: "Success Tracking",
                  description: "Comprehensive analytics and progress visualization help you understand what's working and what needs improvement.",
                  color: "indigo"
                }
              ].map((feature, index) => (
                <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Lightbulb className="h-4 w-4 mr-2" />
                How It Works
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Simple Steps to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Success
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started in minutes with our intuitive platform designed to make internship tracking effortless.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Set up your account and upload your resumes. Our AI analyzes your profile to provide personalized recommendations.",
                  icon: Users
                },
                {
                  step: "02", 
                  title: "Track Applications",
                  description: "Add internship applications and let our smart system organize them automatically. Use our Kanban board for visual tracking.",
                  icon: Target
                },
                {
                  step: "03",
                  title: "Get AI Insights",
                  description: "Receive intelligent analytics, follow-up reminders, and success predictions to optimize your internship search strategy.",
                  icon: Sparkles
                }
              ].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                      <span className="text-sm font-bold text-gray-600">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Students Worldwide
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of successful students who landed their dream internships
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Tracktern helped me organize my applications and I landed 3 offers! The AI insights were game-changing.",
                  author: "Sarah Chen",
                  role: "CS Student, Stanford",
                  rating: 5
                },
                {
                  quote: "The generative UI feature is incredible. I could create custom dashboards that perfectly fit my workflow.",
                  author: "Michael Rodriguez", 
                  role: "Engineering Student, MIT",
                  rating: 5
                },
                {
                  quote: "Best internship tracking tool I've used. The analytics helped me understand my application patterns.",
                  author: "Emily Johnson",
                  role: "Business Student, Harvard",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Simple Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Choose Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Success Plan
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Start free and upgrade as you grow
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Free",
                  price: "$0",
                  period: "forever",
                  description: "Perfect for getting started",
                  features: [
                    "Up to 10 applications",
                    "Basic kanban board",
                    "Email reminders",
                    "Resume storage",
                    "Basic analytics"
                  ],
                  cta: "Get Started",
                  popular: false
                },
                {
                  name: "Pro",
                  price: "$9",
                  period: "per month",
                  description: "For serious job seekers",
                  features: [
                    "Unlimited applications",
                    "AI-powered insights",
                    "Generative UI",
                    "Advanced analytics",
                    "Priority support",
                    "Custom reminders"
                  ],
                  cta: "Start Free Trial",
                  popular: true
                },
                {
                  name: "Team",
                  price: "$19",
                  period: "per month",
                  description: "For career services teams",
                  features: [
                    "Everything in Pro",
                    "Team collaboration",
                    "Admin dashboard",
                    "Bulk import/export",
                    "White-label options",
                    "Dedicated support"
                  ],
                  cta: "Contact Sales",
                  popular: false
                }
              ].map((plan, index) => (
                <Card key={index} className={`relative border-2 ${plan.popular ? 'border-blue-500 shadow-2xl transform scale-105' : 'border-gray-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/sign-up">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Join thousands of students who are already using Tracktern to land their dream internships. 
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-12 py-4 bg-white text-gray-900 hover:bg-gray-100">
                <Link href="/sign-up">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-12 py-4 border-white text-white hover:bg-white/10">
                <Link href="/dashboard">
                  Explore Demo
                  <Globe className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                    <BrainCircuit className="relative h-8 w-8 text-white bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg" />
                  </div>
                  <span className="text-2xl font-bold">Tracktern</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  The world's most intelligent internship tracking platform, powered by AI and designed for success.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">Demo</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Tracktern. All rights reserved. Built with ❤️ for students.
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
