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
| `/scorecard` | Scorecard | Total score, full conversation history (chat-style), "Try Again" and "Get Feedback" buttons |
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
/scorecard
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

### Phase 1 — MVP *(current)*
*Goal: Complete interview loop works end to end*

**Frontend**
- [x] Home screen (`/`) — app name, description, Start button, info modal
- [x] Lobby screen (`/lobby`) — job input (step-based flow) + character select + navigate to interview-room with query params
- [x] Interview Room (`/interview-room`) — fetches questions from backend, displays all questions *(voice loop next)*
- [ ] Web Speech API integration (voice → text) — **next: one question at a time, capture answer, move to next**
- [ ] Scorecard (`/scorecard`) — score + chat-style conversation history + "Try Again" / "Get Feedback" buttons
- [ ] Feedback screen (`/feedback`) — detailed AI feedback + "Go Home" button
- [ ] Session state management (in-memory, no DB)

**Backend**
- [x] API : generate 7 questions from job title (5 AI + 2 fixed) — `POST /generate_questions/`
- [x] OpenAI `gpt-4o-mini` integration
- [x] `.env` based API key management
- [x] Character prompt system (`backend/prompt/characters.py`)
- [ ] API : evaluate one answer, return score + comment
- [ ] API : generate overall feedback for full session

**Done when:** A user can go Lobby → Job Input → Interview (5 questions) → Result → Retry, entirely by voice.

---

### Phase 2 — Design & Polish
*Goal: Looks good enough to show as a portfolio piece*

- [ ] Design system (colors, typography, spacing) in Tailwind
- [ ] Lobby character illustration (SVG, hand-crafted)
- [ ] MVP interviewer character illustration (SVG, hand-crafted)
- [ ] Character Select screen polish (hover states, selection animation)
- [ ] Speech bubble animation (typewriter or fade-in)
- [ ] Voice recording waveform animation
- [ ] Responsive layout (mobile + desktop)
- [ ] Loading states and error handling UI
- [ ] Smooth screen transitions

---

### Phase 3 — Interviewer Personas
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

### Phase 4 — Feedback & Export
*Goal: Users can save and review their results*

- [ ] Text input fallback (for users without mic access)
- [ ] Feedback PDF download
- [ ] Shareable result link (URL with encoded session data)
- [ ] Detailed per-question feedback (not just score + comment)

---

### Phase 5 — Growth Features *(optional / future)*
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
| Phase 1 | Themed route names (`/lobby`, `/interview-room`, `/scorecard`) | Matches app's personality; kebab-case for URL convention |
| Phase 1 | Home (`/`) is landing-only; Lobby (`/lobby`) handles job input + character select | Cleaner separation — home is stateless, lobby owns session setup |