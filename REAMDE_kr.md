# Hiremate

## 🎯 프로젝트 목적

개인 맞춤형 인터뷰 연습을 위한 AI 기반 웹 앱.
사용자가 직무명을 입력하고, 면접관 페르소나를 선택한 후, 음성으로 질문에 답하고 AI 피드백을 받습니다.

---

## 🧑‍💻 기술 스택

| 계층 | 기술 | 이유 |
|---|---|---|
| 프론트엔드 | Next.js (React) + Tailwind CSS | SSR/SSG 지원, 뛰어난 DX, 쉬운 배포 |
| 백엔드 | FastAPI (Python) | 빠르고 깔끔하며, 비동기 친화적, 배우기 쉬움 |
| AI | OpenAI GPT API (`gpt-4o-mini`) | 비용 효율적, 강력한 추론 능력 |
| 음성 입력 | Web Speech API | 브라우저 네이티브, 추가 비용 없음 |
| 디자인 | Figma + SVG (수작업) | 완전한 창작 제어 |
| 호스팅 | Vercel (프론트엔드) + Railway (백엔드) | 무료 티어, GitHub 자동 배포 |
| 버전 관리 | GitHub | 산업 표준 |

---

## 📁 계획된 프로젝트 구조

```
hiremate/
├── frontend/                  # Next.js 앱
│   ├── app/
│   │   ├── page.tsx           # 로비
│   │   ├── interview/
│   │   │   └── page.tsx       # 인터뷰 화면
│   │   └── result/
│   │       └── page.tsx       # 결과 화면
│   ├── components/
│   │   ├── JobInputModal.tsx
│   │   ├── SpeechBubble.tsx
│   │   ├── VoiceRecorder.tsx
│   │   └── ScoreCard.tsx
│   └── lib/
│       └── api.ts             # API 호출 헬퍼
│
├── backend/                   # FastAPI 앱
│   ├── main.py
│   ├── routers/
│   │   ├── interview.py       # 질문 생성
│   │   └── evaluation.py      # 답변 평가
│   ├── services/
│   │   └── openai_service.py  # GPT API 로직
│   └── requirements.txt
│
└── README.md
```

---

## 💰 비용 관리

| 항목 | 전략 |
|---|---|
| GPT API | `gpt-4o-mini` 사용, 세션당 5개 질문 고정, 짧은 시스템 프롬프트 |
| 호스팅 | Vercel 무료 티어 (프론트엔드), Railway 무료 티어 (백엔드) |
| 음성 | Web Speech API — 완전히 무료, 브라우저 네이티브 |
| 디자인 도구 | Figma 무료 티어 |

**예상 월 비용:** 개인용 가벼운 사용 시 ₩5,000 미만.
```// filepath: /Users/jay/Documents/project/hiremate/README_kr.md
# Hiremate

## 🎯 프로젝트 목적

개인 맞춤형 인터뷰 연습을 위한 AI 기반 웹 앱.
사용자가 직무명을 입력하고, 면접관 페르소나를 선택한 후, 음성으로 질문에 답하고 AI 피드백을 받습니다.

---

## 🧑‍💻 기술 스택

| 계층 | 기술 | 이유 |
|---|---|---|
| 프론트엔드 | Next.js (React) + Tailwind CSS | SSR/SSG 지원, 뛰어난 DX, 쉬운 배포 |
| 백엔드 | FastAPI (Python) | 빠르고 깔끔하며, 비동기 친화적, 배우기 쉬움 |
| AI | OpenAI GPT API (`gpt-4o-mini`) | 비용 효율적, 강력한 추론 능력 |
| 음성 입력 | Web Speech API | 브라우저 네이티브, 추가 비용 없음 |
| 디자인 | Figma + SVG (수작업) | 완전한 창작 제어 |
| 호스팅 | Vercel (프론트엔드) + Railway (백엔드) | 무료 티어, GitHub 자동 배포 |
| 버전 관리 | GitHub | 산업 표준 |

---

## 📁 계획된 프로젝트 구조

```
hiremate/
├── frontend/                  # Next.js 앱
│   ├── app/
│   │   ├── page.tsx           # 로비
│   │   ├── interview/
│   │   │   └── page.tsx       # 인터뷰 화면
│   │   └── result/
│   │       └── page.tsx       # 결과 화면
│   ├── components/
│   │   ├── JobInputModal.tsx
│   │   ├── SpeechBubble.tsx
│   │   ├── VoiceRecorder.tsx
│   │   └── ScoreCard.tsx
│   └── lib/
│       └── api.ts             # API 호출 헬퍼
│
├── backend/                   # FastAPI 앱
│   ├── main.py
│   ├── routers/
│   │   ├── interview.py       # 질문 생성
│   │   └── evaluation.py      # 답변 평가
│   ├── services/
│   │   └── openai_service.py  # GPT API 로직
│   └── requirements.txt
│
└── README.md
```

---

## 💰 비용 관리

| 항목 | 전략 |
|---|---|
| GPT API | `gpt-4o-mini` 사용, 세션당 5개 질문 고정, 짧은 시스템 프롬프트 |
| 호스팅 | Vercel 무료 티어 (프론트엔드), Railway 무료 티어 (백엔드) |
| 음성 | Web Speech API — 완전히 무료, 브라우저 네이티브 |
| 디자인 도구 | Figma 무료 티어 |

**예상 월 비용:** 개인용 가벼운 사용 시 ₩5,000 미만.