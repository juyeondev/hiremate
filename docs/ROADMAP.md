## 🗺️ Development Roadmap

### Phase 1 — Environment Setup (Day 1–2)
- [ ] Create GitHub repository
- [ ] Initialize Next.js project with Tailwind CSS
- [ ] Initialize FastAPI project, set up virtual environment
- [ ] Get OpenAI API key, test a basic prompt in Python
- [ ] Connect Vercel (frontend) and Railway (backend) with GitHub auto-deploy
- [ ] Confirm frontend ↔ backend communication works (simple ping endpoint)

### Phase 2 — Core Feature Prototype (Week 1–2)
- [ ] Build Lobby screen (placeholder character, Start button)
- [ ] Build Job Input Modal (text input + interviewer selector)
- [ ] Integrate Web Speech API (voice → text conversion)
- [ ] Build Interview screen (speech bubble UI, question flow)
- [ ] Connect FastAPI → OpenAI: generate interview questions by job title
- [ ] Connect FastAPI → OpenAI: evaluate user answer, return score + comment
- [ ] Basic session state management (no DB — in-memory / localStorage)

### Phase 3 — UI Design & Illustration (Week 2–3)
- [ ] Sketch full screen layouts in Figma
- [ ] Design interviewer character icons in SVG
- [ ] Design lobby character in SVG
- [ ] Add speech bubble animation (fade-in / typewriter effect)
- [ ] Add voice recording waveform animation
- [ ] Apply consistent design system (colors, fonts, spacing) via Tailwind

### Phase 4 — Result Screen & Feedback System (Day 3–5)
- [ ] Build Result screen: score display, pass/fail badge
- [ ] Display full conversation history
- [ ] Request detailed GPT feedback on the whole session
- [ ] Implement feedback download (plain text or PDF)
- [ ] Add Retry button → reset state → return to Lobby

### Phase 5 — Optimization & Launch (Day 3–5)
- [ ] Limit API calls: fix 5 questions per session
- [ ] Use `gpt-4o-mini` throughout to reduce cost
- [ ] Add `.env` handling for API key security (never commit keys)
- [ ] Add SEO meta tags and OG image
- [ ] Final deployment check (Vercel + Railway)
- [ ] Write README.md

---

## 💰 Cost Management

| Item | Strategy |
|---|---|
| GPT API | Use `gpt-4o-mini`, fix 5 questions/session, short system prompts |
| Hosting | Vercel free tier (frontend), Railway free tier (backend) |
| Voice | Web Speech API — completely free, browser-native |
| Design tools | Figma free tier |

**Estimated monthly cost:** Under ₩5,000 for light personal use.

---

## 📌 Key Decisions & Notes

- **No database** — all session state lives in memory / localStorage, resets on refresh. Simplifies the stack greatly for v1.
- **English UI** — the app and all code/docs will be in English.
- **Learn-first approach** — each phase will be explained step by step, not just "copy this code."
- **Design is hand-crafted** — SVG icons and illustrations made from scratch for full creative control.

---

## ✅ Immediate Next Steps (Start Here)

1. **Create a GitHub repo** — name suggestion: `ai-interview-app`
2. **Scaffold the Next.js app** — `npx create-next-app@latest frontend`
3. **Scaffold the FastAPI app** — create `backend/` folder, install FastAPI + uvicorn
4. **Get your OpenAI API key** — platform.openai.com → API keys
5. **Set up Vercel + Railway accounts** and link to GitHub

> Once you complete Step 1–5, let me know and we'll write the first real code together.