# HireMate — Product Planning

## What is HireMate?

An AI-powered interview practice web app.
Users enter a job title, answer AI-generated questions by voice, and receive a score with feedback.

---

## MVP Definition

> **Goal:** A user can complete one full interview session — from job input to result — using only voice.
> No login, no database, no personas. Just the core loop working end to end.

### MVP Screens

| Route | Screen | Description |
|---|---|---|
| `/` | Home | Landing page with app name, short description, and Start button |
| `/lobby` | Lobby | Job title input (modal) + character select on same page |
| `/interview-room` | Interview Room | AI asks 5 questions one by one via speech bubble, user answers by voice |
| `/result-room` | result-room | Total score, full conversation history (chat-style), "Try Again" and "Get Feedback" buttons |
| `/feedback` | Feedback | Detailed AI feedback for the full session, "Go Home" button |

### MVP Screen Flow

```
/ (Home)
  ↓ (Start)
/lobby
  ↓ Job input modal → Confirm
  ↓ Character select → Select
/interview-room  ← character and job title passed via state
  ↓ (After 5 questions)
/result-room
  ├── [Try Again] → / (Home)
  └── [Get Feedback] → /feedback  ← API call happens here
                            ↓
                        [Go Home] → / (Home)
```

### MVP Features

- Enter a job title to start the session
- Character selection screen (1 character in MVP, structure supports adding more later)
- AI generates 5 interview questions based on the job title
- Voice input via Web Speech API (speech → text)
- Each answer is evaluated by AI (score + one-line comment)
- Result screen shows total score + full conversation history (chat-style, interviewer vs user)
- "Try Again" button → resets session and returns to Lobby
- "Get Feedback" button → navigates to Feedback screen and triggers AI feedback API call
- Feedback screen shows detailed AI feedback for the full session
- "Go Home" button on Feedback screen → returns to Lobby
- No login, no database — session state only (resets on page refresh)

### MVP Explicitly Excludes

- Interviewer persona behavior differences (all characters use same prompt in MVP)
- Text input fallback
- Feedback PDF download
- User accounts / history
- Multi-language support

---

## Phase Plan

### Phase 0 — Setup *(complete)*
- [x] Define project name: **HireMate**
- [x] Create GitHub repository
- [x] Scaffold Next.js frontend (`/frontend`)
- [x] Scaffold FastAPI backend (`/backend`)
- [x] Set up Vercel (frontend) + Railway (backend)
- [x] Confirm frontend ↔ backend connection works

### Phase 1 — MVP *(complete)*
*Goal: Complete interview loop works end to end*

**Frontend**
- [x] Home screen (`/`) — app name, description, Start button, info modal
- [x] Lobby screen (`/lobby`) — job input (step-based flow) + character select + navigate to interview-room with query params
- [x] Interview Room (`/interview-room`) — one question at a time, voice capture via Web Speech API, saves answers, navigates to result-room
- [x] Web Speech API integration — `speech.d.ts` declaration merging for TypeScript, `SpeechRecognition` + `webkitSpeechRecognition`
- [x] result-room (`/result-room`) — score + overall comment + Q&A history + "Restart" / "Get Feedback" buttons
- [x] Feedback screen (`/feedback`) — per-question detailed AI feedback + "Restart" button
- [x] Session state via `sessionStorage` (`interviewSession: { jobTitle, interviewData }`) — no URL param passing

**Backend**
- [x] `POST /generate_questions/` — 7 questions (5 AI + 2 fixed) from job title + character
- [x] `POST /score_answer/` — total score (1–100) + overall comment as JSON
- [x] `POST /feedback/` — per-question feedback array `[{ question, answer, feedback }]`
- [x] OpenAI `gpt-4o-mini` integration
- [x] `.env` based API key management
- [x] Character prompt system (`backend/prompt/characters.py`)
- [x] Regex JSON cleaning for GPT markdown-wrapped responses

**Notes for next session:**
- Several TODOs left in code: zod validation (result-room, feedback), proper error handling on fetch failures, null check on feedBackResult, adding ruff and lint (import, quotations, delete spacing)
- UI is unstyled (plain HTML) — Phase 2 is Figma design before any styling
- `POST /feedback/` endpoint is at `/feedback/` (not `/get_feedback/`)
- Session resets on page refresh by design (sessionStorage)

