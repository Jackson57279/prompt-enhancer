"use client"

import { useState, useRef, useEffect } from "react"

// Types
interface FormData {
  projectName: string
  projectType: string
  primaryColor: string
  accentColor: string
  backgroundTone: string
  aestheticStyle: string
  targetAudience: string
  keyFeatures: string
  techStack: string
  animationLevel: string
}

interface Question {
  id: keyof FormData
  label: string
  description: string
  type: "text" | "select" | "textarea" | "color"
  options?: { value: string; label: string }[]
  placeholder?: string
}

// Questions configuration
const questions: Question[] = [
  {
    id: "projectName",
    label: "Project Name",
    description: "What is the name of your project or brand?",
    type: "text",
    placeholder: "e.g., Nura Health",
  },
  {
    id: "projectType",
    label: "Project Type",
    description: "What kind of website are you building?",
    type: "select",
    options: [
      { value: "landing", label: "Landing Page" },
      { value: "dashboard", label: "Dashboard / App" },
      { value: "portfolio", label: "Portfolio" },
      { value: "ecommerce", label: "E-commerce" },
      { value: "blog", label: "Blog / Editorial" },
      { value: "saas", label: "SaaS Product" },
    ],
  },
  {
    id: "primaryColor",
    label: "Primary Color",
    description: "Choose your main brand color",
    type: "color",
  },
  {
    id: "accentColor",
    label: "Accent Color",
    description: "Choose a complementary accent color",
    type: "color",
  },
  {
    id: "backgroundTone",
    label: "Background Tone",
    description: "What tone should the background have?",
    type: "select",
    options: [
      { value: "white", label: "Clean White" },
      { value: "warm", label: "Warm Cream / Bone" },
      { value: "dark", label: "Deep Charcoal" },
      { value: "offwhite", label: "Off-White" },
    ],
  },
  {
    id: "aestheticStyle",
    label: "Aesthetic Style",
    description: "What visual style resonates with your brand?",
    type: "select",
    options: [
      { value: "minimalist", label: "Premium Minimalist" },
      { value: "organic", label: "Organic / Natural" },
      { value: "tech", label: "High-Tech / Clinical" },
      { value: "luxury", label: "Luxury / Boutique" },
      { value: "editorial", label: "Editorial / Magazine" },
      { value: "brutalist", label: "Neo-Brutalist" },
    ],
  },
  {
    id: "targetAudience",
    label: "Target Audience",
    description: "Who is your primary audience?",
    type: "text",
    placeholder: "e.g., Health-conscious professionals aged 30-50",
  },
  {
    id: "keyFeatures",
    label: "Key Features",
    description: "What are the main features or sections you need?",
    type: "textarea",
    placeholder:
      "e.g., Hero with video background, feature cards, pricing table, testimonials...",
  },
  {
    id: "techStack",
    label: "Tech Stack",
    description: "What technologies should be used?",
    type: "select",
    options: [
      { value: "react-tailwind", label: "React + Tailwind CSS" },
      { value: "next-tailwind", label: "Next.js + Tailwind CSS" },
      { value: "vue-tailwind", label: "Vue + Tailwind CSS" },
      { value: "react-sc", label: "React + Styled Components" },
      { value: "vanilla", label: "Vanilla HTML/CSS/JS" },
    ],
  },
  {
    id: "animationLevel",
    label: "Animation Level",
    description: "How much animation do you want?",
    type: "select",
    options: [
      { value: "subtle", label: "Subtle / Minimal" },
      { value: "moderate", label: "Moderate" },
      { value: "cinematic", label: "Cinematic / Heavy" },
    ],
  },
]

// Default color suggestions
const colorSuggestions = [
  { hex: "#2E4036", name: "Moss" },
  { hex: "#CC5833", name: "Clay" },
  { hex: "#1A1A1A", name: "Charcoal" },
  { hex: "#1F6C9F", name: "Deep Blue" },
  { hex: "#9F2F2D", name: "Deep Red" },
  { hex: "#346538", name: "Forest" },
  { hex: "#956400", name: "Ochre" },
  { hex: "#4A4A4A", name: "Slate" },
]

