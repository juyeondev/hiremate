# TODO: Set ruff for formatting
from fastapi import FastAPI
from prompt.characters import set_prompt
from openai import AsyncOpenAI
from dotenv import load_dotenv
import os
from pydantic import BaseModel

app = FastAPI()
load_dotenv()

# TODO: Set proper CORS setting
from fastapi.middleware.cors import CORSMiddleware
                                                                                                                                       
app.add_middleware(                                       
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],                                                                                                             
    allow_headers=["*"],
)   

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class QuestionRequest(BaseModel):
    job_title: str
    character: str


@app.get("/")
def root():
    return {"message": "HireMate API is running"}

@app.post("/generate_questions/")
async def generate_questions(body: QuestionRequest):
    prompt = set_prompt(body.character)
    response = await client.responses.create(
        model="gpt-4o-mini",
        input=f"{prompt}\n\nGenerate 5 interview questions for a {body.job_title} position. Return ONLY exact 5 questions, one per line, without any additional text or numbering."
    )
    response_questions = [q.strip() for q in response.output_text.strip().split("\n") if q.strip()] 
    question_list = ["Tell me about yourself."] + response_questions + ["Do you have any questions for us?"]
    return question_list