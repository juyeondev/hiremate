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
| Hosting | Vercel (frontend) + Railway (backend) | Free tier, GitHub auto-deploy |
| Version Control | GitHub | Industry standard |

---

## 📁 Planned Project Structure

```
ai-interview-app/
├── frontend/                  # Next.js app
│   ├── app/
│   │   ├── page.tsx           # Lobby
│   │   ├── interview/
│   │   │   └── page.tsx       # Interview screen
│   │   └── result/
│   │       └── page.tsx       # Result screen
│   ├── components/
│   │   ├── JobInputModal.tsx
│   │   ├── SpeechBubble.tsx
│   │   ├── VoiceRecorder.tsx
│   │   └── ScoreCard.tsx
│   └── lib/
│       └── api.ts             # API call helpers
│
├── backend/                   # FastAPI app
│   ├── main.py
│   ├── routers/
│   │   ├── interview.py       # Generate questions
│   │   └── evaluation.py      # Score answers
│   ├── services/
│   │   └── openai_service.py  # GPT API logic
│   └── requirements.txt
│
└── README.md
```
