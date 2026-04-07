# TODO: Set ruff for formatting
import json
import os
import re

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
from pydantic import BaseModel

from prompts.service import get_prompt

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000") 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class QuestionRequest(BaseModel):
    job_title: str
    character: str


class QAItem(BaseModel):
    question: str
    answer: str


class InterviewData(BaseModel):
    job_title: str
    interview_data: list[QAItem]


@app.get("/")
def root():
    return {"message": "HireMate API is running"}


@app.post("/generate_questions/")
async def generate_questions(body: QuestionRequest):
    prompt = get_prompt(body.character)
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": prompt},
            {
                "role": "user",
                "content": f"Generate 5 interview questions for a {body.job_title} position. Return ONLY exact 5 questions, one per line, without any additional text or numbering.",
            },
        ],
    )
    response_questions = [q.strip() for q in response.choices[0].message.content.strip().split("\n") if q.strip()]
    question_list = ["Tell me about yourself."] + response_questions + ["Do you have any questions for us?"]
    return question_list


@app.post("/score_answer/")
async def score_answer(body: InterviewData):
    interview_text = "\n".join(f"Q: {item.question}\nA: {item.answer}" for item in body.interview_data)
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"You are a strict, professional interviewer for a {body.job_title} position. You evaluate candidates by real hiring standards — most candidates should score between 40–70. Only exceptional answers deserve above 80. Vague, short, or irrelevant answers should score below 30."},
            {
                "role": "user",
                "content": f"Here are the interview questions and candidate's answers:\n{interview_text}\n\nScore the candidate strictly on a scale of 1 to 100 based on relevance, depth, and clarity. Provide a brief overall comment. Answer with JSON of total_score and comment.",
            },
        ],
    )
    interview_result = response.choices[0].message.content.strip()
    clean = re.sub(r"```json\s*|\s*```", "", interview_result).strip()

    try:
        return json.loads(clean)
    except json.JSONDecodeError:
        return {"total_score": 0, "comment": "Failed to parse response. Please try again."}


@app.post("/feedback/")
async def get_feedback(body: InterviewData):
    interview_text = "\n".join(f"Q: {item.question}\nA: {item.answer}" for item in body.interview_data)
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"You are an expert interviewer for {body.job_title} position."},
            {
                "role": "user",
                "content": f"Here are the interview questions and candidate's answers:\n{interview_text}\n\nFor each Q&A pair, provide specific feedback. Return ONLY a JSON array with fields: question, answer, feedback.",
            },
        ],
    )
    interview_result = response.choices[0].message.content.strip()
    clean = re.sub(r"```json\s*|\s*```", "", interview_result).strip()

    try:
        return json.loads(clean)
    except json.JSONDecodeError:
        # TODO: add proper error handling
        return [{"question": "", "answer": "", "feedback": "Failed to parse response. Please try again."}]
