'use client'

import { useState, useEffect, useCallback } from 'react'
import { Heart, Download, Edit3, Save, X, RefreshCw, MessageSquare, Sparkles, Star } from 'lucide-react'

export default function Home() {
  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [blessingIntent, setBlessingIntent] = useState('')
  const [blessingContent, setBlessingContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showBlessing, setShowBlessing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [previewContent, setPreviewContent] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isRevising, setIsRevising] = useState(false)

  // Real-time preview generation
  const generatePreview = useCallback(() => {
    const points = blessingIntent
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(point => point.length > 0)

    if (recipientName.trim() && points.length > 0) {
      const preview = `For ${recipientName},

${points.map(point => `${point}`).join('\n')}

With love and blessings,
${senderName.trim() || '[Your name]'}`

      setPreviewContent(preview)
    } else if (recipientName.trim() || senderName.trim()) {
      setPreviewContent(`For ${recipientName.trim() || '[Recipient\'s name]'},

[Start writing what you want this person to know...]

With love and blessings,
${senderName.trim() || '[Your name]'}`)
    } else {
      setPreviewContent(`For [Recipient's name],

[Add the person's name and what you want them to know...]

With love and blessings,
${senderName.trim() || '[Your name]'}`)
    }
  }, [recipientName, senderName, blessingIntent])

  useEffect(() => {
    if (recipientName.trim() || senderName.trim() || blessingIntent.trim()) {
      generatePreview()
    } else {
      setPreviewContent('')
    }
  }, [generatePreview])

  const generateBlessing = async () => {
    if (!recipientName.trim() || !blessingIntent.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientName, senderName, bulletPoints: blessingIntent })
      })

      if (!response.ok) throw new Error('Failed to generate blessing')

      const data = await response.json()
      setBlessingContent(data.poem)
      setShowBlessing(true)
      setIsEditing(false)
      setShowFeedback(false)
      setFeedback('')
    } catch (error) {
      console.error('Error generating blessing:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const reviseBlessing = async () => {
    if (!feedback.trim()) return

    setIsRevising(true)
    try {
      const response = await fetch('/api/revise-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          recipientName, 
          senderName, 
          bulletPoints: blessingIntent,
          currentPoem: blessingContent,
          feedback 
        })
      })

      if (!response.ok) throw new Error('Failed to revise blessing')

      const data = await response.json()
      setBlessingContent(data.poem)
      setShowFeedback(false)
      setFeedback('')
    } catch (error) {
      console.error('Error revising blessing:', error)
    } finally {
      setIsRevising(false)
    }
  }

  const downloadPDF = async () => {
    if (!blessingContent.trim()) return

    setIsDownloading(true)
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientName, senderName, poemContent: blessingContent })
      })

      if (!response.ok) throw new Error('Failed to generate PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `blessing-for-${recipientName}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEdit = () => {
    setEditedContent(blessingContent)
    setIsEditing(true)
  }

  const handleSave = () => {
    setBlessingContent(editedContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const renderBlessingContent = (content: string, showTitle: boolean = false) => (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-10 min-h-[600px] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Warm background texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Soft decorative elements */}
      <div className="absolute top-6 right-6 opacity-30">
        <Star className="h-8 w-8 text-indigo-300" />
      </div>
      <div className="absolute bottom-6 left-6 opacity-30">
        <Heart className="h-6 w-6 text-purple-300" />
      </div>
      <div className="absolute top-1/2 left-4 opacity-20">
        <Sparkles className="h-4 w-4 text-blue-300" />
      </div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Title - only show for rendered blessing */}
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">For {recipientName || '[Recipient]'}</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent mx-auto"></div>
          </div>
        )}
        
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg font-serif pb-8" style={{
          textShadow: '0 1px 3px rgba(0,0,0,0.05)',
          lineHeight: '2',
          letterSpacing: '0.01em'
        }}>
          {content}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Star className="h-8 w-8 text-indigo-200" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-6 w-6 text-blue-200" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <Heart className="h-6 w-6 text-purple-200" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '3s' }}>
          <Star className="h-8 w-8 text-indigo-200" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="h-5 w-5 text-blue-200" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}>
          <Heart className="h-4 w-4 text-purple-200" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4 px-4">
            <Sparkles className="h-8 w-8 text-indigo-400 mr-4" />
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent px-4 py-2">
              Blessing Generator
            </h1>
            <Sparkles className="h-8 w-8 text-indigo-400 ml-4" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Transform your love into meaningful blessings for those you cherish.
          </p>
        </div>

        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Input Form */}
          <div className="xl:col-span-1 sticky top-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-100 h-[600px] flex flex-col">
              <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-indigo-500 mr-2" />
                Create Your Blessing
              </h2>

              {/* Recipient and Sender Fields */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To:
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Name..."
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From:
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name..."
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>

              {/* Blessing Intent */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want this person to know?
                </label>
                <textarea
                  value={blessingIntent}
                  onChange={(e) => setBlessingIntent(e.target.value)}
                  placeholder="I want them to know..."
                  rows={8}
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none transition-all duration-200"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateBlessing}
                disabled={!recipientName.trim() || !blessingIntent.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating your blessing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Create Your Blessing
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Preview/Generated Blessing */}
          <div className="xl:col-span-2 mt-8 xl:mt-0">
            {showBlessing ? (
              <div className="relative">
                {/* Action Buttons - Top Right */}
                <div className="absolute top-4 right-4 z-20 flex space-x-2">
                  {!isEditing && !showFeedback && (
                    <>
                      <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        {isDownloading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Creating...
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3 mr-1" />
                            Save PDF
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setShowFeedback(true)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Revise
                      </button>

                      <button
                        onClick={handleEdit}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit
                      </button>
                    </>
                  )}

                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gradient-to-r from-gray-500 to-slate-500 text-white py-2 px-3 rounded-lg font-medium hover:from-gray-600 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </button>
                    </div>
                  ) : showFeedback ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={reviseBlessing}
                        disabled={!feedback.trim() || isRevising}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        {isRevising ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Revising...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Revise
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setShowFeedback(false)
                          setFeedback('')
                        }}
                        className="bg-gradient-to-r from-gray-500 to-slate-500 text-white py-2 px-3 rounded-lg font-medium hover:from-gray-600 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>

                {/* Feedback Input */}
                {showFeedback && (
                  <div className="absolute top-16 right-4 z-20 w-80 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-indigo-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">How would you like to revise this blessing?</h3>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Make it more spiritual... Make it shorter... Add more specific details... Change the tone to..."
                      rows={4}
                      className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none transition-all duration-200 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Be specific about what you'd like to change. The AI will incorporate your feedback.
                    </p>
                  </div>
                )}

                {isEditing ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-full min-h-[500px] px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-800 leading-relaxed text-lg bg-white/80 backdrop-blur-sm font-serif"
                    placeholder="Edit your blessing here..."
                  />
                ) : (
                  renderBlessingContent(blessingContent, true)
                )}
              </div>
            ) : (
              <div>
                {previewContent ? (
                  renderBlessingContent(previewContent, false)
                ) : (
                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-10 h-[600px] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-6 right-6 opacity-30">
                      <Star className="h-8 w-8 text-indigo-300" />
                    </div>
                    <div className="absolute bottom-6 left-6 opacity-30">
                      <Heart className="h-6 w-6 text-purple-300" />
                    </div>
                    <div className="absolute top-1/2 left-4 opacity-20">
                      <Sparkles className="h-4 w-4 text-blue-300" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20 pointer-events-none"></div>
                    <div className="text-center text-gray-500 relative z-10">
                      <Sparkles className="h-16 w-16 mx-auto mb-4 text-indigo-300" />
                      <p className="text-lg font-medium mb-2">Your blessing will appear here</p>
                      <p className="text-sm">Start typing above to see your blessing take shape in real-time</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
