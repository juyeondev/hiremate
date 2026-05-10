# Hiremate

## 🎯 Project Purpose

An AI-powered web app for personalized interview practice.
Users enter a job title, select an interviewer persona, answer questions by voice, and receive AI feedback.

---

## 🧑‍💻 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js (React) + Tailwind CSS | SSR/SSG support, great DX, easy deployment |
| Backend | FastAPI (Python) | Fast, clean, async-friendly, easy to learn |
| AI | OpenAI GPT API (`gpt-4o-mini`) | Cost-efficient, strong reasoning |
| Voice Input | Web Speech API | Browser-native, no extra cost |
| Design | Figma + SVG (hand-crafted) | Full creative control |
| Hosting | Vercel (frontend + serverless API) | Free tier, GitHub auto-deploy, single domain |
| Version Control | GitHub | Industry standard |

---

## 📁 Planned Project Structure

```
hiremate/
├── frontend/                  # Next.js app
│   ├── app/
│   │   ├── page.tsx               # Home — landing page, Start button
│   │   ├── lobby/
│   │   │   └── page.tsx           # Lobby — job input modal + character select
│   │   ├── interview-room/
│   │   │   └── page.tsx           # Interview — 5 voice questions
│   │   ├── result-room/
│   │   │   └── page.tsx           # result-room — results + conversation history
│   │   └── feedback/
│   │       └── page.tsx           # Feedback — detailed AI feedback
│   ├── components/
│   │   ├── JobInputModal.tsx
│   │   ├── CharacterSelect.tsx
│   │   ├── SpeechBubble.tsx
│   │   ├── VoiceRecorder.tsx
│   └── lib/
│       └── api.ts             # API call helpers
│
│   ├── api/                   # FastAPI on Vercel Python serverless
│   │   ├── index.py           # All endpoints (/api/generate_questions, /api/score_answer, /api/feedback)
│   │   └── prompts/
│   │       ├── service.py
│   │       └── characters.py
│   ├── requirements.txt       # Python deps for the serverless function
│   └── vercel.json            # Edge rewrites for /api/*
│
└── README.md
```

---

## 💰 Cost Management

| Item | Strategy |
|---|---|
| GPT API | Use `gpt-4o-mini`, fix 5 questions/session, short system prompts |
| Hosting | Vercel free tier (frontend + serverless API) |
| Voice | Web Speech API — completely free, browser-native |
| Design tools | Figma free tier |

**Estimated monthly cost:** Under ₩5,000 for light personal use.

---

### Frontend (`/frontend`)
```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # Run ESLint (import sort, quotes)
npm run format   # Run Prettier (spacing, blank lines, formatting)
```

### Backend / API (`/frontend/api`)
The FastAPI app runs as a Vercel serverless function — no separate dev server needed.
- Local: `vercel dev` (in `/frontend`) runs Next.js and the Python function on one port
- Deploy: every push to GitHub auto-deploys via Vercel