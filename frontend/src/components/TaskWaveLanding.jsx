"use client"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  CheckCircle,
  Users,
  BarChart3,
  ArrowRight,
  Menu,
  Play,
  UserPlus,
  Settings,
  Eye,
  Bell,
  Calendar,
  Target,
  Workflow,
  Activity,
  ChevronDown,
  X,
} from "lucide-react"
import TaskWaveLogo from "./ui/TaskWaveLogo"

const TaskWaveLanding = () => {
  const [openAccordion, setOpenAccordion] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  const companies = [
    { name: "Microsoft", color: "bg-blue-500" },
    { name: "Google", color: "bg-red-500" },
    { name: "Slack", color: "bg-purple-500" },
    { name: "Spotify", color: "bg-green-500" },
    { name: "Amazon", color: "bg-orange-500" },
    { name: "Airbnb", color: "bg-pink-500" },
  ]

  const howItWorksSteps = [
    {
      icon: UserPlus,
      title: "1. Create & Assign",
      description:
        "Admins create tasks with detailed descriptions, deadlines, and priorities. Assign them to one or multiple team members instantly.",
      bgColor: "from-blue-300 to-purple-300",
      iconColor: "text-blue-600",
    },
    {
      icon: Activity,
      title: "2. Real-time Updates",
      description:
        "Team members receive instant notifications and can update task progress. All changes sync in real-time across all dashboards.",
      bgColor: "from-purple-300 to-pink-300",
      iconColor: "text-purple-600",
    },
    {
      icon: Target,
      title: "3. Track & Complete",
      description:
        "Monitor progress with visual dashboards, get completion notifications, and maintain full visibility of your team's productivity.",
      bgColor: "from-green-300 to-blue-300",
      iconColor: "text-green-600",
    },
  ]

  const adminFeatures = [
    {
      icon: Settings,
      title: "Task Management",
      description: "Create, update, and delete tasks with rich descriptions, deadlines, and priority levels.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      title: "Team Assignment",
      description: "Assign tasks to individual team members or multiple people for collaborative work.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "Track task progress in real-time with live updates and completion notifications.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ]

  const teamFeatures = [
    {
      icon: Calendar,
      title: "Personal Dashboard",
      description: "Access your personalized dashboard with all assigned tasks organized by priority and deadline.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Receive real-time notifications for new task assignments and important updates.",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Update task status and completion progress that reflects instantly on admin dashboards.",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager, TechCorp",
      initials: "SJ",
      gradient: "from-blue-500 to-purple-500",
      testimonial:
        "TaskWave has completely transformed how our team collaborates. The real-time updates mean everyone stays in sync, and productivity has increased by 40%.",
    },
    {
      name: "Michael Chen",
      role: "Team Lead, StartupXYZ",
      initials: "MC",
      gradient: "from-green-500 to-blue-500",
      testimonial:
        "The best part about TaskWave is how intuitive it is. Our team was up and running in minutes, and the real-time collaboration features are game-changing.",
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director, GrowthCo",
      initials: "ER",
      gradient: "from-purple-500 to-pink-500",
      testimonial:
        "TaskWave's admin dashboard gives me complete visibility into our projects. I can track progress in real-time and our team loves the mobile experience.",
    },
    {
      name: "David Kim",
      role: "CTO, InnovateLab",
      initials: "DK",
      gradient: "from-orange-500 to-red-500",
      testimonial:
        "We've tried many task management tools, but TaskWave's real-time synchronization is unmatched. It's free and works better than paid alternatives.",
    },
    {
      name: "Lisa Wang",
      role: "Product Manager, DesignStudio",
      initials: "LW",
      gradient: "from-teal-500 to-green-500",
      testimonial:
        "The notification system keeps everyone informed without being overwhelming. Task assignments are instant and the progress tracking is incredibly detailed.",
    },
    {
      name: "James Brown",
      role: "Founder, AgencyPro",
      initials: "JB",
      gradient: "from-indigo-500 to-purple-500",
      testimonial:
        "TaskWave has streamlined our entire workflow. The ability to assign tasks to multiple team members and track everything in real-time is exactly what we needed.",
    },
  ]

  const faqItems = [
    {
      question: "How does real-time task tracking work?",
      answer:
        "TaskWave uses WebSocket technology to provide instant updates across all dashboards. When a team member updates a task status or marks it complete, the admin dashboard reflects these changes immediately without requiring a page refresh.",
    },
    {
      question: "Can I assign one task to multiple team members?",
      answer:
        "Yes! TaskWave allows you to assign tasks to multiple team members for collaborative work. Each assigned member will see the task in their personal dashboard and can contribute to its completion.",
    },
    {
      question: "What's the difference between admin and team member dashboards?",
      answer:
        "Admin dashboards provide full task management capabilities including creating, updating, deleting, and assigning tasks, plus real-time monitoring of all team activities. Team member dashboards focus on personal task management, showing only assigned tasks with the ability to update progress and mark tasks complete.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "TaskWave is fully responsive and works seamlessly on all devices through your web browser. We're also developing dedicated mobile apps for iOS and Android, which will be available soon.",
    },
    {
      question: "How secure is my team's data?",
      answer:
        "We take security seriously. TaskWave uses enterprise-grade encryption, secure authentication, and follows industry best practices for data protection. All data is encrypted in transit and at rest, and we provide role-based access controls to ensure team members only see what they need to.",
    },
    {
      question: "Can I integrate TaskWave with other tools?",
      answer:
        "Yes! TaskWave offers integrations with popular tools like Slack, Microsoft Teams, Google Workspace, and many others. We also provide a robust API for custom integrations with your existing workflow tools.",
    },
  ]

  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Integrations", "API"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
    },
    {
      title: "Support",
      links: ["Help Center", "Documentation", "Status", "Security"],
    },
  ]
  const navigate=useNavigate();
  const handleAuth=(text)=>{
    if(text=="login") navigate("/login");
    else if(text=="singup") navigate("/signup");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-[#0b1322] text-white
  shadow-sm
 ">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskWave
            </span> */}
            <div className="w-[200px]"> 
              <TaskWaveLogo />
              </div>
 
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              FAQ
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={()=>handleAuth("login")} className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-black   h-10 px-4 py-2">
              Login
            </button>
            <button onClick={()=>handleAuth("singup")} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10 px-4 py-2" >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 h-10 w-10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="container px-4 py-4 space-y-4 max-w-7xl mx-auto">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2"
              >
                FAQ
              </button>
              <button className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2">
                Login
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-transparent">
                  🚀 Real-time Task Management
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Manage Tasks with
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    Real-time
                  </span>
                  <br />
                  Collaboration
                </h1>
                <p className="text-xl text-gray-600 max-w-[600px] text-justify break-words">
                  Empower your team with TaskWave's intelligent task management platform. Create, assign, and track
                  tasks in real-time while your team stays synchronized and productive.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 h-11">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-gray-300 bg-transparent hover:bg-gray-50 text-lg px-8 py-6 h-11">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Completely Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time updates</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Live Demo Available Below</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Settings className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Admin Panel</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-blue-200 rounded w-full"></div>
                        <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">Team View</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-purple-200 rounded w-full"></div>
                        <div className="h-2 bg-purple-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section with MacBook */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-gray-950 border-gray-200">
              See TaskWave in Action
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Watch how easy it is to manage tasks
            </h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
              See TaskWave in action - from creating tasks to real-time team collaboration
            </p>
          </div>

          {/* MacBook Demo Video */}
          <div className="relative max-w-6xl mx-auto mb-20">
            <div className="relative">
              {/* MacBook Frame */}
              <div className="relative bg-gray-800 rounded-t-xl p-2 shadow-2xl">
                <div className="bg-gray-700 rounded-t-lg p-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-black rounded-b-lg relative overflow-hidden">
                  {/* Video Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white space-y-4">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Task Creation & Assignment Demo</h3>
                        <p className="text-blue-200">Watch how to create and assign tasks in under 2 minutes</p>
                      </div>
                    </div>
                    {/* Simulated UI Elements */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <Workflow className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-medium">TaskWave Admin</span>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-sm">Live</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* MacBook Base */}
              <div className="bg-gray-300 h-6 rounded-b-xl mx-auto" style={{ width: "60%" }}></div>
              <div className="bg-gray-400 h-2 rounded-full mx-auto mt-1" style={{ width: "20%" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-16 bg-[#0b1322]">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm font-medium text-white uppercase tracking-wide">
              Trusted by teams at leading companies
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-16 items-center">
              {/* First set of logos */}
              <div className="flex space-x-16 items-center min-w-max">
                {companies.map((company, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-400">
                    <div className={`w-8 h-8 ${company.color} rounded-lg`}></div>
                    <span className="text-xl font-bold">{company.name}</span>
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-16 items-center min-w-max">
                {companies.map((company, index) => (
                  <div key={`duplicate-${index}`} className="flex items-center space-x-2 text-gray-400">
                    <div className={`w-8 h-8 ${company.color} rounded-lg`}></div>
                    <span className="text-xl font-bold">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-white border-white ">
              How it Works
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple workflow, powerful results
            </h2>
            <p className="text-xl text-white max-w-[800px] mx-auto">
              Get started in minutes with our intuitive task management system
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${step.bgColor} mx-auto`}
                >
                  <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-white">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-gray-950 border-gray-200">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to manage tasks
            </h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
              Powerful features designed for both administrators and team members
            </p>
          </div>

          {/* Admin Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">Admin Dashboard</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {adminFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">{feature.title}</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Member Features */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-purple-600">Team Member Dashboard</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">{feature.title}</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 border- bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto border-">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-white border-white">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Loved by teams worldwide</h2>
            <p className="text-xl text-white max-w-[800px] mx-auto">See what teams are saying about TaskWave</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold`}
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-gray-600">{testimonial.testimonial}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-gray-950 border-gray-200">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">Everything you need to know about TaskWave</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="w-full">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-left"
                    >
                      {faq.question}
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {openAccordion === index && (
                    <div className="overflow-hidden text-sm transition-all">
                      <div className="pb-4 pt-0">{faq.answer}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6 text-center max-w-7xl mx-auto">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to transform your team's productivity?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of teams who have streamlined their workflow with TaskWave. Start using TaskWave today and
              experience real-time task management like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-11">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-white text-white hover:bg-white hover:text-blue-600 bg-transparent text-lg px-8 py-6 h-11">
                Schedule Demo
              </button>
            </div>
            <p className="text-sm text-blue-200">Completely Free • No credit card required • Setup in minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Workflow className="h-5 w-5 text-white" />
                </div> */}
                {/* <span className="text-xl font-bold">TaskWave</span> */}
                <div><TaskWaveLogo/></div>
              </div>
              <p className="text-gray-400">
                Empower your team with real-time task management and seamless collaboration.
              </p>
            </div>

            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-lg font-semibold">{section.title}</h4>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <a key={linkIndex} href="#" className="block text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} TaskWave. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default TaskWaveLanding
