# FounderOS — AI Co-Founder for Your Startup

> **Built for AMD Developer Hackathon 2025 — Track 3: Unicorn Track**  
> *Powered by Fireworks AI (AMD GPUs) + Supabase + Tavily Web Search*

[![Live Demo](https://img.shields.io/badge/Live-Demo-blueviolet?style=for-the-badge)](https://founder-os.vercel.app)
[![Built on Fireworks](https://img.shields.io/badge/Built%20on-Fireworks%20AI-orange?style=for-the-badge)](https://fireworks.ai)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-green?style=for-the-badge)](https://supabase.com)

---

## 🚀 The Problem

**90% of startups fail.** Founders have brilliant ideas but lack:

- A structured framework to validate and refine their vision
- Real-time market intelligence to make informed decisions
- Access to on-demand business expertise across every domain
- A single co-pilot that understands their entire business context

**FounderOS** solves this by giving every founder an **AI co-founder** — a multi-agent system with deep domain expertise, real-time web research, and persistent project memory.

---

## ✨ What FounderOS Does

FounderOS is an **intelligent startup co-pilot** with **8 specialized AI agents** that automatically switch based on your needs:

| Agent | Expertise | When It Activates |
|-------|-----------|-------------------|
| 🔍 **Discovery** | Problem validation, customer profiling, idea stress-testing | Brainstorming or refining ideas |
| 📋 **Planner** | Roadmaps, milestones, timelines, resource planning | Building execution plans |
| 📊 **Market Research** | TAM/SAM/SOM, competitor analysis, industry trends | Understanding the market |
| 🏭 **Manufacturer** | Supply chain, contract manufacturing, logistics, sourcing | Finding real suppliers |
| 💰 **Finance** | Revenue models, pricing, projections, burn rate | Financial modeling |
| 🎨 **Branding** | Positioning, identity, messaging, brand story | Brand development |
| 🎯 **Strategy** | Go-to-market, customer acquisition, growth tactics | Launch planning |
| 🤖 **Auto Mode** | Automatically routes you to the right expert agent | Any question — just ask! |

### Key Features

- **🧠 Smart Agent Switching** — Auto mode analyzes your intent and routes to the best expert
- **🌐 Real-Time Web Research** — Every answer can be grounded in live web data via Tavily + semantic RAG
- **📊 Structured Responses** — Tables, comparisons, pros/cons, source citations — formatted for readability
- **💾 Project Memory** — Chats persist per project. Switch between multiple startup ideas seamlessly
- **🎯 Next Steps** — After every response, get actionable next steps to move forward
- **🔗 Source Links** — All web sources are cited and clickable for verification

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     FounderOS Architecture                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐    ┌──────────────────┐    ┌──────────────────────┐ │
│  │ Browser │←──→│  React Frontend  │←──→│  Supabase Edge       │ │
│  │ (Users) │    │  (Vite + TS)     │    │  Function (Deno)     │ │
│  └─────────┘    └──────────────────┘    └──────────────────────┘ │
│                                              │                    │
│                                        ┌──────┴──────┐           │
│                                        │ Fireworks AI │  ←── AMD │
│                                        │  (DeepSeek   │    GPUs  │
│                                        │   V4 Pro)    │          │
│                                        └──────┬──────┘           │
│                                        ┌──────┴──────┐           │
│                                        │   Tavily    │           │
│                                        │ Web Search  │           │
│                                        └─────────────┘           │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                   Supabase Backend                           │ │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌─────────┐ │ │
│  │  │  Auth    │  │ Postgres │  │ Edge Funcs │  │ Storage │ │ │
│  │  └──────────┘  └──────────┘  └────────────┘  └─────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### AMD/Fireworks AI Integration
- All AI inference runs on **Fireworks AI**, which operates on **AMD GPUs**
- Uses **DeepSeek V4 Pro** — a 236B parameter Mixture-of-Experts model
- Embedding-based search filtering via **nomic-ai/nomic-embed-text-v1.5** on Fireworks
- Streaming responses for real-time UX

### RAG Pipeline (Real-Time Web Search)

```
User Question → Explicit Keywords / Mode Forcing / AI Classifier
    → Tavily Web Search (7-10 results, advanced depth)
    → Paragraph Chunking (20-25 chunks)
    → Nomic Embed v1.5 (768-dim batch embedding)
    → Cosine Similarity Filtering (threshold ≥ 0.20)
    → Top 12 Most Relevant Chunks
    → Grouped by Source with Citations [1], [2], [3]...
    → DeepSeek V4 Pro → Formatted Response with Source Links
```

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 18 + TypeScript + Vite 7 | Fast dev, modern DX, type-safe |
| **Styling** | TailwindCSS v4 + Framer Motion | Utility-first CSS, smooth animations |
| **Backend** | Supabase (Postgres + Edge Functions) | Serverless, built-in auth, real-time |
| **AI Inference** | Fireworks AI (AMD GPUs) | Hackathon sponsor, AMD-powered, blazing fast |
| **AI Model** | DeepSeek V4 Pro (236B MoE) | Best-in-class reasoning for startup advice |
| **Web Search** | Tavily API (advanced depth) | Purpose-built for AI RAG, clean structured output |
| **Embeddings** | nomic-ai/nomic-embed-text-v1.5 | Semantic filtering (768-dim) for relevant search results |
| **Auth** | Supabase Auth (JWT) | Magic link, secure token-based auth |
| **Markdown** | react-markdown + remark-gfm | Tables, task lists, strikethrough, code blocks |

---

## 🎯 Why This Wins Track 3 (Unicorn Track)

| Judging Criteria | How FounderOS Delivers |
|-----------------|----------------------|
| **Creativity** | Multi-agent startup co-pilot with auto-switching — no existing product does this for founders |
| **Originality** | Novel combination of 8 expert agents + RAG pipeline + project memory |
| **Completeness** | Full auth, project CRUD, chat persistence, streaming, source citations, next steps |
| **AMD Platform Use** | All inference powered by Fireworks AI on AMD GPUs (DeepSeek V4 Pro + Nomic Embeddings) |
| **Market Potential** | $XXB founder tools market; every pre-seed founder needs a structured co-pilot |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- A Supabase project (free tier)
- Fireworks AI API key ([get one here](https://fireworks.ai))
- Tavily API key ([get one here](https://tavily.com))

### Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/founder-os.git
cd founder-os

# Install dependencies
npm install

# Set up environment variables (copy example)
cp .env.example .env
# Add your: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

# Start dev server
npm run dev
```

### Deploy to Production

1. **Frontend**: Deploy to Vercel — connect your GitHub repo, add env vars:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase publishable key
2. **Backend**: Already on Supabase — deploy Edge Functions via `supabase functions deploy`
3. **Secrets**: Set `TAVILY_API_KEY` and `FIREWORKS_API_KEY` in Supabase Edge Function secrets

---

## 📁 Project Structure

```
founder-os/
├── src/
│   ├── api/              # Edge Function caller + streaming
│   ├── components/       # React components
│   │   ├── Auth.tsx          # Authentication guard
│   │   ├── Sidebar.tsx       # App navigation + projects
│   │   ├── Message.tsx       # Chat message bubbles
│   │   ├── RichMessage.tsx   # Markdown rendering + tables
│   │   ├── EmptyState.tsx    # Welcome / empty chat state
│   │   ├── ProjectPanel.tsx  # Project creation + management
│   │   ├── ProjectModal.tsx  # Project creation dialog
│   │   ├── StageTracker.tsx  # Stage progress indicator
│   │   └── Logo.tsx          # FounderOS logo
│   ├── pages/            # Page-level components
│   │   ├── LandingPage.tsx   # Public landing page
│   │   ├── LoginPage.tsx     # Authentication
│   │   └── RegisterPage.tsx  # Sign up
│   ├── lib/              # Utilities
│   │   ├── supabase.ts      # Supabase client
│   │   ├── utils.ts         # Shared helpers
│   │   └── theme.tsx        # Theme provider
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Tailwind + theme
├── docs/                 # Architecture + design docs
├── public/               # Static assets
├── index.html            # Vite entry HTML
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

---

## 🔮 Roadmap

- [ ] **Voice Interface** — Speak to your AI co-founder
- [ ] **Pitch Deck Generator** — Auto-generate investor decks from your project
- [ ] **Competitor Tracking** — Automated weekly market landscape updates
- [ ] **Multi-Founder Collaboration** — Share projects with co-founders
- [ ] **YC Application Assistant** — Fill out YC applications with AI guidance

---

## 🙏 Acknowledgments

- **AMD** and **Fireworks AI** for the compute credits and GPU infrastructure
- **Supabase** for the backend platform
- **Tavily** for the web search API
- **DeepSeek** for the powerful V4 Pro model

---

## 📄 License

MIT — use it, fork it, build your startup with it!

---

<p align="center">
  Built with ❤️ for the <strong>AMD Developer Hackathon 2025</strong>
</p>