// Inline SVG Icons
const SparkleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const RefreshIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export default function PromptEnhancer() {
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    projectType: "",
    primaryColor: "#2E4036",
    accentColor: "#CC5833",
    backgroundTone: "warm",
    aestheticStyle: "organic",
    targetAudience: "",
    keyFeatures: "",
    techStack: "next-tailwind",
    animationLevel: "cinematic",
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [visibleQuestions, setVisibleQuestions] = useState<number[]>([])

  const resultRef = useRef<HTMLDivElement>(null)

  // Scroll-in animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            )
            setVisibleQuestions((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    const elements = document.querySelectorAll("[data-index]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePrompt = async () => {
    setIsGenerating(true)
    setError("")

    try {
      const systemPrompt = `You are an expert prompt engineer specializing in high-fidelity web design and creative technology. Your task is to transform user inputs into detailed, professional prompts that follow the style of the example provided.

The output should be a single, comprehensive prompt that includes:
1. A clear Role and Objective statement
2. Aesthetic Identity description based on the user's choices
3. A detailed Core Design System (palette, typography, visual texture)
4. Component Architecture & Behavior for each major section
5. Technical Requirements

Write in a professional, authoritative tone. Use specific hex colors, font names, and technical terminology. Avoid generic placeholder text.`

      const userPrompt = `Create a detailed website design prompt based on these specifications:

**Project Name:** ${formData.projectName || "Unnamed Project"}
**Project Type:** ${formData.projectType || "Landing Page"}
**Primary Color:** ${formData.primaryColor}
**Accent Color:** ${formData.accentColor}
**Background Tone:** ${formData.backgroundTone}
**Aesthetic Style:** ${formData.aestheticStyle}
**Target Audience:** ${formData.targetAudience || "General audience"}
**Key Features Needed:** ${formData.keyFeatures || "Hero section, features grid, footer"}
**Tech Stack:** ${formData.techStack}
**Animation Level:** ${formData.animationLevel}

Generate a complete, detailed prompt following this structure:
- Role and Objective
- Aesthetic Identity
- Core Design System (strict palette, typography, textures)
- Component Architecture with specific animated behaviors
- Technical Requirements

The prompt should be comprehensive enough for a frontend engineer to build the site without additional clarification.`

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.error?.message || `API error: ${response.status}`
        )
      }

      const data = await response.json()
      const enhancedPrompt = data.choices?.[0]?.message?.content || ""

      if (!enhancedPrompt) {
        throw new Error("No prompt generated")
      }

      setGeneratedPrompt(enhancedPrompt)

      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate prompt. Please check your API key."
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("Failed to copy to clipboard")
    }
  }

  const resetForm = () => {
    setFormData({
      projectName: "",
      projectType: "",
      primaryColor: "#2E4036",
      accentColor: "#CC5833",
      backgroundTone: "warm",
      aestheticStyle: "organic",
      targetAudience: "",
      keyFeatures: "",
      techStack: "next-tailwind",
      animationLevel: "cinematic",
    })
    setCurrentStep(0)
    setGeneratedPrompt("")
    setError("")
    setVisibleQuestions([])
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#EAEAEA] bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#111111] text-white">
                <SparkleIcon />
              </div>
              <h1 className="text-lg font-medium tracking-tight text-[#111111]">
                Prompt Enhancer
              </h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#787774]">
              <span className="hidden sm:inline">Grok 4.1 Fast</span>
              <kbd>Cmd</kbd>
              <span>+</span>
              <kbd>K</kbd>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        {/* Hero */}
        <div className="mb-16 text-center" data-index={-1}>
          <h1 className="mb-4 text-4xl font-medium tracking-tight text-[#111111] sm:text-5xl">
            Transform ideas into
            <br />
            <span className="text-[#787774] italic">detailed prompts</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#787774]">
            Answer a few questions about your project. We&apos;ll generate a
            comprehensive, professional prompt optimized for high-fidelity web
            development.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-[#787774]">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-[#787774]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#F7F6F3]">
            <div
              className="h-full bg-[#111111] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div
          className="mb-8 rounded-xl border border-[#EAEAEA] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          data-index={currentStep}
        >
          <div className="mb-6">
            <span className="mb-2 inline-block rounded-full bg-[#F7F6F3] px-3 py-1 text-xs font-medium tracking-wider text-[#787774] uppercase">
              Step {currentStep + 1}
            </span>
            <h2 className="mb-2 text-2xl font-medium tracking-tight text-[#111111]">
              {currentQuestion.label}
            </h2>
            <p className="text-[#787774]">{currentQuestion.description}</p>
          </div>

          {/* Input Types */}
          <div className="space-y-4">
            {currentQuestion.type === "text" && (
              <input
                type="text"
                value={formData[currentQuestion.id]}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                placeholder={currentQuestion.placeholder}
                className="w-full rounded-lg border border-[#EAEAEA] bg-white px-4 py-3 text-[#111111] transition-colors outline-none placeholder:text-[#787774] focus:border-[#111111]"
              />
            )}

            {currentQuestion.type === "textarea" && (
              <textarea
                value={formData[currentQuestion.id]}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                placeholder={currentQuestion.placeholder}
                rows={4}
                className="w-full resize-none rounded-lg border border-[#EAEAEA] bg-white px-4 py-3 text-[#111111] transition-colors outline-none placeholder:text-[#787774] focus:border-[#111111]"
              />
            )}

            {currentQuestion.type === "select" && currentQuestion.options && (
              <div className="grid gap-3 sm:grid-cols-2">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleInputChange(currentQuestion.id, option.value)
                    }
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ${
                      formData[currentQuestion.id] === option.value
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[#EAEAEA] bg-white text-[#111111] hover:border-[#111111]"
                    }`}
                  >
                    <span>{option.label}</span>
                    {formData[currentQuestion.id] === option.value && (
                      <CheckIcon />
                    )}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "color" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={formData[currentQuestion.id]}
                    onChange={(e) =>
                      handleInputChange(currentQuestion.id, e.target.value)
                    }
                    className="h-12 w-12 cursor-pointer rounded-lg border border-[#EAEAEA] bg-white p-1"
                  />
                  <input
                    type="text"
                    value={formData[currentQuestion.id]}
                    onChange={(e) =>
                      handleInputChange(currentQuestion.id, e.target.value)
                    }
                    className="flex-1 rounded-lg border border-[#EAEAEA] bg-white px-4 py-3 font-mono text-sm text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorSuggestions.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() =>
                        handleInputChange(currentQuestion.id, color.hex)
                      }
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
                        formData[currentQuestion.id] === color.hex
                          ? "border-[#111111] bg-[#F7F6F3]"
                          : "border-[#EAEAEA] bg-white hover:border-[#111111]"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[#787774]">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                currentStep === 0
                  ? "invisible"
                  : "text-[#787774] hover:text-[#111111]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-180"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              Back
            </button>

            {currentStep < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg bg-[#111111] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333333] active:scale-[0.98]"
              >
                Continue
                <ChevronRightIcon />
              </button>
            ) : (
              <button
                onClick={generatePrompt}
                disabled={isGenerating}
                className="flex items-center gap-2 rounded-lg bg-[#111111] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333333] active:scale-[0.98] disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-pulse-subtle">Generating</span>
                    <span
                      className="animate-pulse-subtle"
                      style={{ animationDelay: "0.2s" }}
                    >
                      .
                    </span>
                    <span
                      className="animate-pulse-subtle"
                      style={{ animationDelay: "0.4s" }}
                    >
                      .
                    </span>
                    <span
                      className="animate-pulse-subtle"
                      style={{ animationDelay: "0.6s" }}
                    >
                      .
                    </span>
                  </>
                ) : (
                  <>
                    <SparkleIcon />
                    Generate Prompt
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Summary Preview */}
        <div className="mb-12 rounded-xl border border-[#EAEAEA] bg-[#F7F6F3] p-6">
          <h3 className="mb-4 text-sm font-medium tracking-wider text-[#787774] uppercase">
            Current Configuration
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(formData).map(([key, value]) => {
              if (!value) return null
              const question = questions.find((q) => q.id === key)
              if (!question) return null

              let displayValue = value
              if (question.type === "select" && question.options) {
                displayValue =
                  question.options.find((o) => o.value === value)?.label ||
                  value
              }

              return (
                <div key={key} className="flex items-start gap-3">
                  {question.type === "color" ? (
                    <span
                      className="mt-0.5 h-4 w-4 rounded border border-[#EAEAEA]"
                      style={{ backgroundColor: value }}
                    />
                  ) : (
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#787774]" />
                  )}
                  <div>
                    <span className="block text-xs text-[#787774]">
                      {question.label}
                    </span>
                    <span className="text-sm font-medium text-[#111111]">
                      {displayValue}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-lg border border-[#9F2F2D]/20 bg-[#FDEBEC] p-4 text-[#9F2F2D]">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Generated Prompt Result */}
        {generatedPrompt && (
          <div
            ref={resultRef}
            className="animate-fade-in-up rounded-xl border border-[#EAEAEA] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between border-b border-[#EAEAEA] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDF3EC] text-[#346538]">
                  <CheckIcon />
                </div>
                <span className="font-medium text-[#111111]">
                  Enhanced Prompt Generated
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 text-sm text-[#787774] transition-all hover:border-[#111111] hover:text-[#111111]"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 text-sm text-[#787774] transition-all hover:border-[#111111] hover:text-[#111111]"
                >
                  <RefreshIcon />
                  Start Over
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="max-h-[600px] overflow-auto rounded-lg bg-[#F7F6F3] p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap text-[#111111]">
                {generatedPrompt}
              </pre>
            </div>
            <div className="border-t border-[#EAEAEA] px-6 py-4">
              <button
                onClick={copyToClipboard}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#111111] py-3 text-sm font-medium text-white transition-all hover:bg-[#333333] active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <CheckIcon />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <CopyIcon />
                    Copy Enhanced Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#EAEAEA] bg-[#F7F6F3]">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-[#787774]">
              <span className="h-2 w-2 rounded-full bg-[#346538]" />
              System Operational
            </div>
            <div className="text-sm text-[#787774]">
              Powered by OpenRouter · Grok 4.1 Fast
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
