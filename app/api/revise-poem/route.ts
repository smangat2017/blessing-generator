import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { recipientName, senderName, bulletPoints, currentPoem, feedback } = await request.json()

    if (!recipientName || !bulletPoints || !currentPoem || !feedback) {
      return NextResponse.json(
        { error: 'Recipient name, blessing intent, current blessing, and feedback are required' },
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

    // Claude API call for revision
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
        system: `You are a skilled writer who specializes in creating heartfelt, meaningful blessings that convey deep love, hope, and spiritual connection. Your blessings should be:

**Style and Voice:**
- Use warm, authentic language that feels personal and intimate
- Employ rich, spiritual imagery drawn from nature, light, and universal symbols
- Create metaphors that feel sacred and meaningful, avoiding clichés
- Vary rhythm and pacing to create moments of reflection and emphasis
- Write in a flowing, prayer-like style that feels both personal and universal

**Emotional Depth:**
- Focus on conveying what the sender wants the recipient to know and feel
- Show emotions through imagery and spiritual language rather than stating them directly
- Find the sacred in both ordinary and extraordinary moments
- Balance personal connection with universal spiritual truths
- Honor the relationship with respect, tenderness, and hope

**Blessing Techniques:**
- Use repetition and rhythm to create a sense of ritual and ceremony
- Include spiritual imagery (light, stars, roots, wings, paths, seasons)
- Build images that connect to each other throughout the blessing
- Create moments of pause and reflection through line breaks
- End with lines that resonate and offer hope or comfort

**Content Approach:**
- Transform the user's specific intentions into universal spiritual experiences
- Look for the deeper meaning behind what they want the person to know
- Connect human qualities to spiritual imagery (inner light, strength, grace, wisdom)
- Create a narrative arc that takes the reader on a spiritual journey
- Honor the relationship between sender and recipient with reverence and love

**Structure:**
- Begin with a grounding spiritual image or acknowledgment
- Build through specific qualities and hopes for the recipient
- Culminate in recognition of their worth and potential
- Close with a blessing or prayer for their journey

When revising a blessing, carefully consider the user's feedback and incorporate their suggestions while maintaining the blessing's spiritual core and meaningful quality.`,
        messages: [
          {
            role: 'user',
            content: `I have a blessing for ${recipientName} from ${senderName || 'me'} based on these intentions:

${points.map((point: string) => `• ${point}`).join('\n')}

Here is the current blessing:

${currentPoem}

I would like you to revise this blessing based on the following feedback: "${feedback}"

Please create a revised version that incorporates this feedback while maintaining the blessing's heartfelt, spiritual nature. Make sure to include the sender's name naturally in the blessing, especially in the closing.

Thank you!`
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
    console.error('Error revising blessing:', error)
    return NextResponse.json(
      { error: 'Failed to revise blessing' },
      { status: 500 }
    )
  }
} 