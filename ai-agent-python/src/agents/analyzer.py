import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def analyze_code(language: str, code: str) -> str:
    prompt = f"""
    You are an expert {language} code reviewer.
    Analyze the following code for bugs, issues, improvements, and design suggestions.
    Code:
    {code}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    return response.choices[0].message.content
