import { NextRequest, NextResponse } from 'next/server'
import jsPDF from 'jspdf'

export async function POST(request: NextRequest) {
  try {
    const { recipientName, senderName, poemContent } = await request.json()

    if (!recipientName || !poemContent) {
      return NextResponse.json(
        { error: 'Recipient name and blessing content are required' },
        { status: 400 }
      )
    }

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Function to add page decorations
    const addPageDecorations = () => {
      // Set spiritual, calming background color
      pdf.setFillColor(245, 250, 255) // Very soft blue-white
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      // Add multiple layers of texture for spiritual grace
      // Layer 1: Subtle star pattern texture
      pdf.setFillColor(240, 245, 250)
      for (let i = 0; i < pageWidth; i += 6) {
        for (let j = 0; j < pageHeight; j += 6) {
          if (Math.random() > 0.9) {
            pdf.circle(i, j, 0.3, 'F')
          }
        }
      }

      // Layer 2: Soft spiritual pattern (avoiding text areas)
      pdf.setFillColor(235, 240, 250) // Very soft blue
      for (let i = 0; i < pageWidth; i += 35) {
        for (let j = 0; j < pageHeight; j += 35) {
          // Avoid the center text area (roughly 60-180mm from left, 70-250mm from top)
          // Also avoid the top center area where title is (roughly 50-150mm from left, 0-60mm from top)
          if (Math.random() > 0.8 && (i < 50 || i > 140 || j < 60 || j > 240) && (i < 50 || i > 150 || j > 60)) {
            pdf.circle(i, j, 1, 'F')
          }
        }
      }

      // Layer 3: Gentle star elements scattered (avoiding text areas)
      pdf.setFillColor(230, 235, 245) // Soft blue-gray
      for (let i = 0; i < 8; i++) {
        const x = 20 + (i * 25)
        const y = 30 + (i % 3 * 40)
        // Only place in corners and edges, avoiding center and top center
        if ((x < 40 || x > 150 || y < 50 || y > 220) && (x < 50 || x > 150 || y > 60)) {
          pdf.circle(x, y, 1.2, 'F')
        }
      }

      // Simplified, elegant border - just a soft line
      pdf.setDrawColor(200, 210, 220) // Soft blue-gray
      pdf.setLineWidth(0.3)
      pdf.rect(15, 15, pageWidth - 30, pageHeight - 30)

      // Add corner grace elements - delicate stars
      pdf.setFillColor(180, 200, 220) // Soft blue
      pdf.circle(25, 25, 3, 'F')
      pdf.circle(pageWidth - 25, 25, 3, 'F')
      pdf.circle(25, pageHeight - 25, 3, 'F')
      pdf.circle(pageWidth - 25, pageHeight - 25, 3, 'F')

      // Add floating spiritual elements (avoiding text areas)
      pdf.setFillColor(200, 210, 230) // Soft blue
      for (let i = 0; i < 6; i++) {
        const x = 40 + (i * 30)
        const y = 35 + (i % 2 * 20)
        // Only place in safe areas, avoiding top center
        if ((x < 50 || x > 140 || y < 50 || y > 220) && (x < 50 || x > 150 || y > 60)) {
          pdf.circle(x, y, 1.5, 'F')
        }
      }
    }

    // Add decorations to first page
    addPageDecorations()

    // Set up text styling with spiritual grace using Times
    pdf.setFont('times', 'normal') // Using Times for elegant serif feel
    pdf.setTextColor(80, 100, 120) // Deep blue-gray for title

    // Add elegant, centered title
    pdf.setFontSize(16)
    pdf.text('A Blessing', pageWidth / 2, 35, { align: 'center' })

    // Add recipient name with grace
    pdf.setFontSize(14)
    pdf.setTextColor(60, 80, 100) // Deeper blue-gray
    pdf.text(`For ${recipientName}`, pageWidth / 2, 45, { align: 'center' })

    // Add a simple, elegant separator
    pdf.setDrawColor(180, 200, 220)
    pdf.setLineWidth(0.2)
    pdf.line(pageWidth / 2 - 20, 55, pageWidth / 2 + 20, 55)

    // Add blessing content with centered, smaller, graceful formatting
    pdf.setFontSize(11)
    pdf.setTextColor(60, 80, 100) // Rich blue-gray for content
    pdf.setFont('times', 'normal') // Using Times for serif feel

    // Split blessing into lines and center them
    const lines = poemContent.split('\n')
    let yPosition = 70

    for (const line of lines) {
      if (line.trim() === '') {
        yPosition += 4 // Minimal space for empty lines
        continue
      }

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage()
        yPosition = 40
        
        // Add decorations to new page
        addPageDecorations()
      }

      // Split long lines and center each
      const splitText = pdf.splitTextToSize(line, pageWidth - 60)
      for (const textLine of splitText) {
        pdf.text(textLine, pageWidth / 2, yPosition, { align: 'center' })
        yPosition += 4 // Compact line spacing
      }
      yPosition += 2 // Minimal space between paragraphs
    }

    // Add graceful signature section
    yPosition += 8
    pdf.setDrawColor(180, 200, 220)
    pdf.setLineWidth(0.3)
    pdf.line(pageWidth / 2 - 25, yPosition, pageWidth / 2 + 25, yPosition)
    
    pdf.setFontSize(10)
    pdf.setTextColor(80, 100, 120)
    pdf.text('With love and blessings', pageWidth / 2, yPosition + 5, { align: 'center' })

    // Add sender name if provided
    if (senderName && senderName.trim()) {
      pdf.setFontSize(11)
      pdf.setTextColor(60, 80, 100)
      pdf.text(senderName.trim(), pageWidth / 2, yPosition + 12, { align: 'center' })
    }

    // Add date with grace
    const today = new Date()
    const dateStr = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    pdf.setFontSize(9)
    pdf.setTextColor(120, 140, 160)
    pdf.text(dateStr, pageWidth / 2, yPosition + 20, { align: 'center' })

    // Add final spiritual touches
    pdf.setFillColor(180, 200, 220) // Soft blue
    for (let i = 0; i < 3; i++) {
      const x = pageWidth / 2 - 20 + (i * 20)
      pdf.circle(x, pageHeight - 30, 2, 'F')
    }

    // Add a central star of blessing
    pdf.setFillColor(180, 200, 220)
    pdf.circle(pageWidth / 2, pageHeight - 20, 2.5, 'F')

    const pdfBuffer = pdf.output('arraybuffer')

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="blessing-for-${recipientName}.pdf"`
      }
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
} 