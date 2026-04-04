# HireMate — Product Planning

## What is HireMate?

An AI-powered interview practice web app.
Users enter a job title, answer AI-generated questions by voice, and receive a score with feedback.

---

## MVP Definition

> **Goal:** A user can complete one full interview session — from job input to result — using only voice.
> No login, no database, no personas. Just the core loop working end to end.

### MVP Screens

| Screen | Description |
|---|---|
| Lobby | Landing page with app name, short description, and Start button |
| Job Input Modal | Text field to enter job title (e.g. "Frontend Developer"), Confirm button |
| Character Select | Choose one interviewer character (1 character available in MVP, more added later) |
| Interview Screen | AI asks 5 questions one by one via speech bubble, user answers by voice |
| Result Screen | Total score, full conversation history (chat-style), two buttons: "Try Again" and "Get Feedback" |
| Feedback Screen | Detailed AI feedback for the full session, "Go Home" button |

### MVP Screen Flow

```
Lobby
  ↓ (Start)
Job Input Modal
  ↓ (Confirm)
Character Select  ← UI ready for multiple characters, only 1 available in MVP
  ↓ (Select)
Interview Screen
  ↓ (After 5 questions)
Result Screen
  ├── [Try Again] → Lobby
  └── [Get Feedback] → Feedback Screen  ← API call happens here
                            ↓
                        [Go Home] → Lobby
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

### Phase 0 — Setup *(current)*
- [x] Define project name: **HireMate**
- [x] Create GitHub repository
- [x] Scaffold Next.js frontend (`/frontend`)
- [x] Scaffold FastAPI backend (`/backend`)
- [x] Set up Vercel (frontend) + Railway (backend)
- [x] Confirm frontend ↔ backend connection works

### Phase 1 — MVP
*Goal: Complete interview loop works end to end*

**Frontend**
- [ ] Lobby screen (app name + Start button)
- [ ] Job Input Modal (text input + Confirm)
- [ ] Character Select screen (grid layout, 1 character in MVP)
- [ ] Interview screen (speech bubble + voice recorder)
- [ ] Web Speech API integration (voice → text)
- [ ] Result screen (score + chat-style conversation history + "Try Again" / "Get Feedback" buttons)
- [ ] Feedback screen (detailed AI feedback + "Go Home" button)
- [ ] Session state management (in-memory, no DB)

**Backend**
- [ ] API : generate 5 questions from job title
- [ ] API : evaluate one answer, return score + comment
- [ ] API : generate overall feedback for full session
- [ ] OpenAI `gpt-4o-mini` integration
- [ ] `.env` based API key management

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