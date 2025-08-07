# Blessing Generator Web App

A beautiful, spiritual web application for creating meaningful blessings using Claude AI. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **🎨 Beautiful Design**: Stunning gradient backgrounds, glassmorphism effects, and smooth animations
- **🤖 Claude AI Integration**: Advanced AI that transforms intentions into heartfelt blessings
- **📄 PDF Export**: Download beautiful, formatted PDFs to share with loved ones
- **💝 Intent Input**: Simply share what you want someone to know and let AI create a blessing
- **👁️ Live Preview**: See your blessing as it's being generated
- **📱 Responsive Design**: Works perfectly on all devices
- **⚡ Fast & Simple**: One-page experience with no complex navigation

## 🚀 Key Features

### Beautiful UI/UX
- **Glassmorphism Design**: Modern glass-like effects with backdrop blur
- **Gradient Backgrounds**: Beautiful blue-to-indigo-to-purple gradients
- **Smooth Animations**: Subtle hover effects and loading states
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Spiritual Typography**: Warm, inviting fonts and spacing

### Advanced Claude AI Integration
- **Custom System Prompt**: Optimized for creating heartfelt blessings
- **Intent Processing**: Intelligently transforms your intentions into flowing text
- **Personalized Content**: Uses recipient name naturally throughout
- **Spiritual Intelligence**: Creates warm, meaningful, and spiritual blessings
- **High-Quality Output**: Professional, heartfelt writing style

### Professional PDF Export
- **Server-Side Generation**: No client-side color function issues
- **Beautiful Formatting**: Clean typography and proper spacing
- **Custom Filenames**: PDFs named after the recipient
- **Print-Ready**: Perfect for sharing or printing
- **Professional Layout**: Header, content, and footer sections

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **AI**: Claude API (Anthropic)
- **PDF Generation**: jsPDF (server-side)
- **Icons**: Lucide React
- **UI Components**: Headless UI, Heroicons

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Claude API key from Anthropic

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blessing-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Claude API key:
   - Get your API key from [Anthropic Console](https://console.anthropic.com/)
   - Edit `.env.local` and replace `your_claude_api_key_here` with your actual API key

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
blessing-generator/
├── app/
│   ├── api/
│   │   ├── generate-poem/
│   │   │   └── route.ts          # Claude AI blessing generation
│   │   ├── revise-poem/
│   │   │   └── route.ts          # Blessing revision
│   │   └── generate-pdf/
│   │       └── route.ts          # PDF generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main blessing composer
├── .env.local                    # Environment variables
├── package.json
└── README.md
```

## 🎯 User Experience Flow

### 1. Beautiful Input Interface
- **Clean Design**: Glassmorphism cards with gradient backgrounds
- **Simple Input**: Just name and intentions
- **Clear Guidance**: Helpful placeholder text and instructions
- **Smooth Interactions**: Hover effects and loading states

### 2. AI-Powered Generation
- **Smart Processing**: Claude analyzes your intentions
- **Natural Transformation**: Converts intentions into flowing blessing text
- **Personal Touch**: Maintains the personal nature of your intentions
- **Live Preview**: See the blessing as it's being generated

### 3. Professional PDF Export
- **One-Click Download**: Generate PDF instantly
- **Custom Naming**: PDF named after recipient
- **High Quality**: Professional formatting and layout
- **Share Ready**: Perfect for sharing with loved ones

## 🔧 Claude AI Integration

### Custom System Prompt
The app uses a carefully crafted system prompt that:
- **Specializes in blessings**: Optimized for spiritual and meaningful writing
- **Maintains personal tone**: Creates genuine, intimate blessings
- **Transforms intentions**: Converts simple intentions into flowing text
- **Uses recipient names**: Naturally incorporates names throughout
- **Creates spiritual depth**: Builds meaningful, touching content

### Example Input/Output
**Input:**
```
• I want them to know they are loved unconditionally
• I want them to know their strength inspires me
• I want them to know they have a purpose
• I want them to know they are never alone
```

**Output:**
```
Dear Sarah,

May you always know that you are loved with a love that knows no conditions, no boundaries, no end. You are cherished not for what you do, but simply for who you are - a beautiful soul whose very existence brings light to this world.

Your strength has been a beacon in my life, showing me what it means to face challenges with grace and courage. The way you carry yourself through difficult times inspires me to be better, to be braver, to believe in myself as you believe in me.

You have a purpose that is uniquely yours, a calling that only you can fulfill. Your gifts, your heart, your spirit - they all serve a greater plan, and the world is richer because you are in it. Trust that you are exactly where you need to be, doing exactly what you need to do.

And know this, always: you are never alone. Even in your darkest moments, even when you feel most isolated, you are surrounded by love, by light, by the prayers and hopes of those who care for you. We are here, we are with you, we are for you.

May your path be blessed with peace, your heart with joy, and your spirit with the knowledge that you are deeply, truly loved.

With love and blessings,
[Your name]
```

## 🚀 Development

### Running in Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🎨 Design Features

### Beautiful UI Elements
- **Glassmorphism Cards**: Semi-transparent cards with backdrop blur
- **Gradient Backgrounds**: Multi-color gradients for visual appeal
- **Smooth Animations**: Hover effects and loading states
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Color Harmony**: Blue, indigo, and purple color scheme

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and proper spacing
- **Flexible Layout**: Adapts beautifully to different devices
- **Performance**: Fast loading and smooth interactions

## 🚀 Deployment

This app can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

### Environment Variables for Production
Make sure to set your Claude API key in production:
```env
CLAUDE_API_KEY=your_actual_claude_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 💝 Support

For support, please open an issue in the repository or contact the development team.

---

Made with ❤️ to spread love and blessings through meaningful connections.
