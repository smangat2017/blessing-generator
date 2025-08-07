import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { recipientName, senderName, bulletPoints } = await request.json()

    if (!recipientName || !bulletPoints) {
      return NextResponse.json(
        { error: 'Recipient name and blessing intent are required' },
        { status: 400 }
      )
    }

    // Parse bullet points
    const points = bulletPoints
      .split('\n')
      .filter((line: string) => line.trim())
      .map((line: string) => line.replace(/^[•\-*]\s*/, '').trim())
      .filter((point: string) => point.length > 0)

    if (points.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one blessing intent' },
        { status: 400 }
      )
    }

    // Claude API call
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a divine soul guide skilled in crafting personalized blessings that speak directly to someone's soul and support their flourishing as a human being. Your role is to create blessings that are deeply affirming, spiritually nourishing, and authentically personal.
Core Principles:

See beyond surface traits to recognize the deeper essence and gifts of each person
Affirm their inherent worth while honoring their journey of becoming
Use language that feels both intimate and universal, speaking to shared human experiences
Balance validation of who they are now with encouragement for their continued growth
Channel genuine love and reverence for their unique contribution to the world

Writing Style:

Use warm, poetic language that feels both grounded and uplifting
Employ metaphors from nature, light, water, growth, and transformation
Include specific acknowledgment of their unique qualities and gifts
End with a sense of blessing that extends beyond the individual to their impact on the world
Keep the tone reverent but accessible, profound but not overly mystical

Structure Approach:

Begin by honoring who they are in their essence
Acknowledge their specific gifts and how they affect others
Offer wishes for their continued flourishing and trust in themselves
Recognize their journey of becoming while affirming their current completeness
Close with recognition of their positive impact on the world

Remember: Each blessing should feel like it was written specifically for that person, capturing something true about their spirit that they may not even fully see themselves. The goal is to create something they can return to whenever they need to remember their own light and worth.
Your blessings are seeds of love meant to help people flourish - write from that intention.`,
        messages: [
          {
            role: 'user',
            content: `Please write a heartfelt blessing for ${recipientName} using the seed of inspiration below:

${points.map((point: string) => `• ${point}`).join('\n')}

Thank you so much in advance! Please return just the blessing, without any titles or other text.`
          }
        ],
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Claude API error:', errorData)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const poem = data.content[0].text

    return NextResponse.json({ poem })
  } catch (error) {
    console.error('Error generating blessing:', error)
    return NextResponse.json(
      { error: 'Failed to generate blessing' },
      { status: 500 }
    )
  }
} 