**Done when:** A user can go Lobby → Job Input → Interview (7 questions) → Result → Feedback, entirely by voice. ✅

---

### Phase 2 — Figma Design
*Goal: Design the full UI/UX in Figma before writing any polish code — lock the design system and layouts first*

**Design System**
- [ ] Color palette (Primary, Secondary, Neutral, Semantic)
- [ ] Typography scale (font family, sizes, weights)
- [ ] Spacing / grid system
- [ ] Core component library (buttons, inputs, cards, speech bubbles)

**Wireframes (per screen)**
- [ ] Home (`/`)
- [ ] Lobby (`/lobby`) — job input modal + character select
- [ ] Interview Room (`/interview-room`) — speech bubble layout, voice recording UI
- [ ] result-room (`/result-room`) — chat history, score display
- [ ] Feedback (`/feedback`)

**Character & Illustration Concepts**
- [ ] Lobby character concept (SVG, animal-based)
- [ ] Interviewer character MVP concept (SVG)
- [ ] Character Select layout (hover state, selection animation)

**Interactions & Animations**
- [ ] Speech bubble entrance animation (typewriter or fade-in)
- [ ] Voice recording waveform animation
- [ ] Screen transition style
- [ ] Loading state UI

**Responsive**
- [ ] Mobile layout (375px)
- [ ] Desktop layout (1280px)

---

### Phase 3 — Design & Polish
*Goal: Implement the Figma designs in code — looks good enough to show as a portfolio piece*

- [ ] Apply design system in Tailwind (colors, typography, spacing)
- [ ] Lobby character illustration (SVG, hand-crafted)
- [ ] MVP interviewer character illustration (SVG, hand-crafted)
- [ ] Character Select screen polish (hover states, selection animation)
- [ ] Speech bubble animation (typewriter or fade-in)
- [ ] Voice recording waveform animation
- [ ] Responsive layout (mobile + desktop)
- [ ] Loading states and error handling UI
- [ ] Smooth screen transitions

---

### Phase 4 — Interviewer Personas
*Goal: Each character has a distinct interview style and behavior*

- [ ] Add new character illustrations (SVG)
- [ ] Persona definitions (tone, style, strictness level)
- [ ] Prompt engineering per persona
- [ ] Character Select screen updated with new characters

Persona candidates:
- Alex (default, neutral) — available in MVP
- Big Tech interviewer (structured, technical, detail-oriented)
- Startup CTO (casual, big-picture, culture-fit focused)
- HR Manager (behavioral questions, soft skills)

---

### Phase 5 — Feedback & Export
*Goal: Users can save and review their results*

- [ ] Text input fallback (for users without mic access)
- [ ] Feedback PDF download
- [ ] Shareable result link (URL with encoded session data)
- [ ] Detailed per-question feedback (not just score + comment)

---

### Phase 6 — Growth Features *(optional / future)*
*Goal: Make it stickier and more useful long-term*

- [ ] User accounts (save session history)
- [ ] Question bank by job category
- [ ] Multi-language support (Korean, Japanese)
- [ ] SEO optimization + OG image
- [ ] Analytics (session count, avg score)

---

## Decision Log

| Date | Decision | Reason |
|---|---|---|
| Phase 0 | Service name: HireMate | Clear meaning, easy for non-native English speakers |
| Phase 0 | Voice only (no text input) in MVP | Keeps scope tight, core feature is voice |
| Phase 0 | No personas in MVP | Reduces prompt complexity for v1 |
| Phase 0 | Character Select screen in MVP | UI structure ready from day 1, easy to add more characters later without refactoring |
| Phase 0 | 1 character in MVP, more in Phase 3 | Avoids blocking MVP on illustration work |
| Phase 0 | gpt-4o-mini | Cost-efficient, sufficient quality for MVP |
| Phase 0 | Vercel + Railway | Free tier, GitHub auto-deploy, beginner-friendly |
| Phase 1 | Animal-based characters with cute design | Portfolio appeal, distinct visual identity |
| Phase 1 | Themed route names (`/lobby`, `/interview-room`, `/result-room`) | Matches app's personality; kebab-case for URL convention |
| Phase 1 | Home (`/`) is landing-only; Lobby (`/lobby`) handles job input + character select | Cleaner separation — home is stateless, lobby owns session setup |