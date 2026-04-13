import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { systemPrompt, userPrompt, images } = body

    // Build messages array
    const messages: Array<{
      role: string
      content:
        | string
        | Array<{ type: string; text?: string; image_url?: { url: string } }>
    }> = [{ role: "system", content: systemPrompt }]

    // If images are provided, use vision-capable content format
    if (images && images.length > 0) {
      // Using a vision-capable model for image understanding
      const content: Array<{
        type: string
        text?: string
        image_url?: { url: string }
      }> = [{ type: "text", text: userPrompt }]

      // Add images to the content
      images.forEach((imageBase64: string) => {
        content.push({
          type: "image_url",
          image_url: { url: imageBase64 },
        })
      })

      messages.push({ role: "user", content })
    } else {
      messages.push({ role: "user", content: userPrompt })
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": request.headers.get("origin") || "",
          "X-Title": "Prompt Enhancer",
        },
        body: JSON.stringify({
          model: "x-ai/grok-4.1-fast",
          messages,
          temperature: 0.7,
          max_tokens: 2500,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.error?.message || `API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    )
  }
}
